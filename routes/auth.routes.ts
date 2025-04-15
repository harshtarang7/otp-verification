import { Router } from "express";
import { LoginController } from "../infrastructure/modules/login/login.controller";
import { DataSource } from "typeorm";

export function initAuthRouter(ds: DataSource): Router {
    const router = Router();

    const loginController = new LoginController(ds);

    router.post('/signup', loginController.signUp.bind(loginController));

    return router;
}