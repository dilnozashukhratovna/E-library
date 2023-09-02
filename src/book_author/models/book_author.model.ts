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
import { Author } from '../../author/models/author.model';

interface BookAuthorAttr {
  book_id: number;
  author_id: number;
}

@Table({ tableName: 'book_author' })
export class BookAuthor extends Model<BookAuthor, BookAuthorAttr> {
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

  @ForeignKey(() => Author)
  @ApiProperty({ example: 1, description: 'Author id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  author_id: number;

  //========== Relationships ================================
 
}
