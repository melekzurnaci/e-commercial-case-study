import { ERROR_CODE, ERROR_TYPE } from "../constants/http.constants";
import { NotFoundException } from "../errors/classes";
import { BaseErrorException } from "../errors/classes/BaseException";
import { AuthCredentials } from "../interfaces/authCredentials";
import { JwtPayload } from "../interfaces/jwtPayload";
import { LoginCredentials } from "../interfaces/login";
import { UserEntity } from "../interfaces/userEntity";
import userRepository from "../repositories/userRepository";
import * as bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

const singup = async (authCredentials: AuthCredentials): Promise<string> => {
  const salt = await bcyrpt.genSalt();
  const hashedPassword = await bcyrpt.hash(authCredentials.password, salt);
  const user = await userRepository.createUser({
    ...authCredentials,
    password: hashedPassword,
  });

  const payload: JwtPayload = {
    userId: user.id,
  };
  const accessToken: string = jwt.sign(payload, "secretKey");
  return accessToken;
};
const singin = async (loginCredentials: LoginCredentials): Promise<string> => {
  const { email, password } = loginCredentials;

  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new NotFoundException("user not found..");
  }

  if (await bcyrpt.compare(password, user.password)) {
    const payload: JwtPayload = {
      userId: user.id,
    };
    const accessToken: string = jwt.sign(payload, "secretKey");
    return accessToken;
  }
  throw new BaseErrorException(
    "Unathorized Exception...",
    ERROR_CODE.UNAUTHORIZED_ERROR,
    ERROR_TYPE.UNAUTHORIZED_ERROR,
    { email }
  );
};
const getUser = async (authorization: any): Promise<UserEntity> => {
  const verify: JwtPayload = jwt.verify(
    authorization,
    "secretKey"
  ) as JwtPayload;

  const user = await userRepository.findUserWithCart(verify.userId);

  if (!user) {
    throw new BaseErrorException(
      "unauthorized",
      ERROR_CODE.UNAUTHORIZED_ERROR,
      ERROR_TYPE.UNAUTHORIZED_ERROR
    );
  }
  return user;
};

export default { singup, singin, getUser };
