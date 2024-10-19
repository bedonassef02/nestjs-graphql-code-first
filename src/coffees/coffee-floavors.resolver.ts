import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { Falvor } from './entities/falvor.entity';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => Coffee)
export class CoffeeFloavorsResolver {
  constructor(
    @InjectRepository(Falvor)
    private readonly falvorRepository: Repository<Falvor>,
  ) {}
  @ResolveField('flavors', () => [Falvor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.falvorRepository.createQueryBuilder('flavor')
    .innerJoin('flavor.coffees', 'coffees', 'coffees.id = :coffeeId', { coffeeId: coffee.id })
    .getMany();
  }
}
