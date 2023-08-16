import { IsNotEmpty, IsString } from "class-validator"
import { TaskStatusEnum } from "../enums/task.enums"
import { ApiProperty } from "@nestjs/swagger"

export class TaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly text: string

    @ApiProperty({enum: TaskStatusEnum})
    @IsNotEmpty()
    @IsString()
    readonly status: TaskStatusEnum

    
}

