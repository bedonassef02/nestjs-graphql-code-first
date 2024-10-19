import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Falvor } from './falvor.entity';
import { Drink } from 'src/common/interfaces/drink.interface';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';
import { loggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Entity()
@ObjectType({ implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Unique identifier' })
  id: number;
  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string;
  @Column()
  brand: string;
  @JoinTable()
  @ManyToMany((type) => Falvor, (falvor) => falvor.coffees, { cascade: true })
  flavors?: Falvor[];
  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type: CoffeeType;
}
