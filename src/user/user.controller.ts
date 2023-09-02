import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from './models/user.model';
import { LoginUserDto } from './dto/login-user.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user.self.guard';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { UpdateUserActivenessDto } from './dto/update-user-activeness.dto';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get('all')
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @ApiOperation({ summary: 'Delete user' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(+id);
  }

  @ApiOperation({ summary: 'Update user' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Change user password' })
  @Put(':id/change-password')
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  async changePassword(
    @Param('id') id: number,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    const { oldPassword, newPassword } = changeUserPasswordDto;

    const updatedUser = await this.userService.changePassword(
      id,
      oldPassword,
      newPassword,
    );

    if (!updatedUser) {
      return { message: 'Password change failed.' };
    }

    return { message: 'Password changed successfully.' };
  }

  @ApiOperation({ summary: 'Change user roles' })
  @UseGuards(AdminGuard)
  @Put(':id/activeness')
  async changeUserActiveness(
    @Param('id') id: number,
    @Body() updateUserActivenessDto: UpdateUserActivenessDto,
  ) {
    try {
      const updatedUser = await this.userService.updateUserActiveness(
        id,
        updateUserActivenessDto,
      );
      return {
        message: 'User activeness updated successfully.',
        user: updatedUser,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
    }
  }

  // ================= AUTH ==================================================

  @ApiOperation({ summary: 'Signup User' })
  @ApiResponse({ status: 201, type: User })
  @Post('signup')
  signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.signup(createUserDto, res);
  }

  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: 'Logout User' })
  @UseGuards(UserGuard)
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Activate User' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.userService.activate(link);
  }

  @ApiOperation({ summary: 'Refresh user token' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.refreshToken(+id, refreshToken, res);
  }
}
