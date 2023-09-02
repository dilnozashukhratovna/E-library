import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../book/models/book.model';
import { BookAuthor } from '../../book_author/models/book_author.model';

interface AuthorAttr {
  full_name: string;
  about: string;
}

@Table({ tableName: 'author' })
export class Author extends Model<Author, AuthorAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Robin Sharma', description: 'Author full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  full_name: string;

  @ApiProperty({
    example:
      'Robin Sharma is a Canadian writer, best known for\
 his The Monk Who Sold His Ferrari book series. ',
    description: 'Short info about author',
  })
  @Column({
    type: DataType.STRING,
  })
  about: string;

  //========== Relationships ================================
  @BelongsToMany(() => Book, () => BookAuthor)
  books: Book[];
}
