import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Forecast from '@modules/forecasts/typeorm/entities/Forecast';

@Entity('cities')
export default class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  estado: string;

  @Column()
  pais: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @OneToMany(
    () => Forecast,
    forecast => forecast.city,
    {
      cascade: true,
    },
  )
  forecasts: Forecast[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}