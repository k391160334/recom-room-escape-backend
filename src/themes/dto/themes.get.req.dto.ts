import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { SortType } from '../theme.constant';

export class GetThemesRequestDto {
  @ApiProperty({
    example: Date.now(),
    description: '테마 시작 시각 최소값',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  from: number;

  @ApiProperty({
    example: 'recommendation',
    description: `정렬기준
- 가까운 순: distance
- 추천 순: recommendation
- 예약시간 빠른 순: early-start`,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(SortType)
  'sortType': SortType;

  @ApiProperty({
    example: 1,
    description: '테마 기준 페이지 (한 페이지: 10개 테마)',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({
    example: 126.957,
    description: '경도',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @ApiProperty({
    example: 37.50415,
    description: '위도',
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiProperty({
    example: '서울',
    description: '지역1',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  location1: string;

  @ApiProperty({
    example: '강남',
    description: '지역2',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  location2: string;

  @ApiProperty({
    example: '3.5~4.5',
    description: '추천도({최소}~{최대})',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  recommendationScore: string;

  @ApiProperty({
    example: '3.5.7',
    description: '추천 인원 수({값}.{값} ,7은 7명 이상)',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  recommendationMemberCount: string;

  @ApiProperty({
    example: '3.5~4.5',
    description: '난이도({최소}~{최대})',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  difficultyScore: string;

  @ApiProperty({
    example: '1~2',
    description: `조도/공포도({최소}~{최대})
- 밝음: 1
- 어두움: 2
- 약공포: 3
- 공포: 4`,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  horrorScore: string;

  @ApiProperty({
    example: '1.4',
    description: `기피 활동성({값}.{값})
- 머리조심: 1
- 수직이동 많음: 2
- 엉금엉금: 3
- 매우 넓음: 4`,
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  activityScore: string;

  @ApiProperty({
    example: 1716138279000,
    description: `테마 생성일의 최소값(epoch time(ms))`,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  creationDateMin: number;

  @ApiProperty({
    example: '60~90',
    description: `플레이 타임(분 단위)`,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: '30000~60000',
    description: `가격(원 단위)`,
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
