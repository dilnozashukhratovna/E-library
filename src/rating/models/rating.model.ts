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
import { User } from '../../user/models/user.model';

interface RatingAttr {
  book_id: number;
  user_id: number;
  rating_value: number;
  comment: string;
  comment_date: Date;
}

@Table({ tableName: 'rating' })
export class Rating extends Model<Rating, RatingAttr> {
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

  @ForeignKey(() => User)
  @ApiProperty({ example: 1, description: 'User id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({ example: 4.5, description: 'Rating value' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  rating_value: number;

  @ApiProperty({
    example: 'Absolutely great book!',
    description: 'User comment',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comment: string;

  @ApiProperty({ example: '2023-12-12', description: 'Commented date' })
  @Column({
    type: DataType.DATE,
  })
  comment_date: Date;

  //========== Relationships ================================
  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => User)
  user: User;
}
