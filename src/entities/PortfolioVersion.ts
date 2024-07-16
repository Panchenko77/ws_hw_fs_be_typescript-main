import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import PortfolioEntity from './PortfolioEntity';
import PageEntity from './PageEntity';

@ObjectType()
@Entity()
export default class PortfolioVersion {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { nullable: false })
  type: 'draft' | 'published' | 'snapshot';

  @Field()
  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @ManyToOne(() => PortfolioEntity, (portfolio) => portfolio.versions, { nullable: false })
  portfolio: PortfolioEntity;

  @OneToMany(() => PageEntity, (page) => page.version)
  pages: PageEntity[];
}
