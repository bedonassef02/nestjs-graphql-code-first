import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';

@InputType({ description: 'Create a new coffe' })
export class CreateCoffeeInput {
  @MinLength(3)
  name: string;
  brand: string;
  // @Field() <- required when CLI plugin disabled
  flavors: string[];
  type: CoffeeType;
}
