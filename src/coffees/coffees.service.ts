import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input';

@Injectable()
export class CoffeesService {
  findAll() {
    return [];
  }

  findOne(id: number) {
    return null;
  }

  create(createCoffeInput: CreateCoffeeInput) {
    return null;
  }
}
