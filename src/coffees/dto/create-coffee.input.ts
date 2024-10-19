import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType({ description: 'Create a new coffe' })
export class CreateCoffeeInput {
  @MinLength(3)
  name: string;
  brand: string;
  // @Field() <- required when CLI plugin disabled
  flavors: string[];
}
