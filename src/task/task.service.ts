import { Injectable } from '@nestjs/common';
import { Task } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

    async createTask(dto: TaskDto) {
        const task = await this.taskRepository.save(dto)
        return task
    }
}
