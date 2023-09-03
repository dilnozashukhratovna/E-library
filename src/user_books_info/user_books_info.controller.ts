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
  @UseGuards(AdminGuard)
  @Get(':id')
  async getUserBooksInfoById(@Param('id') id: string) {
    return this.user_books_infoService.getUserBooksInfoById(+id);
  }

  @ApiOperation({ summary: 'Delete user_books_info' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteUserBooksInfoById(@Param('id') id: string) {
    return this.user_books_infoService.deleteUserBooksInfoById(+id);
  }

  @ApiOperation({ summary: 'Update user_books_info' })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateUserBooksInfo(
    @Param('id') id: string,
    @Body() updateUserBooksInfoDto: UpdateUserBooksInfoDto,
  ) {
    return this.user_books_infoService.updateUserBooksInfo(
      +id,
      updateUserBooksInfoDto,
    );
  }
}
