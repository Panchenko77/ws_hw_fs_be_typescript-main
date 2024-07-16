import { ConnectionOptions, createConnection, useContainer, Connection } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';

import config from '../config';

useContainer(Container);
const dbConfig: ConnectionOptions = { ...config.database };

let connection: Promise<Connection>;

export function getConnection(): Promise<Connection> {
  if (!connection) {
    connection = createConnection(dbConfig);
  }

  return connection;
}
