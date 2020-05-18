import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 250,
  })
  src!: string;

  // Many image To One post
  @ManyToOne((type) => Post, (post) => post.images)
  post!: Post;
}
