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
import { User } from '../../user/models/user.model';
import { Book } from '../../book/models/book.model';

interface UserBooksInfoAttr {
  user_id: number;
  book_id: number;
  started_page: number;
  stopped_page: number;
  started_date: Date;
  finished_date: Date;
  book_status: string;
  notes: string;
  is_liked: boolean;
}

@Table({ tableName: 'user_books_info' })
export class UserBooksInfo extends Model<UserBooksInfo, UserBooksInfoAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @ApiProperty({ example: 1, description: 'User id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Book)
  @ApiProperty({ example: 1, description: 'Book id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  book_id: number;

  @ApiProperty({ example: 1, description: 'Started page number' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  started_page: number;

  @ApiProperty({ example: 5, description: 'Stopped page number' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stopped_page: number;

  @ApiProperty({ example: '2023-12-12', description: 'Started date' })
  @Column({
    type: DataType.DATE,
  })
  started_date: Date;

  @ApiProperty({ example: '2024-12-12', description: 'Finished date' })
  @Column({
    type: DataType.DATE,
  })
  finished_date: Date;

  @ApiProperty({ example: 'STILL READING', description: 'Book status' })
  @Column({
    type: DataType.STRING,
  })
  book_status: string;

  @ApiProperty({
    example: 'Most interesting quote',
    description: 'Notes for book',
  })
  @Column({
    type: DataType.TEXT,
  })
  notes: string;

  @ApiProperty({
    example: false,
    description: 'If user liked that book or not.',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_liked: boolean;

  //========== Relationships ================================
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;
}
