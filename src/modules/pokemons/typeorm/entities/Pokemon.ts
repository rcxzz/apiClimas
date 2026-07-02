import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Trainer from '@modules/trainers/typeorm/entities/Trainer';

@Entity('pokemons')
export default class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('int')
  level: number;

  @Column('int')
  hp: number;

  @Column()
  rarity: string;

  @Column()
  trainer_id: string;

  @ManyToOne(
    () => Trainer,
    trainer => trainer.pokemons,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'trainer_id',
  })
  trainer: Trainer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}