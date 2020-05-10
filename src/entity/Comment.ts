import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { type } from "os";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: true,
  })
  content: string;

  @CreateDateColumn()
  created_date: Date;

  // Many Comment to One User
  @ManyToOne((type) => User, (user) => user.comments, {
    nullable: true,
    onDelete: "CASCADE",
  })
  user: User;

  // Many Comment to One Post
  @ManyToOne((type) => Post, (post) => post.id)
  post: Post;
}
