import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn()
  id: number;
  // TODO: 컬럼 추가
}
