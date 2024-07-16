import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import PortfolioEntity from '../entities/PortfolioEntity';

@Resolver()
@Service()
export default class ListPortfoliosResolver {
  @Query(() => [PortfolioEntity],{ description: 'List all portfolios' })
  async listPortfolios(): Promise<PortfolioEntity[]> {
    const portfolioRepository = getRepository(PortfolioEntity);

    return portfolioRepository
      .createQueryBuilder('p')
      .getMany();
  }
}
