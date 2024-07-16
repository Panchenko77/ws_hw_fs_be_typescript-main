import faker from 'faker';
import { DeepPartial, getRepository } from 'typeorm';
import PortfolioEntity from '../../src/entities/PortfolioEntity';

export function buildPortfolioEntity(properties?: DeepPartial<PortfolioEntity>) {
  const repository = getRepository(PortfolioEntity);

  return repository.create({
    name: faker.name.findName(),
    url: faker.internet.url(),
    ...properties,
  });
}

async function createPortfolioEntity(properties?: DeepPartial<PortfolioEntity>) {
  const repository = getRepository(PortfolioEntity);
  return repository.save(buildPortfolioEntity(properties));
}

export default createPortfolioEntity;
