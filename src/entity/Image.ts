import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  src!: string;

  // Many image To One post
  // Many image To One post
  @ManyToOne((type) => Post, (post) => post.image)
  post!: Post;
}
