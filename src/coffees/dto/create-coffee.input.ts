import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Create a new coffe' })
export class CreateCoffeeInput {
  name: string;
  brand: string;
  // @Field() <- required when CLI plugin disabled
  flavors: string[];
}
