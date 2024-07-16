import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { BuildSchemaOptions } from 'type-graphql';

export default interface ConfigInterface {
  readonly env: 'development' | 'test' | 'staging' | 'production';
  readonly database: SqliteConnectionOptions;
  readonly graphQLPath: string;
  readonly resolvers: BuildSchemaOptions['resolvers'];
}
