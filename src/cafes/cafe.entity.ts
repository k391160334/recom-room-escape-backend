import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CafeLocation } from '../cafeLocations/cafeLocation.entity';

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CafeLocation, (location) => location.id)
  @JoinColumn({ name: 'location_id' })
  location_id: CafeLocation;

  @Column({ length: 50 })
  cafe_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  longitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  latitude: number;
}
