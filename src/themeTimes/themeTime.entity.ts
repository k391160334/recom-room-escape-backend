import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Theme } from '../themes/theme.entity';

@Entity()
export class ThemeTime {
  @PrimaryGeneratedColumn()
  @ManyToOne(() => Theme, (theme) => theme.id)
  @JoinColumn({ name: 'theme_id' })
  theme_id: Theme;

  @PrimaryGeneratedColumn()
  start_time: number;

  @Column()
  reservation_done: boolean;

  @Column()
  reservation_open: boolean;
}
