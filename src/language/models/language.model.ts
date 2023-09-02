import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../book/models/book.model';
import { BookLanguage } from '../../book_language/models/book_language.model';

interface LanguageAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'language' })
export class Language extends Model<Language, LanguageAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'English', description: 'Language name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'Its British English',
    description: 'Description to the language',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  //========== Relationships ================================
  @BelongsToMany(() => Book, () => BookLanguage)
  books: Book[];
}
