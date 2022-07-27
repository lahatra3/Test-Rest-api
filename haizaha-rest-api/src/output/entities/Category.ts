import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category", { schema: "HAIZAHA" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "label", length: 255 })
  label: string;
}
