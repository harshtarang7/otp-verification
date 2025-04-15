import { DataSource, getRepository } from "typeorm";
import { LoginService } from "./login.service";
import { UserEntity } from "../../data-models/user/users.entity";
import { SignUpDto } from "./dto/request/sign-up.request.dto";
import { Request, Response } from 'express';

export class LoginController{
    private readonly loginService:LoginService;
    constructor(dataSource:DataSource) {
        this.loginService = new LoginService(dataSource);
    }

    async signUp(req:Request, res:Response):Promise<void>{
        try {
            const signUpDto:SignUpDto = req.body;
            const result = await this.loginService.signUp(signUpDto);
            res.status(201).json({
                message:'User registered Successfully',
                ...result
            })
        } catch (error:any) {
            console.error(error)
            res.status(400).json({
                message: error.message || 'Failed to register user'
            });
        }
    }
}