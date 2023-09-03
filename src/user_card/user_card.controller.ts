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
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user.self.guard';

@ApiTags('UserCard')
@Controller('user_card')
export class UserCardController {
  constructor(private readonly user_cardService: UserCardService) {}

  @ApiOperation({ summary: 'Create user_card' })
  @UseGuards(UserGuard)
  @Post('create')
  async createUserCard(@Body() createUserCardDto: CreateUserCardDto) {
    const user_card = this.user_cardService.createUserCard(createUserCardDto);
    return user_card;
  }

  @ApiOperation({ summary: 'Get all user_cards' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllUserCards() {
    return this.user_cardService.getAllUserCards();
  }

  @ApiOperation({ summary: 'Get user_card by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get('userId/:id/cardId/:cardId')
  async getUserCardById(@Param('cardId') cardId: string) {
    return this.user_cardService.getUserCardById(+cardId);
  }

  @ApiOperation({ summary: 'Delete user_card' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Delete('userId/:id/cardId/:cardId')
  async deleteUserCardById(@Param('cardId') cardId: string) {
    return this.user_cardService.deleteUserCardById(+cardId);
  }

  @ApiOperation({ summary: 'Update user_card' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Put('userId/:id/cardId/:cardId')
  async updateUserCard(
    @Param('cardId') cardId: string,
    @Body() updateUserCardDto: UpdateUserCardDto,
  ) {
    return this.user_cardService.updateUserCard(+cardId, updateUserCardDto);
  }
}
