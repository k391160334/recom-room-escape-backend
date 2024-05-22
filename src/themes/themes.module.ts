import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from 'src/cafes/cafe.entity';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';
import { Theme } from './theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme, Cafe])],
  providers: [ThemesService],
  controllers: [ThemesController],
})
export class ThemesModule {}
