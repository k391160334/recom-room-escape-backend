import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeTime } from 'src/themeTimes/themeTime.entity';
import { Theme } from './theme.entity';
import { GetThemesRequestDto } from './dto/themes.get.req.dto';
import { GetThemesResponseDto } from './dto/themes.get.res.dto';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,
    @InjectRepository(ThemeTime)
    private themeTimesRepository: Repository<ThemeTime>,
  ) {}

  pageSize = 10;

  async getThemes({
    from,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortType,
    page,
  }: GetThemesRequestDto): Promise<GetThemesResponseDto[]> {
    const Themes = this.themesRepository
      .createQueryBuilder()
      .subQuery()
      .from(Theme, 'theme')
      .innerJoin('theme.cafe_id', 'cafe')
      .select([
        'theme.id AS id',
        'theme.recommendation_score AS recommendation_score',
        'theme.theme_name AS theme_name',
        'theme.creation_date AS creation_date',
        'theme.difficulty_score AS difficulty_score',
        'theme.horror_score AS horror_score',
        'theme.duration AS duration',
        'theme.theme_poster_img_url AS theme_poster_img_url',
        'cafe.cafe_name AS cafe_name',
        'cafe.longitude AS cafe_longitude',
        'cafe.latitude AS cafe_latitude',
        '0 AS review_count', // TODO: 리뷰 카운트
      ])
      .getQuery();

    console.log(Themes);
    // 필터 조건 : 플레이 시작 시각, 플레이 예약 오픈 여부
    const themeTimes = await this.themeTimesRepository
      .createQueryBuilder('time')
      .leftJoin(Themes, 'theme', 'theme.id = time.theme_id')
      .where('time.start_time >= :from', { from })
      .andWhere('time.reservation_open = :isOpen', { isOpen: true })
      .select([
        'theme.recommendation_score AS recommendation_score',
        'theme.theme_name AS theme_name',
        'theme.creation_date AS creation_date',
        'theme.difficulty_score AS difficulty_score',
        'theme.horror_score AS horror_score',
        'theme.duration AS duration',
        'theme.theme_poster_img_url AS theme_poster_img_url',
        'theme.cafe_name AS cafe_name',
        'theme.cafe_longitude AS cafe_longitude',
        'theme.cafe_latitude AS cafe_latitude',
        'theme.review_count AS review_count',
        'time.start_time AS start_time',
        'time.reservation_done AS reservation_done',
      ])
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize)
      .getRawMany();

    // TODO: 정렬

    return themeTimes;
  }
}
// TODO: 테스트 작성
