import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Pokemon from '@modules/pokemons/typeorm/entities/Pokemon';

@Entity('trainers')
export default class Trainer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city_origin: string;

  @Column('int')
  age: number;

  @Column('int')
  badges: number;

  @Column('int')
  trainer_level: number;

  @OneToMany(
    () => Pokemon,
    pokemon => pokemon.trainer,
  )
  pokemons: Pokemon[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}