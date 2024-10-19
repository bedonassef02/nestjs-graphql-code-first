import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Falvor } from './entities/falvor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Falvor])],
  providers: [CoffeesResolver, CoffeesService]
})
export class CoffeesModule {}
