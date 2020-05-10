import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  src: string;
}
