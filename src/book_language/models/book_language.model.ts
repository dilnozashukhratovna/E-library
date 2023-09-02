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
import { Language } from '../../language/models/language.model';

interface BookLanguageAttr {
  book_id: number;
  language_id: number;
}

@Table({ tableName: 'book_language' })
export class BookLanguage extends Model<BookLanguage, BookLanguageAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Book)
  @ApiProperty({ example: 1, description: 'Book id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  book_id: number;

  @ForeignKey(() => Language)
  @ApiProperty({ example: 1, description: 'Language id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  language_id: number;

  //========== Relationships ================================
}
