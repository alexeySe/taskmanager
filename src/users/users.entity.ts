import { Task } from 'src/task/users.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true, nullable: false})
  email: string;

  @Column({nullable: false})
  password: string;

  @OneToMany(() => Task, (task) => task.user, {onDelete: 'CASCADE'})
  task: Task[]


}
