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
import { UserPreferencesService } from './user_preferences.service';
import { CreateUserPreferencesDto } from './dto/create-user_preferences.dto';
import { UpdateUserPreferencesDto } from './dto/update-user_preferences.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user.self.guard';

@ApiTags('UserPreferences')
@Controller('user_preferences')
export class UserPreferencesController {
  constructor(
    private readonly user_preferencesService: UserPreferencesService,
  ) {}

  @ApiOperation({ summary: 'Create user_preferences' })
  @UseGuards(UserGuard)
  @Post('create')
  async createUserPreferences(
    @Body() createUserPreferencesDto: CreateUserPreferencesDto,
  ) {
    const user_preferences = this.user_preferencesService.createUserPreferences(
      createUserPreferencesDto,
    );
    return user_preferences;
  }

  @ApiOperation({ summary: 'Get all user_preferencess' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllUserPreferencess() {
    return this.user_preferencesService.getAllUserPreferencess();
  }

  @ApiOperation({ summary: 'Get user_preferences by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get('userId/:id/prefId/:prefId')
  async getUserPreferencesById(@Param('prefId') prefId: string) {
    return this.user_preferencesService.getUserPreferencesById(+prefId);
  }

  @ApiOperation({ summary: 'Delete user_preferences' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Delete('userId/:id/prefId/:prefId')
  async deleteUserPreferencesById(@Param('prefId') prefId: string) {
    return this.user_preferencesService.deleteUserPreferencesById(+prefId);
  }

  @ApiOperation({ summary: 'Update user_preferences' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Put(':id')
  async updateUserPreferences(
    @Param('userId/:id/prefId/:prefId') prefId: string,
    @Body() updateUserPreferencesDto: UpdateUserPreferencesDto,
  ) {
    return this.user_preferencesService.updateUserPreferences(
      +prefId,
      updateUserPreferencesDto,
    );
  }
}
