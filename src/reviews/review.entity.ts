import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ServiceUser } from '../serviceUsers/serviceUsers.entity';
import { Theme } from '../themes/theme.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServiceUser, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user_id: ServiceUser;

  @ManyToOne(() => Theme, (theme) => theme.id)
  @JoinColumn({ name: 'theme_id' })
  theme_id: Theme;

  @Column()
  creation_time: number;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  recommendation_score: number;

  @Column('int', {
    nullable: true,
    array: true,
  })
  recommending_member_count: number[];

  @Column({ nullable: true })
  difficulty_score: number;

  @Column({ nullable: true })
  horror_score: number;

  @Column('int', {
    nullable: true,
    array: true,
  })
  activity_score: number[];

  @Column({ nullable: true })
  story_quality_score: number;

  @Column({ nullable: true })
  contents_quality_score: number;

  @Column({ nullable: true })
  interrior_quality_score: number;

  @Column({ nullable: true })
  quiz_quality_score: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  member_avg_history: number;

  @Column({ nullable: true })
  left_time: number;

  @Column({ nullable: true })
  hint_count: number;

  @Column({ length: 1000, nullable: true })
  short_comment: string;

  @Column({ length: 1000, nullable: true })
  long_comment: string;
}
