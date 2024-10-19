import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Query(() => [Coffee], { name: 'coffees' })
  async findAll(): Promise<Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee', nullable: true })
  async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Coffee> {
    return this.coffeesService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
  async create(
    @Args('createCoffeInput') createCoffeInput: CreateCoffeeInput,
  ): Promise<Coffee> {
    return this.coffeesService.create(createCoffeInput);
  }
}
