import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { Flavor } from './entities/flavor.entity';

@Resolver(() => Coffee)
export class CoffeeFloavorsResolver {
  constructor(private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader) {}
  @ResolveField('flavors', () => [Flavor])
  async getFlavorsOfCoffee(@Parent() coffee: Coffee) {
    return this.flavorsByCoffeeLoader.load(coffee.id);
  }
}
