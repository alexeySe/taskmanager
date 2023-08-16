import { ApiPropertyOptional } from "@nestjs/swagger";
import { TaskStatusEnum } from "../enums/task.enums";

export class FindAllTaskDto {
    @ApiPropertyOptional()
    readonly status: TaskStatusEnum
}