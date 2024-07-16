import PortfolioEntity from '../../src/entities/PortfolioEntity';
import createApolloServer from '../test_helpers/createApolloServer';
import createPortfolioEntity from '../test_helpers/createPortfolioHelper';

describe('ListPortfoliosResolver', () => {
  const QUERY = `
    query ListPortfolios {
      listPortfolios {
        id
        name
        url
      }
    }
  `;

  let portfolio1: PortfolioEntity;
  let portfolio2: PortfolioEntity;
  let portfolio3: PortfolioEntity;
  beforeAll(async () => {
    portfolio1 = await createPortfolioEntity();
    portfolio2 = await createPortfolioEntity();
    portfolio3 = await createPortfolioEntity();
  });

  test('return 3 items', async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {},
    });
    expect(response).toGraphQLResponseData({
      listPortfolios: [
        {
          id: portfolio1.id,
          name: portfolio1.name,
          url: portfolio1.url,
        },
        {
          id: portfolio2.id,
          name: portfolio2.name,
          url: portfolio2.url,
        },
        {
          id: portfolio3.id,
          name: portfolio3.name,
          url: portfolio3.url,
        },
      ],
    });
  });
});
