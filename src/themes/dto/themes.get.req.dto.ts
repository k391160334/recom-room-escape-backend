import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';

// TODO : 위치 이동
enum SortType {
  DISTANCE = 'distance',
  RECOMMENDATION = 'recommendation',
  EARLY_START = 'early-start',
  HIGH_DIFFICULTY = 'high-difficulty',
}

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
- 예약시간 빠른 순: early-start
- 난이도 높은 순: high-difficulty`,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(SortType)
  'sortType': SortType;

  @ApiProperty({
    example: 1,
    description: '페이지',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;
}
