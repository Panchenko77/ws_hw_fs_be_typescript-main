import { Config } from 'apollo-server-core';

import { createSchema } from '../../src/helpers/createSchema';
import createApolloServer from '../../src/helpers/createApolloServer';

export default function createApolloServerTesting(config?: Config) {
  return createApolloServer({
    schema: createSchema(),
    ...config,
  });
}
