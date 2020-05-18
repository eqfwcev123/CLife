import { type } from "os";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { HashTag } from "./HashTag";
import { Comment } from "./Comment";
import { Image } from "./Image";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  title!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  content!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // Many post To One User
  @ManyToOne((type) => User, (user) => user.posts, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user!: User;

  // One post To Many Comment
  @OneToMany((type) => Comment, (comment) => comment.content)
  comment!: Comment;

  // One post To Many Image
  @OneToMany((type) => Image, (image) => image.post)
  images!: Image[];

  // Many post To Many HashTags
  @ManyToMany((type) => HashTag)
  @JoinTable({
    name: "post_hashtag_hashtagger",
    joinColumn: { name: "postid" },
    inverseJoinColumn: { name: "tagid" },
  })
  hashtags!: HashTag[];

  // Many post To Many user(like)
  @ManyToMany((type) => User)
  @JoinTable({
    name: "post_like_likeuser",
    joinColumn: { name: "like" },
    inverseJoinColumn: { name: "liker" },
  })
  post!: Post[];
}
