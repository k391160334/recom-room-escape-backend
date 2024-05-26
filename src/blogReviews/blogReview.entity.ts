import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Theme } from '../themes/theme.entity';
import { ServiceUser } from '../serviceUsers/serviceUsers.entity';

@Entity()
export class BlogReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Theme, (theme) => theme.id)
  @JoinColumn({ name: 'theme_id' })
  theme_id: Theme;

  @ManyToOne(() => ServiceUser, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: ServiceUser;

  @Column({ length: 20 })
  blog_name: string;

  @Column({ length: 30 })
  title: string;

  @Column({ length: 100 })
  url: string;

  @Column({ length: 100 })
  thumbnail_img_url: string;

  @Column({ comment: '미정' })
  platform: number;
}
