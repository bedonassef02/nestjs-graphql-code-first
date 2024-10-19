import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Flavor } from './entities/flavor.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly falvorRepository: Repository<Flavor>,
    private readonly pubSub: PubSub,
  ) {}
  findAll() {
    return this.coffeeRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id } });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  async create(createCoffeInput: CreateCoffeeInput) {
    const flavors = await Promise.all(
      createCoffeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeInput,
      flavors,
    });
    const newCoffeeEntity = await this.coffeeRepository.save(coffee);
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });
    return newCoffeeEntity;
  }

  async update(id: number, updateCoffeInput: UpdateCoffeeInput) {
    const flavors =
      updateCoffeInput.flavors &&
      (await Promise.all(
        updateCoffeInput.flavors.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeInput,
      flavors,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async preloadFlavorByName(name: string): Promise<Flavor> {
    const falvor = await this.falvorRepository.findOne({ where: { name } });
    if (falvor) {
      return falvor;
    }
    return this.falvorRepository.create({ name });
  }
}
