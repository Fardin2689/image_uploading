import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  type: string;

  @Column()
  dimension: string;

  @Column()
  created: string;

  @Column()
  uploaded: string;

  @Column()
  thumbnail: string;

  @Column({ type: 'bytea', select: false })
  file: Buffer;
}
