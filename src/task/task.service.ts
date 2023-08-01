import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    async createTask(dto: TaskDto, id: number) {
        const newTask = {
            title: dto.title,
            text: dto.text,
            user: { id }
        }

        return await this.taskRepository.save(newTask)
    }

    async findAll(id: number) {
        return await this.taskRepository.find({
            where: {
                user: {id}
            },
            order: {
                createdAt: 'ASC'
            }
        })
        
    }



}
