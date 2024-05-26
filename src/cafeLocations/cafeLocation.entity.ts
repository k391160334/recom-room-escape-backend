import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CafeLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  depth1: string;

  @Column({ length: 10 })
  depth2: string;
}
