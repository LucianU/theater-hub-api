import { Entity, Column, PrimaryGeneratedColumn,
                JoinColumn, OneToMany, OneToOne, ManyToOne }  from "typeorm";
import { BaseEntity }                                         from "./BaseEntity";
import { User }                                               from "./User";
import { ProjectImage }                                       from "./ProjectImage";
import { ProjectNeed }                                        from "./ProjectNeed";
import { ProjectUpdate }                                      from "./ProjectUpdate";
import { CurrencyType, VisibilityType }                       from "../enums";

@Entity("Project")
export class Project extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  ID: string;

  @Column("varchar", { length: 100 })
  Name: string;

  @Column("varchar", { length: 500, nullable: true })
  Description: string;

  @Column("varchar", { length: 100, nullable: true })
  Email: string;

  @Column("varchar", { length: 50, nullable: true })
  PhoneNumber: string;

  @Column("timestamp with time zone")
  Date: Date;

  @Column("money", { nullable: true })
  Budget: number;

  @Column()
  Currency: CurrencyType;

  @Column("varchar", { length: 100 })
  City: string;

  @ManyToOne(type => User, initiator => initiator.Projects, { onDelete: "CASCADE" })
  @JoinColumn({ name: "InitiatorID" })
  Initiator: User;

  @OneToOne(type => ProjectImage, { cascade: true, eager: true })
  @JoinColumn({ name: "ImageID" })
  Image: ProjectImage;

  @OneToMany(type => ProjectNeed, need => need.Project, { cascade: true, eager: true })
  Needs: ProjectNeed[];

  @OneToMany(type => ProjectUpdate, update => update.Project, { cascade: true, eager: true })
  Updates: ProjectUpdate[];

  @Column()
  Visibility: VisibilityType;

}
