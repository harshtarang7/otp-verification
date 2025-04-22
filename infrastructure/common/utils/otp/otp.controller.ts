import { DataSource } from "typeorm";
import { OtpService } from "./otp.service";
import { Request, Response } from "express";
import { ErrorResponse } from "../../response-manager/response.helper";
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

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, otp } = req.body;

      if (!email || !password) {
        res.status(400).json(ErrorResponse('email is required'));
      }
      
      if (!password) {
        res.status(400).json(ErrorResponse('password is required'));
      }

      if (!otp) {
        res.status(400).json(ErrorResponse('otp is required'));
      }

      const isVerified = await this.otpService.verifyOtp(email, password, otp);

      if (isVerified.status) {
        res.status(200).json(ErrorResponse('OTP verified successfully'));
      } else {
        res.status(410).json(ErrorResponse('OTP invalid or expired')); 
      }
    } catch (error) {
      console.error("Error in verifyotp controller:", error);
      res.status(500).json(ErrorResponse(error.message,`Internal server error: ${error.message}`));
    }
  }
}
