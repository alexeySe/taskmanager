import { IsNotEmpty, IsString } from "class-validator"
import { User } from "src/users/users.entity"

export class TaskDto {
    @IsNotEmpty()
    readonly user: User

    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly text: string
}

