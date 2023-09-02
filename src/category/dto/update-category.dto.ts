import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ example: 'Bestseller', description: 'Category name' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Book that sells in very large numbers.',
    description: 'Description to the category',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
