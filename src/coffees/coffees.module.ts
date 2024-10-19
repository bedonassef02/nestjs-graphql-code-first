import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { CoffeeFloavorsResolver } from './coffee-floavors.resolver';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  providers: [CoffeesResolver, CoffeesService, CoffeeFloavorsResolver, FlavorsByCoffeeLoader],
})
export class CoffeesModule {}
