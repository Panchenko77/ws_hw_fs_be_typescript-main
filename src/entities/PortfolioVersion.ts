import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PortfolioEntity from './PortfolioEntity';
import PageEntity from './PageEntity';

@Entity()
export default class PortfolioVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  type: 'draft' | 'published' | 'snapshot';

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.versions, { nullable: false })
  portfolio: PortfolioEntity;

  @OneToMany(() => PageEntity, (page) => page.version)
  pages: PageEntity[];
}
