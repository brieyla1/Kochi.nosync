const fs = require('fs');

const express = require('express');
const cors = require('cors');

const { graphqlHTTP } = require('express-graphql');
const { buildASTSchema } = require('graphql');
const gql = require('graphql-tag');

const state = require('./state/state.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Kochi backend listening on ${PORT}`);
});

// basic REST requests
app.get('/basic', async (req, res) => {
  res.send(await state.functions.getListingList());
});

app.get('/listings/:addr', async (req, res) => {
  const addr = req.params.addr;
  if (!addr.match(/^0x[0-9a-fA-F]{40}$/)) return res.status(400).send('Invalid address');

  res.send(await state.functions.getListing(addr));
});

// graphql
// The root provides a resolver function for each API endpoint
var root = {
  listings: async ({ showCount, full }) => {
    const _listings = await state.functions.getListingList();

    // when full is true, we return at most 30 listings
    // otherwise, we return at most 300 listings
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    const listings = full ? _listings.slice(0, clamp(showCount, 1, 30)) : _listings.slice(0, clamp(showCount, 1, 300));
    if (!full) return listings;

    return listings.map(async (listingObj) => {
      const listing = await state.functions.getListing(listingObj.addr);
      return listing;
    });
  },
  listing: async (args) => {
    const addr = args.addr;
    if (!addr.match(/^0x[0-9a-fA-F]{40}$/)) return null;

    return await state.functions.getListing(addr);
  },
};

// get current file's location
const filePath = __dirname + '/schema.graphql';
const schema = buildASTSchema(gql(fs.readFileSync(filePath, 'utf-8')));

app.use('/graphql', graphqlHTTP({ schema, graphiql: true, rootValue: root }));
