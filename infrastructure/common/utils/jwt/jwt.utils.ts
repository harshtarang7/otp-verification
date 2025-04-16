import { UserEntity } from "../../../data-models/user/users.entity";
import jwt from 'jsonwebtoken'

export const generateToken = (user:UserEntity):string=>{
    return jwt.sign(
        {id:user.id,email:user.email},
        process.env.JWT_SECRET as string,
        {expiresIn:'1d'}
    )
}
export const verifyToken = (token: string): jwt.JwtPayload | string => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  };