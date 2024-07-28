import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CafeLocationsService } from './cafeLocations.service';
import { GetCafeLocationsResponseDto } from './dto/cafeLocations.get.res.dto';

@Controller('cafeLocations')
@ApiTags('지역')
export class CafeLocationsController {
  constructor(private readonly cafeLocationsService: CafeLocationsService) {}

  @Get()
  @ApiOperation({
    summary: '지역 목록',
    description: '홈화면 > 지역 > 지역 선택 목록',
  })
  @ApiCreatedResponse({
    description: '모든 지역 목록 반환',
  })
  getCafeLocations(): Promise<GetCafeLocationsResponseDto[]> {
    return this.cafeLocationsService.getCafeLocations();
  }
}
// TODO: 테스트 작성
