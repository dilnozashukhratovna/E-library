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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create category' })
  @UseGuards(AdminGuard)
  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = this.categoryService.createCategory(createCategoryDto);
    return category;
  }

  @ApiOperation({ summary: 'Get all categorys' })
  @Get('all')
  async getAllCategorys() {
    return this.categoryService.getAllCategorys();
  }

  @ApiOperation({ summary: 'Get category by id' })
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(+id);
  }

  @ApiOperation({ summary: 'Delete category' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteCategoryById(@Param('id') id: string) {
    return this.categoryService.deleteCategoryById(+id);
  }

  @ApiOperation({ summary: 'Update category' })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }
}
