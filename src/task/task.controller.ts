import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FindTaskDto } from './dto/find.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { TaskStatusEnum } from './enums/task.enums';
import { FindAllTaskDto } from './dto/findAll.task.dto';

@Controller('tasks')
export class TaskController {
    
    constructor(private taskService: TaskService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() dto: TaskDto, @Req() req) {
        return this.taskService.createTask(dto, +req.user.id)
    }

    @Get('admin')
    @UseGuards(JwtAuthGuard)
    findAllAdmin(@Body() findAllTaskDto: FindAllTaskDto) {
        return this.taskService.findAllAdmin(findAllTaskDto.status)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Body() findAllTaskDto: FindAllTaskDto, @Req() req) {
        return this.taskService.findAll(+req.user.id, findAllTaskDto.status)
    }

    @Get('task')
    @UseGuards(JwtAuthGuard)
    findOne(@Body() findDto: FindTaskDto, @Req() req) {
        return this.taskService.findOne(findDto.id, +req.user.id)
    }
    @Put()
    @UseGuards(JwtAuthGuard)
    updateTask(@Body() updateDto: UpdateTaskDto , @Req() req) {
        return this.taskService.updateTask(updateDto, +req.user.id)
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    deleteTask(@Body() findDto: FindTaskDto, @Req() req) {
        return this.taskService.deleteTask(findDto.id, +req.user.id)
    }

}
