from fastapi import FastAPI, Depends, HTTPException
from .auth import AuthHandler
from .schemas import AuthDetails, AddDetails
import json
import datetime
import pymongo
import os
from bson.json_util import dumps
from .data import kochi_Dataprovider

# connection sting to connect to mongodatabase
mongoString = os.environ.get('MONGOCONNECTION')
logRoot = os.environ.get('logRoot')  # backup files goes here
client = pymongo.MongoClient(mongoString)
# stores the data and provides them, updates on change on the database
kochi_Dataprovider = kochi_Dataprovider(
    connectionString=mongoString, client=client)


app = FastAPI(title="Kochi-Dataprovider")


auth_handler = AuthHandler()
users = []


@app.get('/ping')
def ping():
    # data = json.load(open('sample.json'))
    return 'fuck off'


@app.post('/register', status_code=201, include_in_schema=True)
def register(auth_details: AuthDetails):
    if any(x['username'] == auth_details.username for x in users):
        raise HTTPException(status_code=400, detail='Username is taken')
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    users.append({
        'username': auth_details.username,
        'password': hashed_password
    })
    return


@app.post('/login')
def login(auth_details: AuthDetails):
    user = None
    for x in users:
        if x['username'] == auth_details.username:
            user = x
            break

    if (user is None) or (not auth_handler.verify_password(auth_details.password, user['password'])):
        raise HTTPException(
            status_code=401, detail='Invalid username and/or password')
    token = auth_handler.encode_token(user['username'])
    return {'token': token}


@app.post('/addBlacklist')
def unprotected(addDetails: AddDetails):
    website = addDetails.website
    date, number = list(client['kochi']['manifest'].find(
        {}, {'_id': False}))[0].values()

    client['kochi']['blacklist'].insert_one({'website': website})
    client['kochi']['manifest'].find_one_and_update(
        {}, {'$set': {'version_number': number+1}})
    client['kochi']['manifest'].find_one_and_update(
        {}, {'$set': {'version_date': datetime.datetime.now().isoformat()}})

    return dumps(client['kochi']['blacklist'].distinct('website'))


########################################### unprotected ######################################################
@app.get('/whitelist')
def unprotected():

    return kochi_Dataprovider.getWhitelist()


@app.get('/geturls')
def unprotected():
    return kochi_Dataprovider.getUrls()


@app.get('/getCMC')
def unprotected():

    return kochi_Dataprovider.getCMC()


@app.get('/getCG')
def unprotected():
    return kochi_Dataprovider.getCG()


@app.get('/getExchanges')
def unprotected_init():
    return kochi_Dataprovider.getExchanges()


@app.get('/blacklist')
def unprotected_init():
    return kochi_Dataprovider.getBlacklist()


@app.get('/version')
def unprotected():
    return {kochi_Dataprovider.version, kochi_Dataprovider.date}
################################################ unprotected ################################################################


################################################# protected by username and password ########################################
@app.get('/getNEWData')
def protected(username=Depends(auth_handler.auth_wrapper)):
    data = json.load(open('sample.json'))
    return data

################################################# protected by username and password ########################################
