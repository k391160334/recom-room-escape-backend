import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ServiceUser } from '../serviceUsers/serviceUsers.entity';
import { BlogReview } from '../blogReviews/blogReview.entity';

@Entity()
export class BlogReveiwLike {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceUser, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: ServiceUser;

  @ManyToOne(() => BlogReview, (blogReview) => blogReview.id)
  @JoinColumn({ name: 'blogReview_id' })
  blogReview_id: BlogReview;
}
