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

@Entity()
@ObjectType()
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Unique identifier' })
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @JoinTable()
  @ManyToMany((type) => Falvor, (falvor) => falvor.coffees, { cascade: true })
  flavors?: Falvor[];
  @CreateDateColumn()
  createdAt?: Date;
}
