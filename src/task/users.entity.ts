import { User } from 'src/users/users.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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


  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

}
