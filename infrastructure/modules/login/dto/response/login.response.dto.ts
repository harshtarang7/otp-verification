import { UserEntity } from "../../../../data-models/user/users.entity";

export class LoginReponseDto{
    user:UserEntity
    token:string
}