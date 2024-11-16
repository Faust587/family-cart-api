import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cart')
export class CartSchema {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  constructor(id: number | null, name: string) {
    this.name = name;
  }
}
