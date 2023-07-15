import { User } from "src/users/users.entity"

export class TaskDto {
    readonly userId: number
    readonly title: string
    readonly text: string
}

