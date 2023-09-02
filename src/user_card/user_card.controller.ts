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
import { UserCardService } from './user_card.service';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('UserCard')
@Controller('user_card')
export class UserCardController {
  constructor(private readonly user_cardService: UserCardService) {}

  @ApiOperation({ summary: 'Create user_card' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createUserCard(@Body() createUserCardDto: CreateUserCardDto) {
    const user_card = this.user_cardService.createUserCard(createUserCardDto);
    return user_card;
  }

  @ApiOperation({ summary: 'Get all user_cards' })
  @Get('all')
  async getAllUserCards() {
    return this.user_cardService.getAllUserCards();
  }

  @ApiOperation({ summary: 'Get user_card by id' })
  @Get(':id')
  async getUserCardById(@Param('id') id: string) {
    return this.user_cardService.getUserCardById(+id);
  }

  @ApiOperation({ summary: 'Delete user_card' })
  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteUserCardById(@Param('id') id: string) {
    return this.user_cardService.deleteUserCardById(+id);
  }

  @ApiOperation({ summary: 'Update user_card' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateUserCard(
    @Param('id') id: string,
    @Body() updateUserCardDto: UpdateUserCardDto,
  ) {
    return this.user_cardService.updateUserCard(+id, updateUserCardDto);
  }
}
