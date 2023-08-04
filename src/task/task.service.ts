import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { TaskStatusEnum } from './enums/task.enums';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    async createTask(dto: TaskDto, id: number) {
        if (Object.values(TaskStatusEnum).includes(dto.status as TaskStatusEnum)) {
            const newTask = {
                title: dto.title,
                text: dto.text,
                user: { id },
                status: dto.status
            }
            return await this.taskRepository.save(newTask)
        }
        throw new BadRequestException(`Invalid task status: ${dto.status}`)
    }

    async findAll(id: number) {
        return await this.taskRepository.find({
            where: {
                user: { id }
            },
            order: {
                createdAt: 'DESC'
            }
        })
    }
    



}
