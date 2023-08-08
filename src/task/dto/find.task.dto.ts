import { IsNotEmpty } from "class-validator";

export class FindTaskDto {
    @IsNotEmpty()
    readonly id: number
}