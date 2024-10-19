import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Drink } from 'src/common/interfaces/drink.interface';
import { DrinkResultUnion } from 'src/common/unions/drink-result.union';
import { Tea } from 'src/teas/entities/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinkResultUnion], { name: 'drinks' })
  async findAll(): Promise<typeof DrinkResultUnion[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Cappuccino';
    coffee.brand = 'Starbucks';

    const tea = new Tea();
    tea.name = 'Green Tea';

    return await Promise.resolve([coffee, tea]);
  }
}
