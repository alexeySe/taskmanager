import { User } from 'src/users/users.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TaskStatusEnum } from './enums/task.enums';


@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  text: string;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    nullable: false
  })
  status: TaskStatusEnum

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToMany(() => User)
  @JoinTable()
  users: User[]

}
