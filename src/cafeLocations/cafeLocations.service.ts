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

  async getCafeLocations(): Promise<GetCafeLocationsResponseDto> {
    const cafeLocations: { id: number; depth1: string; depth2: string }[] =
      await this.cafeLocationsRepository
        .createQueryBuilder('cafe_location')
        .select(['id', 'depth1', 'depth2'])
        .orderBy('depth1_priority')
        .orderBy('depth2_priority')
        .getRawMany(); // TODO : 객체 형식으로 nest하게 받아오거나 응답할 수 있는지 체크

    const cafeLocationGroup: GetCafeLocationsResponseDto = [
      { name: '', children: [] }, // dummy
    ];
    cafeLocations.forEach((location) => {
      const item = {
        name: location.depth2,
        id: location.id,
      };

      if (
        cafeLocationGroup[cafeLocationGroup.length - 1].name === location.depth1
      ) {
        cafeLocationGroup[cafeLocationGroup.length - 1].children.push(item);
      } else {
        cafeLocationGroup.push({ name: location.depth1, children: [item] });
      }
    });
    cafeLocationGroup.shift();

    return cafeLocationGroup;
  }
}
// TODO: 테스트 작성
