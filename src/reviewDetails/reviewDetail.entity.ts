import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Review } from '../reviews/review.entity';

@Entity()
export class ReviewDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Review, (review) => review.id)
  @JoinColumn({ name: 'review_id' })
  review_id: Review;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 50, nullable: true })
  contents: string;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  score: number;
}
