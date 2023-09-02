import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.create(createCategoryDto);
    return category;
  }

  async getAllCategorys(): Promise<Category[]> {
    const categorys = await this.categoryRepo.findAll({
      include: { all: true },
    });

    if (!categorys || categorys.length === 0) {
      throw new NotFoundException(`No categorys were found.`);
    }

    return categorys;
  }

  async getCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepo.findByPk(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    return category;
  }

  async deleteCategoryById(id: number) {
    const category = await this.categoryRepo.destroy({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const existingCategory = await this.categoryRepo.findByPk(id);

    if (!existingCategory) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }
    const [affectedRows, [updatedCategory]] = await this.categoryRepo.update(
      updateCategoryDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedCategory) {
      throw new Error(`Update operation failed for category with id ${id}.`);
    }

    return updatedCategory;
  }
}
