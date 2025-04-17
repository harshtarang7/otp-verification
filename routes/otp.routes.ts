import { Router } from "express";
import { LoginController } from "../infrastructure/modules/login/login.controller";
import { DataSource } from "typeorm";
import { OtpController } from "../infrastructure/common/utils/otp/otp.controller";

export function initOtpRouter(ds: DataSource): Router {
    const router = Router();

    const otpController = new OtpController(ds);

    router.post('/send-otp', otpController.sendOtp.bind(otpController));
    // router.post('/login', otpController.login.bind(loginController));

    return router;
}