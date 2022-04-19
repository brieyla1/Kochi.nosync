from pymongo.mongo_client import MongoClient
from bson.json_util import dumps
import json 


class kochi_Dataprovider():
    def __init__(self, connectionString,client):
        
        self.client     = client['kochi']
        self.whitelist  = json.loads(dumps(self.client['testWhitelist'].find({}, {'_id': False})))
        self.blacklist  = json.loads(dumps(self.client['blacklist'].find({}, {'_id': False})))
        self.urls       = json.loads(dumps(self.client['testWhitelist'].distinct('hp')))
        self.cmc        = json.loads(dumps(self.client['coinmarketcap'].find({}, {'_id': False})))
        self.cg         = json.loads(dumps(self.client['coingeko'].find({}, {'_id': False})))
        self.exchanges  = json.loads(dumps((self.client['exchanges'].find({}, {'_id': False}))))
        self.log        = json.loads(dumps((self.client['LOG'].find({}, {'_id': False}))))

        self.version, self.date = list(self.client['manifest'].find(
                    {}, {'_id': False}))[0].values()
        

    def updateAllData(self):
        self.whitelist  = json.loads(dumps(self.client['testWhitelist'].find({}, {'_id': False})))
        self.blacklist  = json.loads(dumps(self.client['blacklist'].find({}, {'_id': False})))
        self.urls       = json.loads(dumps(self.client['testWhitelist'].distinct('hp')))
        self.cmc        = json.loads(dumps(self.client['coinmarketcap'].find({}, {'_id': False})))
        self.cg         = json.loads(dumps(self.client['coingeko'].find({}, {'_id': False})))
        self.exchanges  = json.loads(dumps((self.client['exchanges'].find({}, {'_id': False}))))
        self.log        = json.loads(dumps((self.client['LOG'].find({}, {'_id': False}))))

        self.version, self.date = list(self.client['manifest'].find(
                    {}, {'_id': False}))[0].values()
    
    def getWhitelist(self):
        version, date = list(self.client['manifest'].find({}, {'_id': False}))[0].values()

        if self.version == version:
            return self.whitelist

        else:
            self.updateAllData()
            return self.whitelist

    def getBlacklist(self):
        version, date = list(self.client['manifest'].find({}, {'_id': False}))[0].values()

        if self.version == version:
            return self.blacklist

        else:
            self.updateAllData()
            return self.blacklist

    def getUrls(self):
        version, date = list(self.client['manifest'].find({}, {'_id': False}))[0].values()

        if self.version == version:
            return self.urls

        else:
            self.updateAllData()
            return self.urls

    def getCMC(self):
        version, date = list(self.client['manifest'].find({}, {'_id': False}))[0].values()

        if self.version == version:
            return self.cmc

        else:
            self.updateAllData()
            return self.cmc

    def getCG(self):
        version, date = list(self.client['manifest'].find({}, {'_id': False}))[0].values()

        if self.version == version:
            return self.cg

        else:
            self.updateAllData()
            return self.cg

    def getExchanges(self):
        version, date = list(self.client['manifest'].find({}, {'_id': False}))[0].values()

        if self.version == version:
            return self.exchanges

        else:
            self.updateAllData()
            return self.exchanges

    def getLOG(self):
        version, date = list(self.client['manifest'].find({}, {'_id': False}))[0].values()

        if self.version == version:
            return self.exchanges

        else:
            self.updateAllData()
            return self.exchanges
        



