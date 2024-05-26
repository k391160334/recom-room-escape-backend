import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cafe } from '../cafes/cafe.entity';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cafe, (cafe) => cafe.id)
  @JoinColumn({ name: 'cafe_id' })
  cafe_id: Cafe;

  @Column({ length: 50 })
  theme_name: string;

  @Column({ length: 50, nullable: true })
  theme_poster_img_url: string;

  @Column({ nullable: true })
  creation_date: number;

  @Column()
  price: number;

  @Column({ comment: '분 단위' })
  duration: number;

  @Column({ length: 1000, nullable: true })
  explanation: string;

  @Column({ nullable: true })
  hint_count: number;

  @Column({ length: 50, nullable: true })
  hint_method: string;

  @Column({ nullable: true })
  min_playable_member_count: number;

  @Column({ nullable: true })
  max_playable_member_count: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  recommendation_score: number;

  @Column('int', { nullable: true, array: true })
  recommending_member_count: number[];

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  difficulty_score: number;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    nullable: true,
    comment: `조도/공포도
- 밝음: 1
- 어두움: 2
- 약공포: 3
- 공포: 4`,
  })
  horror_score: number;

  @Column('int', {
    nullable: true,
    array: true,
    comment: `활동성
- 머리조심: 1
- 수직이동 많음: 2
- 엉금엉금: 3
- 매우 넓음: 4`,
  })
  activity_score: number[];

  @Column({ nullable: true, comment: '수도권/비수도권 랭킹' })
  ranking_partial: number;

  @Column({ nullable: true, comment: '전국 랭킹' })
  ranking_total: number;
}
