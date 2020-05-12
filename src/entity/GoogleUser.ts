import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class GoogleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  password: string;
}
