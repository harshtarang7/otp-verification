import { DataSource } from "typeorm";
import { OtpService } from "./otp.service";
import { Request, Response } from "express";
export class OtpController {
  private readonly otpService: OtpService;
  constructor(dataSource: DataSource) {
    this.otpService = new OtpService(dataSource);
  }

  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({
          message: "email and password are required",
        });
      }

      const isSent = await this.otpService.sendOtp(email, password);

      if (isSent) {
        res.status(200).json({
          message: "OTP sent successfully",
        });
      } else {
        res.status(500).json({
          message: "Invalid credentials or failed to send OTP",
        }); 
      }
    } catch (error) {
      console.error("Error in sendOtp controller:", error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
