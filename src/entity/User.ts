import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  username: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany((type) => Post, (post) => post.user, { nullable: true })
  posts: Post[];
}
