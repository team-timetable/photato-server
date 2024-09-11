import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.photo, { eager: false })
  author: User;

  @Column("longtext")
  firstPhoto: string;

  @Column("longtext")
  secondPhoto: string;

  @Column("longtext")
  thirdPhoto: string;

  @Column("longtext")
  fourthPhoto: string;

  @Column()
  takenDate: string;

  @Column('boolean')
  isPublic:boolean;
}