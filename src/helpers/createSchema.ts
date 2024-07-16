import { GraphQLSchema } from 'graphql';
import { BuildSchemaOptions, buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';
import ListPortfoliosResolver from '../resolvers/ListPortfoliosResolver';

export function createSchema(options?: Omit<BuildSchemaOptions, 'resolvers'>): GraphQLSchema {
  return buildSchemaSync({
    resolvers: [ListPortfoliosResolver],
    emitSchemaFile: true,
    container: Container,
    validate: true,
    ...options,
  });
}
