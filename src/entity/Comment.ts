import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { type } from "os";
import { User } from "./User";

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

  @ManyToOne((type) => User, (user) => Comment.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  user: User;
}
