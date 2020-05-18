import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  created_date!: Date;

  @Column({
    type: "varchar",
    length: 100,
  })
  title!: string;
}
