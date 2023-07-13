import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  text: string;

  @CreateDateColumn({ default: new Date(), type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ default: new Date(), type: 'timestamptz' })
  updatedAt!: Date;

//   @ManyToOne(() => User, (user) => user.id)
//   user: User

}
