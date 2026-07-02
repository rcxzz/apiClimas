import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import City from '@modules/cities/typeorm/entities/City';

@Entity('forecasts')
export default class Forecast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  data_previsao: Date;

  @Column('decimal', { precision: 4, scale: 1 })
  temperatura_maxima: number;

  @Column('decimal', { precision: 4, scale: 1 })
  temperatura_minima: number;

  @Column()
  condicao_climatica: string;

  @Column('int')
  umidade_ar: number;

  @Column()
  city_id: string;

  @ManyToOne(
    () => City,
    city => city.forecasts,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'city_id',
  })
  city: City;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}