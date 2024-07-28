import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeLocationsService } from './cafeLocations.service';
import { CafeLocationsController } from './cafeLocations.controller';
import { CafeLocation } from './cafeLocation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CafeLocation])],
  providers: [CafeLocationsService],
  controllers: [CafeLocationsController],
})
export class CafeLocationsModule {}
