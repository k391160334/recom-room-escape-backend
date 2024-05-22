import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ThemesService } from './themes.service';
import { Theme } from './theme.entity';

@Controller('themes')
@ApiTags('테마')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  @ApiOperation({
    summary: '테마 검색',
    description: '홈 화면',
  })
  @ApiCreatedResponse({
    description:
      '검색조건에 맞추어 검색한 테마를 정렬조건에 맞추어 정렬하여 반환',
  })
  getHello(): Promise<Theme[]> {
    return this.themesService.searchThemes();
  }
}
// TODO: 테스트 작성
