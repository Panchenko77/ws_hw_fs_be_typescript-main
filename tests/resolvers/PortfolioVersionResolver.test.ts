import 'reflect-metadata';
import { getRepository } from 'typeorm';
import { graphql, GraphQLSchema } from 'graphql';
import PortfolioEntity from '../../src/entities/PortfolioEntity';
import PortfolioVersion from '../../src/entities/PortfolioVersion';
import PageEntity from '../../src/entities/PageEntity';
import PortfolioVersionResolver from '../../src/resolvers/PortfolioVersionResolver';
import { buildSchema } from 'type-graphql';
import createApolloServer from '../../src/helpers/createApolloServer';

let schema: GraphQLSchema;
beforeAll(async () => {
  createApolloServer();
  schema = await buildSchema({
    resolvers: [PortfolioVersionResolver],
  });
});

describe('PortfolioVersionResolver', () => {
  it('creates a snapshot from a draft version', async () => {
    const portfolioRepo = getRepository(PortfolioEntity);
    const versionRepo = getRepository(PortfolioVersion);
    const pageRepo = getRepository(PageEntity);

    const portfolio = portfolioRepo.create({ name: 'Test Portfolio', url: 'test-portfolio' });
    await portfolioRepo.save(portfolio);

    const draftVersion = versionRepo.create({ type: 'draft', portfolio });
    await versionRepo.save(draftVersion);

    const page1 = pageRepo.create({ name: 'page1', url: 'pageurl1', version: draftVersion });
    const page2 = pageRepo.create({ name: 'page2', url: 'pageurl2', version: draftVersion });
    await pageRepo.save([page1, page2]);

    const mutation = `
      mutation {
        createSnapshotFromDraft(portfolioId: ${portfolio.id}) {
          id
          type
          createdAt
        }
      }
    `;

    const result = await graphql(schema, mutation);
    if (!result.data) {
      throw new Error('result.data is empty');
    }
    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty('createSnapshotFromDraft');
    expect(result.data.createSnapshotFromDraft.type).toBe('snapshot');
  });

  it('fetches all available portfolio versions', async () => {
    const query = `
      query {
        getAllPortfolioVersions {
          id
          type
          createdAt
        }
      }
    `;

    const result = await graphql(schema, query);
    if (!result.data) {
      throw new Error('result.data is empty');
    }
    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty('getAllPortfolioVersions');
    expect(result.data.getAllPortfolioVersions.length).toBeGreaterThan(0);
  });

  it('fetches all portfolio pages for a given version', async () => {
    const versionRepo = getRepository(PortfolioVersion);
    const version = await versionRepo.findOne({ where: { type: 'draft' } });

    if (!version) {
      throw new Error('version is empty');
    }
    const query = `
      query {
        getPagesByPortfolioVersion(versionId: ${version.id}) {
          id
          name
          url
        }
      }
    `;

    const result = await graphql(schema, query);
    if (!result.data) {
      throw new Error('result.data is empty');
    }
    expect(result.errors).toBeUndefined();
    expect(result.data).toHaveProperty('getPagesByPortfolioVersion');
    expect(result.data.getPagesByPortfolioVersion.length).toBeGreaterThan(0);
  });
});
