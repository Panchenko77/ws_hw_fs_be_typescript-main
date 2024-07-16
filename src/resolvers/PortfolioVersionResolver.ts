import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import PortfolioEntity from '../entities/PortfolioEntity';
import PortfolioVersion from '../entities/PortfolioVersion';
import PageEntity from '../entities/PageEntity';

@Resolver()
export default class PortfolioVersionResolver {
  @Mutation(() => PortfolioVersion, { description: 'Create snapshot from draft' })
  async createSnapshotFromDraft(@Arg('portfolioId') portfolioId: number): Promise<PortfolioVersion> {
    const portfolioRepo = getRepository(PortfolioEntity);
    const versionRepo = getRepository(PortfolioVersion);
    const pageRepo = getRepository(PageEntity);

    const portfolio = await portfolioRepo.findOne(portfolioId, { relations: ['versions', 'versions.pages'] });
    if (!portfolio) throw new Error('Portfolio not found');

    const draftVersion = portfolio.versions.find((version) => version.type === 'draft');
    if (!draftVersion) throw new Error('Draft version not found');

    const snapshotVersion = new PortfolioVersion();
    snapshotVersion.type = 'snapshot';
    snapshotVersion.portfolio = portfolio;
    await versionRepo.save(snapshotVersion);

    for (const page of draftVersion.pages) {
      // Check if a page with the same URL already exists
      const existingPage = await pageRepo.findOne({ url: page.url });

      if (!existingPage) {
        // If no existing page, create a new one
        const newPage = new PageEntity();
        newPage.name = page.name;
        newPage.url = page.url;
        newPage.version = snapshotVersion;

        await pageRepo.save(newPage);
      } else {
        console.log(`Page with URL ${page.url} already exists.`);
      }
    }

    return snapshotVersion;
  }

  @Query(() => [PortfolioVersion], { description: 'List all portfolio versions' })
  async getAllPortfolioVersions(): Promise<PortfolioVersion[]> {
    const versionRepo = getRepository(PortfolioVersion);
    return await versionRepo.find({ relations: ['portfolio'] });
  }

  @Query(() => [PageEntity], { description: 'List all pages for portfolio version' })
  async getPagesByPortfolioVersion(@Arg('versionId') versionId: number): Promise<PageEntity[]> {
    const pageRepo = getRepository(PageEntity);
    return await pageRepo.find({ where: { version: { id: versionId } }, relations: ['version'] });
  }
}
