import { IsNotEmpty, IsString } from "class-validator"
import { TaskStatusEnum } from "../enums/task.enums"

export class UpdateTaskDto {
    @IsNotEmpty()
    readonly id: number

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

