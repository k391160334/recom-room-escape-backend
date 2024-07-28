import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeTime } from 'src/themeTimes/themeTime.entity';
import { isNumber } from 'class-validator';
import { Theme } from './theme.entity';
import { GetThemesRequestDto } from './dto/themes.get.req.dto';
import { GetThemesResponseDto } from './dto/themes.get.res.dto';
import { SortType } from './theme.constant';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,
    @InjectRepository(ThemeTime)
    private themeTimesRepository: Repository<ThemeTime>,
  ) {}

  private pageSize = 10;

  private async getThemesSortedByDistance({
    longitude,
    latitude,
    from,
    page,
  }: {
    longitude: number;
    latitude: number;
    from: number;
    page: number;
  }): Promise<GetThemesResponseDto[]> {
    if (!isNumber(longitude) || !isNumber(latitude))
      throw new Error('invalid parameter');

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
      .addSelect(
        `((cafe.longitude-${longitude}) ^ 2.0 + (cafe.latitude-${latitude}) ^ 2.0) AS distance`,
      )
      .orderBy('distance')
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize)
      .getQuery();

    // 필터 조건 : 플레이 시작 시각, 플레이 예약 오픈 여부
    const themeTimes = await this.themeTimesRepository
      .createQueryBuilder('time')
      .leftJoin(Themes, 'theme', 'theme.id = time.theme_id')
      .where('start_time >= :from', { from })
      .andWhere('reservation_open = :isOpen', { isOpen: true })
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
      .getRawMany(); // TODO : 객체 형식으로 nest하게 받아오거나 응답할 수 있는지 체크

    return themeTimes;
  }

  async getThemeSortedByRecommendation({
    from,
    page,
  }: {
    from: number;
    page: number;
  }): Promise<GetThemesResponseDto[]> {
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
      .orderBy('recommendation_score', 'DESC')
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize)
      .getQuery();

    // 필터 조건 : 플레이 시작 시각, 플레이 예약 오픈 여부
    const themeTimes = await this.themeTimesRepository
      .createQueryBuilder('time')
      .leftJoin(Themes, 'theme', 'theme.id = time.theme_id')
      .where('start_time >= :from', { from })
      .andWhere('reservation_open = :isOpen', { isOpen: true })
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
      .getRawMany(); // TODO : 객체 형식으로 nest하게 받아오거나 응답할 수 있는지 체크

    return themeTimes;
  }

  async getThemeSortedByStartTime({
    from,
    page,
  }: {
    from: number;
    page: number;
  }): Promise<GetThemesResponseDto[]> {
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
      .addSelect('theme.fastest_start_time AS theme_fastest_start_time')
      .orderBy('theme_fastest_start_time')
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize)
      .getQuery();

    // 필터 조건 : 플레이 시작 시각, 플레이 예약 오픈 여부
    const themeTimes = await this.themeTimesRepository
      .createQueryBuilder('time')
      .leftJoin(Themes, 'theme', 'theme.id = time.theme_id')
      .where('start_time >= :from', { from })
      .andWhere('reservation_open = :isOpen', { isOpen: true })
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
      .getRawMany(); // TODO : 객체 형식으로 nest하게 받아오거나 응답할 수 있는지 체크
    return themeTimes;
  }

  async getThemes({
    from,
    sortType,
    page,
    longitude,
    latitude,
  }: GetThemesRequestDto): Promise<GetThemesResponseDto[]> {
    // let query = this.themesRepository
    //   .createQueryBuilder()
    //   .subQuery()
    //   .from(Theme, 'theme')
    //   .innerJoin('theme.cafe_id', 'cafe');
    // HERE : 필터별로 작업

    let themes: GetThemesResponseDto[];
    switch (sortType) {
      case SortType.DISTANCE:
        themes = await this.getThemesSortedByDistance({
          from,
          page,
          longitude: +longitude, // TODO: query parameter 타입 변환 모듈 분리
          latitude: +latitude,
        });
        break;
      case SortType.RECOMMENDATION:
        themes = await this.getThemeSortedByRecommendation({
          from,
          page,
        });
        break;
      case SortType.EARLY_START:
        themes = await this.getThemeSortedByStartTime({
          from,
          page,
        });
        break;
      default:
        throw new Error('invalid sort type');
    }
    return themes;
  }
}
// TODO: 테스트 작성
