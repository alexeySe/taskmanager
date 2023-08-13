import { IsNotEmpty, IsString } from "class-validator"
import { TaskStatusEnum } from "../enums/task.enums"

export class TaskDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly text: string

    @IsNotEmpty()
    @IsString()
    readonly status: TaskStatusEnum

    
}

