import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../entities/coffee.entity';
import { In, Repository } from 'typeorm';
import { Flavor } from '../entities/flavor.entity';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> { 
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {
    super((keys) => this.batchLoadFn(keys));
  }

  private async batchLoadFn(coffeesId: readonly number[]): Promise<Flavor[][]> { 
    const coffeesWithFlavors = await this.coffeeRepository.find({
      select: ['id'],
      relations: {
        flavors: true,
      },
      where: {
        id: In(coffeesId as number[]),
      },
    });
    return coffeesWithFlavors.map((coffee) => coffee.flavors);
  }
}
