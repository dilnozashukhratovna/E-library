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
import { Admin } from '../../admin/models/admin.model';
import { Genre } from '../../genre/models/genre.model';
import { Category } from '../../category/models/category.model';
import { Rating } from '../../rating/models/rating.model';
import { Author } from '../../author/models/author.model';
import { BookAuthor } from '../../book_author/models/book_author.model';
import { Language } from '../../language/models/language.model';
import { BookLanguage } from '../../book_language/models/book_language.model';
import { UserBooksInfo } from '../../user_books_info/models/user_books_info.model';

interface BookAttr {
  name: string;
  genre_id: number;
  min_age: number;
  popular_age: number;
  popular_gender: string;
  category_id: number;
  is_paid: boolean;
  page_count: number;
  about: string;
  created_admin_id: number;
}

@Table({ tableName: 'book' })
export class Book extends Model<Book, BookAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Little prince', description: 'Book name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Genre)
  @ApiProperty({ example: 1, description: 'Book genre' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  genre_id: number;

  @ApiProperty({ example: 6, description: 'Min age category' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  min_age: number;

  @ApiProperty({ example: 13, description: 'Popular age category' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  popular_age: number;

  @ApiProperty({ example: 1, description: 'Popular gender category' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  popular_gender: string;

  @ForeignKey(() => Category)
  @ApiProperty({ example: 1, description: 'Book category id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @ApiProperty({ example: 'false', description: 'Is it free book' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_paid: boolean;

  @ApiProperty({ example: 182, description: 'Book page count' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  page_count: number;

  @ApiProperty({
    example:
      'The story follows a young prince who visits various planets,\
 including Earth, and addresses themes of loneliness, friendship, love,\
 and loss.',
    description: 'Brief information about what the book is about',
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  about: string;

  @ForeignKey(() => Admin)
  @ApiProperty({
    example: 1,
    description: 'Admin ID who added the book',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  created_admin_id: number;

  //========== Connecting relationships ================================

  @BelongsTo(() => Admin)
  admin: Admin;

  @BelongsTo(() => Genre)
  genre: Genre;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Rating)
  ratings: Rating[];

  @BelongsToMany(() => Author, () => BookAuthor)
  authors: Author[];

  @BelongsToMany(() => Language, () => BookLanguage)
  languages: Language[];

  @HasMany(() => UserBooksInfo)
  userBooksInfos: UserBooksInfo[];
}
