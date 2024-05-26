import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from 'src/cafes/cafe.entity';
import { ThemeTime } from 'src/themeTimes/themeTime.entity';
import { CafeLocation } from 'src/cafeLocations/cafeLocation.entity';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { Theme } from './theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, Cafe, ThemeTime, CafeLocation])],
  providers: [ThemesService],
  controllers: [ThemesController],
})
export class ThemesModule {}
