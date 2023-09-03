import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserBooksInfoService } from './user_books_info.service';
import { CreateUserBooksInfoDto } from './dto/create-user_books_info.dto';
import { UpdateUserBooksInfoDto } from './dto/update-user_books_info.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user.self.guard';

@ApiTags('UserBooksInfo')
@Controller('user_books_info')
export class UserBooksInfoController {
  constructor(private readonly user_books_infoService: UserBooksInfoService) {}

  @ApiOperation({ summary: 'Create user_books_info' })
  @UseGuards(UserGuard)
  @Post('create')
  async createUserBooksInfo(
    @Body() createUserBooksInfoDto: CreateUserBooksInfoDto,
  ) {
    const user_books_info = this.user_books_infoService.createUserBooksInfo(
      createUserBooksInfoDto,
    );
    return user_books_info;
  }

  @ApiOperation({ summary: 'Get all user_books_infos' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllUserBooksInfos() {
    return this.user_books_infoService.getAllUserBooksInfos();
  }

  @ApiOperation({ summary: 'Get user_books_info by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get('userId/:id/infoId/:infoId')
  async getUserBooksInfoById(@Param('infoId') infoId: string) {
    return this.user_books_infoService.getUserBooksInfoById(+infoId);
  }

  @ApiOperation({ summary: 'Delete user_books_info' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Delete('userId/:id/infoId/:infoId')
  async deleteUserBooksInfoById(@Param('infoId') infoId: string) {
    return this.user_books_infoService.deleteUserBooksInfoById(+infoId);
  }

  @ApiOperation({ summary: 'Update user_books_info' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Put('userId/:id/infoId/:infoId')
  async updateUserBooksInfo(
    @Param('infoId') infoId: string,
    @Body() updateUserBooksInfoDto: UpdateUserBooksInfoDto,
  ) {
    return this.user_books_infoService.updateUserBooksInfo(
      +infoId,
      updateUserBooksInfoDto,
    );
  }
}
