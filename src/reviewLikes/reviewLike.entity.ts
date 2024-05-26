import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceUser } from '../serviceUsers/serviceUsers.entity';
import { Review } from '../reviews/review.entity';

@Entity()
export class ReveiwLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceUser, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: ServiceUser;

  @ManyToOne(() => Review, (review) => review.id)
  @JoinColumn({ name: 'review_id' })
  review_id: Review;
}
