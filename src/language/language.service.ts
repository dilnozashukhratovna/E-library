import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './models/language.model';

@Injectable()
export class LanguageService {
  constructor(@InjectModel(Language) private languageRepo: typeof Language) {}

  async createLanguage(createLanguageDto: CreateLanguageDto): Promise<Language> {
    const language = await this.languageRepo.create(createLanguageDto);
    return language;
  }

  async getAllLanguages(): Promise<Language[]> {
    const languages = await this.languageRepo.findAll({
      include: { all: true },
    });

    if (!languages || languages.length === 0) {
      throw new NotFoundException(`No languages were found.`);
    }

    return languages;
  }

  async getLanguageById(id: number): Promise<Language> {
    const language = await this.languageRepo.findByPk(id);
    if (!language) {
      throw new NotFoundException(`Language with id ${id} not found.`);
    }
    return language;
  }

  async deleteLanguageById(id: number) {
    const language = await this.languageRepo.destroy({ where: { id } });
    if (!language) {
      throw new NotFoundException(`Language with id ${id} not found.`);
    }
    return language;
  }

  async updateLanguage(id: number, updateLanguageDto: UpdateLanguageDto) {
    const existingLanguage = await this.languageRepo.findByPk(id);

    if (!existingLanguage) {
      throw new NotFoundException(`Language with id ${id} not found.`);
    }
    const [affectedRows, [updatedLanguage]] = await this.languageRepo.update(
      updateLanguageDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedLanguage) {
      throw new Error(`Update operation failed for language with id ${id}.`);
    }

    return updatedLanguage;
  }
}
