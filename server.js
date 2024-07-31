const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const { userQueries, userMutations } = require('./resolvers/userResolver');
const { bookQueries, bookMutations } = require('./resolvers/bookResolver');
const { orderQueries, orderMutations } = require('./resolvers/orderResolver');
const { reviewQueries, reviewMutations } = require('./resolvers/reviewResolver');

require('./config/connection');

const app = express();
const port = 4000;

// Read the GraphQL schema from schema.graphql
const schemaString = readFileSync(join(__dirname, 'schema/schema.graphql'), 'utf-8');
const schema = buildSchema(schemaString);

// Combine all queries and mutations
const root = {
  ...userQueries,
  ...userMutations,
  ...bookQueries,
  ...bookMutations,
  ...orderQueries,
  ...orderMutations,
  ...reviewQueries,
  ...reviewMutations,
};

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});
