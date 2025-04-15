import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { UserEntity } from "../infrastructure/data-models/user/users.entity";
import { userOtpEntity } from "../infrastructure/data-models/user-otp/user-otp.entity";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities:[UserEntity,userOtpEntity]
});

export const initialiseDatabase = async (): Promise<DataSource> => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connected");
    }
    return AppDataSource;
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
