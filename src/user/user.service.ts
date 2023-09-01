import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginUserDto } from './dto/login-user.dto';
import { MailService } from '../mail/mail.service';
import { UpdateUserActivenessDto } from './dto/update-user-activeness.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async getAllUser(): Promise<User[]> {
    try {
      const users = await this.userRepo.findAll({
        include: { all: true },
      });

      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching users',
      );
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepo.findByPk(id);

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting user',
      );
    }
  }

  async deleteUserById(id: number) {
    try {
      const userToDelete = await this.getUserById(id);
      const numAffectedRows = await this.userRepo.destroy({ where: { id } });

      if (numAffectedRows === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return userToDelete;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An error occurred while deleting user',
      );
    }
  }

  //UPDATE USER
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const allowedProperties = [
      'first_name',
      'last_name',
      'user_photo',
      'short_bio',
      'phone_number',
      'email',
      'birthdate',
    ];

    const invalidProperties = Object.keys(updateUserDto).filter(
      (property) => !allowedProperties.includes(property),
    );

    if (invalidProperties.length > 0) {
      const invalidPropsList = invalidProperties.join(', ');
      const allowedPropsList = allowedProperties.join(', ');
      const errorMessage = `Invalid info: ${invalidPropsList}.\
 Only the following properties are allowed to be updated:\
 ${allowedPropsList}.`;

      throw new BadRequestException(errorMessage);
    }

    const [numAffectedRows, updatedUsers] = await this.userRepo.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (numAffectedRows === 0) {
      throw new BadRequestException(
        `User with ID ${id} was not found or no changes were made.`,
      );
    }

    return updatedUsers[0].dataValues;
  }

  // CHANGE USER PASSWORD
  async changePassword(id: number, oldPassword: string, newPassword: string) {
    const user = await this.userRepo.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      throw new BadRequestException('Password you entered is incorrect!');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 7);

    const [numAffectedRows, updatedUsers] = await this.userRepo.update(
      { password: hashedNewPassword },
      {
        where: { id },
        returning: true,
      },
    );

    if (numAffectedRows === 0) {
      throw new BadRequestException('Failed to update the password.');
    }

    return updatedUsers[0].dataValues;
  }

  // UPDATE USER ACTIVENESS
  async updateUserActiveness(
    id: number,
    updateUserActivenessDto: UpdateUserActivenessDto,
  ) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
    const { is_active } = updateUserActivenessDto;
    const updatedValues: Partial<User> = {};
    if (is_active !== undefined) {
      updatedValues.is_active = is_active;
    }
    const [numAffectedRows] = await this.userRepo.update(updatedValues, {
      where: { id },
    });
    if (numAffectedRows === 0) {
      throw new NotFoundException(
        `User with id ${id} not found or no changes were made.`,
      );
    }

    return this.getUserById(id);
  }

  //REGISTRATION
  async signup(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('Email already exists!');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Password is not match!');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      password: hashed_password,
    });
    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newUser.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendUserConfirmation(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'User registered',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  //GET TOKENS
  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.USER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //LOGIN
  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not registered');
    }
    if (!user.is_active) {
      throw new BadRequestException('User is not active');
    }
    const isMatchPass = await bcrypt.compare(password, user.password);
    // console.log(password);
    // console.log(user.password);

    if (!isMatchPass) {
      throw new UnauthorizedException('User not registered(pass)');
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: user.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  //LOGOUT
  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not found');
    }
    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token: null,
      },
      { where: { id: userData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user: updatedUser[1][0],
    };
    return response;
  }

  //REFRESH TOKEN
  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('User not found');
    }

    const user = await this.userRepo.findOne({
      where: { id: user_id },
    });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('User not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updatedUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
      },
      { where: { id: user.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User refreshed',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  // ACTIVATE
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updatedUser = await this.userRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updatedUser[1][0]) {
      throw new BadRequestException('User already activated');
    }

    const response = {
      message: 'User activated successfully',
      user: updatedUser,
    };
    return response;
  }
}
