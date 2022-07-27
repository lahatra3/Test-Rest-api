import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("article", { schema: "HAIZAHA" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "label", nullable: true, length: 255 })
  label: string | null;

  @Column("int", { name: "category_id" })
  categoryId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;
}
