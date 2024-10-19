import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Coffee {
  @Field(() => ID, { description: 'Unique identifier' })
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
