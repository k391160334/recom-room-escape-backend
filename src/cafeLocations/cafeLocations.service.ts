import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CafeLocation } from './cafeLocation.entity';
import { GetCafeLocationsResponseDto } from './dto/cafeLocations.get.res.dto';

@Injectable()
export class CafeLocationsService {
  constructor(
    @InjectRepository(CafeLocation)
    private cafeLocationsRepository: Repository<CafeLocation>,
  ) {}

  async getCafeLocations(): Promise<GetCafeLocationsResponseDto[]> {
    const cafeLocations = await this.cafeLocationsRepository
      .createQueryBuilder('cafe_location')
      .select(['id', 'depth1', 'depth2'])
      .getRawMany(); // TODO : 객체 형식으로 nest하게 받아오거나 응답할 수 있는지 체크

    return cafeLocations;
  }
}
// TODO: 테스트 작성
