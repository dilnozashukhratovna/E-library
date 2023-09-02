import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { UserCard } from './models/user_card.model';

@Injectable()
export class UserCardService {
  constructor(@InjectModel(UserCard) private user_cardRepo: typeof UserCard) {}

  async createUserCard(createUserCardDto: CreateUserCardDto): Promise<UserCard> {
    const user_card = await this.user_cardRepo.create(createUserCardDto);
    return user_card;
  }

  async getAllUserCards(): Promise<UserCard[]> {
    const user_cards = await this.user_cardRepo.findAll({
      include: { all: true },
    });

    if (!user_cards || user_cards.length === 0) {
      throw new NotFoundException(`No user_cards were found.`);
    }

    return user_cards;
  }

  async getUserCardById(id: number): Promise<UserCard> {
    const user_card = await this.user_cardRepo.findByPk(id);
    if (!user_card) {
      throw new NotFoundException(`UserCard with id ${id} not found.`);
    }
    return user_card;
  }

  async deleteUserCardById(id: number) {
    const user_card = await this.user_cardRepo.destroy({ where: { id } });
    if (!user_card) {
      throw new NotFoundException(`UserCard with id ${id} not found.`);
    }
    return user_card;
  }

  async updateUserCard(id: number, updateUserCardDto: UpdateUserCardDto) {
    const existingUserCard = await this.user_cardRepo.findByPk(id);

    if (!existingUserCard) {
      throw new NotFoundException(`UserCard with id ${id} not found.`);
    }
    const [affectedRows, [updatedUserCard]] = await this.user_cardRepo.update(
      updateUserCardDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedUserCard) {
      throw new Error(`Update operation failed for user_card with id ${id}.`);
    }

    return updatedUserCard;
  }
}
