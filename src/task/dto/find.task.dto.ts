import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FindTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly id: number
}