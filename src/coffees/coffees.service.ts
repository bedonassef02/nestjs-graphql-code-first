import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { UpdateCoffeeInput } from './dto/update-coffee.input';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
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

  create(createCoffeInput: CreateCoffeeInput) {
    const coffee = this.coffeeRepository.create(createCoffeInput);
    return this.coffeeRepository.save(coffee);
  }

  async update(id: number, updateCoffeInput: UpdateCoffeeInput) {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeInput,
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
}
