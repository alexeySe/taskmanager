import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
    
    constructor(private taskService: TaskService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: TaskDto, @Req() req) {
        return this.taskService.createTask(dto, +req.user.id)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.taskService.findAll(+req.user.id)
    }
}
