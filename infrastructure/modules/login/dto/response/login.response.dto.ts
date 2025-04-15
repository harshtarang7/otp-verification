import { UserEntity } from "../../../../data-models/user/users.entity";

export class LoginReponseDto extends UserEntity{
    token:string
}