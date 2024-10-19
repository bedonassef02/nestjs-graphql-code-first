import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Falvor } from './entities/falvor.entity';
import { CoffeeFloavorsResolver } from './coffee-floavors.resolver';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Falvor]), PubSubModule],
  providers: [CoffeesResolver, CoffeesService, CoffeeFloavorsResolver],
})
export class CoffeesModule {}
