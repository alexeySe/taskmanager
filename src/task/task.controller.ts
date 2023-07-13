import { Body, Controller, Post } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    
    constructor(private taskService: TaskService) {}

    @Post()
    create(@Body() dto: TaskDto) {
        return this.taskService.createTask(dto)
    }
}
