import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserPreferencesDto } from './dto/create-user_preferences.dto';
import { UpdateUserPreferencesDto } from './dto/update-user_preferences.dto';
import { UserPreferences } from './models/user_preferences.model';

@Injectable()
export class UserPreferencesService {
  constructor(@InjectModel(UserPreferences) private user_preferencesRepo: typeof UserPreferences) {}

  async createUserPreferences(createUserPreferencesDto: CreateUserPreferencesDto): Promise<UserPreferences> {
    const user_preferences = await this.user_preferencesRepo.create(createUserPreferencesDto);
    return user_preferences;
  }

  async getAllUserPreferencess(): Promise<UserPreferences[]> {
    const user_preferencess = await this.user_preferencesRepo.findAll({
      include: { all: true },
    });

    if (!user_preferencess || user_preferencess.length === 0) {
      throw new NotFoundException(`No user_preferencess were found.`);
    }

    return user_preferencess;
  }

  async getUserPreferencesById(id: number): Promise<UserPreferences> {
    const user_preferences = await this.user_preferencesRepo.findByPk(id);
    if (!user_preferences) {
      throw new NotFoundException(`UserPreferences with id ${id} not found.`);
    }
    return user_preferences;
  }

  async deleteUserPreferencesById(id: number) {
    const user_preferences = await this.user_preferencesRepo.destroy({ where: { id } });
    if (!user_preferences) {
      throw new NotFoundException(`UserPreferences with id ${id} not found.`);
    }
    return user_preferences;
  }

  async updateUserPreferences(id: number, updateUserPreferencesDto: UpdateUserPreferencesDto) {
    const existingUserPreferences = await this.user_preferencesRepo.findByPk(id);

    if (!existingUserPreferences) {
      throw new NotFoundException(`UserPreferences with id ${id} not found.`);
    }
    const [affectedRows, [updatedUserPreferences]] = await this.user_preferencesRepo.update(
      updateUserPreferencesDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedUserPreferences) {
      throw new Error(`Update operation failed for user_preferences with id ${id}.`);
    }

    return updatedUserPreferences;
  }
}
