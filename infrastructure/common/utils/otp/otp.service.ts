import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../../../data-models/user/users.entity";
import { userOtpEntity } from "../../../data-models/user-otp/user-otp.entity";
import nodemailer from "nodemailer";
import * as bcrypt from "bcrypt";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ApiResponse, ErrorResponse, SuccessResponse } from "../../response-manager/response.helper";

export class OtpService {
  private readonly dataSource: DataSource;
  private userRepository: Repository<UserEntity>;
  private otpRepository: Repository<userOtpEntity>;
  private transporter: nodemailer.Transporter;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.userRepository = dataSource.getRepository(UserEntity);
    this.otpRepository = dataSource.getRepository(userOtpEntity);

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      requireTLS: true,
      tls: {
        requireTLS: true,
        rejectUnauthorized: false,
        minVersion: "TLSv1.2",
      },
    } as SMTPTransport.Options);
  }

  private generateOtp(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async sendOtp(email: string, password: string): Promise<ApiResponse<boolean>> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error("User not found");
      }

      if(user.verified===true){
        throw new Error("User is already verified")
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("User not found");
      }

      const otp = this.generateOtp();

      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);

      // First, check if user already has an OTP
      let otpRecord = await this.otpRepository.findOne({
        where: { user_id: user.id },
      });

      if (otpRecord) {
        otpRecord.otp = otp;
        otpRecord.is_verified = false;
        otpRecord.expires_at = expiresAt;
      } else {
        otpRecord = this.otpRepository.create({
          user_id: user.id,
          otp,
          is_verified: false,
          expires_at: expiresAt,
        });
      }

      await this.otpRepository.save(otpRecord);

      await this.transporter.sendMail({
        from: `"OTPeee" <${process.env.SMTP_FROM_EMAIL}>`,
        to: user.email,
        subject: "Email.verifcation OTP",
        html: `
         <div>
            <h1>Email Verification</h1>
            <p>Hello ${user.name},</p>
            <p>Your OTP for email verification is: <strong>${otp}</strong></p>
            <p>This OTP will expire at  ${expiresAt.toLocaleString()}.</p>
          </div>
        `,
      });
      return SuccessResponse(true,'OTP sent Successfully');
    } catch (error) {
      throw error;
    }
  }

  async verifyOtp(
    email: string,
    password: string,
    otpToVerify: number
  ): Promise<ApiResponse<boolean>> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new Error("User not found");
      }

      if(user.verified===true){
        throw new Error("User is already verified")
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Invalid Password");
      }

      const otpRecord = await this.otpRepository.findOne({
        where: { user_id: user.id },
      });

      if (!otpRecord) {
        throw new Error("No OTP found for this user");
      }

      if (new Date() > otpRecord.expires_at) {
        throw new Error("OTP has Expired");
      }

      if (otpRecord.otp !== otpToVerify) {
        throw new Error("Invalid OTP");
      }

      otpRecord.is_verified = true;
      await this.otpRepository.save(otpRecord);

      //updating user verified status

      user.verified = true;
      await this.userRepository.save(user);

      return SuccessResponse(true,'OTP verified') 
    } catch (error) {
      throw error
    }
  }
}
