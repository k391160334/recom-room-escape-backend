import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './theme.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  searchThemes(): Promise<Theme[]> {
    return this.themesRepository.find();
  }
}
// TODO: 테스트 작성
