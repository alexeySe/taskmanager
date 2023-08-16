import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { TaskStatusEnum } from './enums/task.enums';
import { User } from 'src/users/users.entity';
import { UpdateTaskDto } from './dto/update.task.dto';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>,
        @InjectRepository(User) private userRepository: Repository<User>) { }

    async createTask(dto: TaskDto, id: number) {
        if (Object.values(TaskStatusEnum).includes(dto.status as TaskStatusEnum)) {
            try {
                const user = await this.userRepository.findOneBy({ id });
                // const user2 = await this.userRepository.findOneBy({ id: 21 }); // просто потестить
                // const user3 = await this.userRepository.findOneBy({ id: 22 });
                const newTask = new Task();
                newTask.title = dto.title;
                newTask.text = dto.text;
                newTask.status = dto.status;

                newTask.users = [user]; // добавлять больше пользователей из проекта
                return await this.taskRepository.save(newTask);
            } catch (error) {
                throw new Error(error)
            }
        }
        throw new BadRequestException(`Invalid task status: ${dto.status}`)
    }

    //  посмотреть что есть
    async findAllAdmin(filterStatus?: TaskStatusEnum) {
        try {
            const queryBuilder = this.taskRepository.createQueryBuilder('task')
            if(filterStatus) {
                queryBuilder.where('task.status = :status', {status: filterStatus})
            }
            const tasks = queryBuilder
            .leftJoinAndSelect('task.users', 'user')
            .orderBy('task.createdAt', 'DESC')
            .getMany()
            return tasks
            
        } catch (error) {
            throw new Error(error)
        }
    }

    async findAll(userId: number, filterStatus?: TaskStatusEnum) {
        try {
            const queryBuilder = this.taskRepository.createQueryBuilder('task')
            if(filterStatus) {
                queryBuilder.where('task.status = :status', {status: filterStatus})
            }
            if (userId) {
                queryBuilder.andWhere('user.id = :userId', { userId });
            }
            const tasks = await queryBuilder
            .leftJoinAndSelect('task.users', 'user')
            .orderBy('task.createdAt', 'DESC')
            .getMany()
            return tasks
            
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOne(taskId: number, userId: number) {
        const task = await this.taskRepository.findOne({
            relations: ['users'],
            where: {
                id: taskId
            },
        });
        // переделать под нормальный запрос
        if (!task) {
            throw new NotFoundException('Task not found')
        }
        if (!task.users.some(user => user.id === userId)) {
            throw new NotFoundException('This task is not available')
        }
        task.users.forEach(user => {
            delete user.password;
        });
        return task
    }

    async updateTask(dto: UpdateTaskDto, id: number) {
        const task = await this.taskRepository.findOne({
            relations: ['users'],
            where: {
                id: dto.id
            },
        });
        // переделать под нормальный запрос
        if (!task) {
            throw new NotFoundException('Task not found')
        }
        if (!task.users.some(user => user.id === id)) {
            throw new NotFoundException('This task is not available')
        }
        if (Object.values(TaskStatusEnum).includes(dto.status as TaskStatusEnum)) {
            try {
                const user = await this.userRepository.findOneBy({ id });
                // const user2 = await this.userRepository.findOneBy({ id: 12 }); // просто потестить
                // const user3 = await this.userRepository.findOneBy({ id: 13 });
                const newTask = task;
                newTask.title = dto.title;
                newTask.text = dto.text;
                newTask.status = dto.status;

                newTask.users = [user]; // добавлять больше пользователей из проекта

                return await this.taskRepository.save(newTask);
            } catch (error) {
                throw new Error(error)
            }
        }
        throw new BadRequestException(`Invalid task status: ${dto.status}`)
    }


    async deleteTask(taskId: number, userId: number) {
            const task = await this.taskRepository.findOne({
                relations: ['users'],
                where: {
                    id: taskId
                },
            });
            console.log(task)
            // переделать под нормальный запрос
            if (!task) {
                throw new NotFoundException('Task not found')
            }
            if (!task.users.some(user => user.id === userId)) {
                throw new NotFoundException('This task is not available')
            }

            task.users = [];
            try {
                await this.taskRepository.save(task);
                await this.taskRepository.delete(taskId);
            } catch (error) {
                throw new Error(error)
            }
            throw new HttpException('Task deleted', HttpStatus.OK)
    }
}
