import { GraphQLSchema } from 'graphql';
import { BuildSchemaOptions, buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';
import ListPortfoliosResolver from '../resolvers/ListPortfoliosResolver';
import PortfolioVersionResolver from '../resolvers/PortfolioVersionResolver';

export function createSchema(options?: Omit<BuildSchemaOptions, 'resolvers'>): GraphQLSchema {
  return buildSchemaSync({
    resolvers: [ListPortfoliosResolver, PortfolioVersionResolver],
    emitSchemaFile: true,
    container: Container,
    validate: true,
    ...options,
  });
}
