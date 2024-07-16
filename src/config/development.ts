import ConfigInterface from './ConfigInterface';
import PortfolioEntity from '../entities/PortfolioEntity';
import PageEntity from '../entities/PageEntity';
import PortfolioVersion from '../entities/PortfolioVersion';

const config: ConfigInterface = {
  env: 'development',
  database: {
    type: 'sqlite' as const,
    cache: false,
    database: ':memory:',
    dropSchema: true,
    entities: [PortfolioEntity, PageEntity, PortfolioVersion],
    logger: 'advanced-console' as const,
    synchronize: true,
  },
  graphQLPath: '/graphql',
  resolvers: [`${__dirname}/../resolvers/**/*Resolver.ts`],
};

export default config;
