import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserBooksInfoDto } from './dto/create-user_books_info.dto';
import { UpdateUserBooksInfoDto } from './dto/update-user_books_info.dto';
import { UserBooksInfo } from './models/user_books_info.model';

@Injectable()
export class UserBooksInfoService {
  constructor(
    @InjectModel(UserBooksInfo)
    private user_books_infoRepo: typeof UserBooksInfo,
  ) {}

  async createUserBooksInfo(
    createUserBooksInfoDto: CreateUserBooksInfoDto,
  ): Promise<UserBooksInfo> {
    const user_books_info = await this.user_books_infoRepo.create(
      createUserBooksInfoDto,
    );
    return user_books_info;
  }

  async getAllUserBooksInfos(): Promise<UserBooksInfo[]> {
    const user_books_infos = await this.user_books_infoRepo.findAll({
      include: { all: true },
    });

    if (!user_books_infos || user_books_infos.length === 0) {
      throw new NotFoundException(`No user_books_infos were found.`);
    }

    return user_books_infos;
  }

  async getUserBooksInfoById(id: number): Promise<UserBooksInfo> {
    const user_books_info = await this.user_books_infoRepo.findByPk(id);
    if (!user_books_info) {
      throw new NotFoundException(`UserBooksInfo with id ${id} not found.`);
    }
    return user_books_info;
  }

  async deleteUserBooksInfoById(id: number) {
    const user_books_info = await this.user_books_infoRepo.destroy({
      where: { id },
    });
    if (!user_books_info) {
      throw new NotFoundException(`UserBooksInfo with id ${id} not found.`);
    }
    return user_books_info;
  }

  async updateUserBooksInfo(
    id: number,
    updateUserBooksInfoDto: UpdateUserBooksInfoDto,
  ) {
    const allowedProperties = [
      'started_page',
      'stopped_page',
      'finished_date',
      'book_status',
      'notes',
      'is_liked',
    ];

    const invalidProperties = Object.keys(updateUserBooksInfoDto).filter(
      (property) => !allowedProperties.includes(property),
    );

    if (invalidProperties.length > 0) {
      const invalidPropsList = invalidProperties.join(', ');
      const allowedPropsList = allowedProperties.join(', ');
      const errorMessage = `Invalid change: ${invalidPropsList}.\
 Only the following properties are allowed to be updated:\
 ${allowedPropsList}.`;

      throw new BadRequestException(errorMessage);
    }

    const [numAffectedRows, updatedBooks] =
      await this.user_books_infoRepo.update(updateUserBooksInfoDto, {
        where: { id },
        returning: true,
      });

    if (numAffectedRows === 0) {
      throw new BadRequestException(
        `UserBooksInfo with ID ${id} was not found or no changes were made.`,
      );
    }

    return updatedBooks[0].dataValues;
  }
}
