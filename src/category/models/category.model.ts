import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../book/models/book.model';

interface CategoryAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Bestseller', description: 'Category name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Book that sells in very large numbers.',
    description: 'Description to the category',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  //========== Relationships ================================
  @HasMany(() => Book)
  books: Book[];
}
