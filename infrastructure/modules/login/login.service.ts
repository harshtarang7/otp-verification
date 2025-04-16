import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../../data-models/user/users.entity";
import { LoginReponseDto } from "./dto/response/login.response.dto";
import { SignUpDto } from "./dto/request/sign-up.request.dto";
import { LoginRequestDto } from "./dto/request/login.dto";
import { ApiResponse, ErrorResponse, SuccessResponse } from "../../common/response-manager/response.helper";
import { generateToken } from "../../common/utils/jwt/jwt.utils";

export class LoginService {
  private readonly dataSource: DataSource;
  private readonly userRepository: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
    this.userRepository = dataSource.getRepository(UserEntity);
  }

  async signUp(dto: SignUpDto): Promise<UserEntity> {
    try {
      const { name, email, password, dob } = dto;

      const isUserExist = await this.userRepository.findOne({
        where: { email },
      });
      if (isUserExist) {
        throw new Error(`this email : ${email} is already registered`);
      }
      const user = this.userRepository.create({
        name,
        email,
        dob,
        password,
        active: true,
        verified: false,
      });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginRequestDto): Promise<ApiResponse<LoginReponseDto>> {
    try {
      const isUserExist = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (!isUserExist) throw new Error("no user found with this email");

      const isPasswordValid = await isUserExist.validatePassword(dto.password);
      if (!isPasswordValid) throw new Error("Invalid password");

      const token = generateToken(isUserExist)
      const loggedUser = new LoginReponseDto()
      loggedUser.token = token;
      loggedUser.user = isUserExist

      return SuccessResponse(loggedUser,'successfully logged in')
    } catch (error) {
      return ErrorResponse(error,`Internal server error:${error.message}`)
    }
  }
}
