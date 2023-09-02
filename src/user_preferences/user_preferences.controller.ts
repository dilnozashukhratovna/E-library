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

@ApiTags('UserPreferences')
@Controller('user_preferences')
export class UserPreferencesController {
  constructor(private readonly user_preferencesService: UserPreferencesService) {}

  @ApiOperation({ summary: 'Create user_preferences' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createUserPreferences(@Body() createUserPreferencesDto: CreateUserPreferencesDto) {
    const user_preferences = this.user_preferencesService.createUserPreferences(createUserPreferencesDto);
    return user_preferences;
  }

  @ApiOperation({ summary: 'Get all user_preferencess' })
  @Get('all')
  async getAllUserPreferencess() {
    return this.user_preferencesService.getAllUserPreferencess();
  }

  @ApiOperation({ summary: 'Get user_preferences by id' })
  @Get(':id')
  async getUserPreferencesById(@Param('id') id: string) {
    return this.user_preferencesService.getUserPreferencesById(+id);
  }

  @ApiOperation({ summary: 'Delete user_preferences' })
  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteUserPreferencesById(@Param('id') id: string) {
    return this.user_preferencesService.deleteUserPreferencesById(+id);
  }

  @ApiOperation({ summary: 'Update user_preferences' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateUserPreferences(
    @Param('id') id: string,
    @Body() updateUserPreferencesDto: UpdateUserPreferencesDto,
  ) {
    return this.user_preferencesService.updateUserPreferences(+id, updateUserPreferencesDto);
  }
}
