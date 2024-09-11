import { Exclude } from "class-transformer";
import { Photo } from "src/photo/photo.entity";

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Photo, (photo) => photo.author, { eager: false })
  photo: Photo[];
}
