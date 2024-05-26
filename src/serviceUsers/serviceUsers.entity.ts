import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  string_id: string;

  @Column({ length: 256 })
  pw: string;

  @Column({ length: 10 })
  nickname: string;

  @Column()
  status: number;

  @Column({ length: 50 })
  profile_img_url: string;
}
