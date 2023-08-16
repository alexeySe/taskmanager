import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ApiProperty()
  @Column({ unique: true, nullable: false})
  email: string;

  @Column({nullable: false})
  password: string;

}
