import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "HAIZAHA" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 255 })
  nom: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("enum", {
    name: "role",
    nullable: true,
    enum: ["Super Admin", "Operateur", "Supervisor", "Viewer"],
  })
  role: "Super Admin" | "Operateur" | "Supervisor" | "Viewer" | null;

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
