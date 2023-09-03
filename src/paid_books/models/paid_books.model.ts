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

interface PaidBooksAttr {
  book_id: number;
  added_date: Date;
  price: number;
  discount: number;
  purchase_date: Date;
  status: string;
}

@Table({ tableName: 'paid_books' })
export class PaidBooks extends Model<PaidBooks, PaidBooksAttr> {
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

  @ApiProperty({ example: '2023-12-12', description: 'Book added date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  added_date: Date;

  @ApiProperty({ example: 34.9, description: 'Book price' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: 3.0, description: 'Book discount' })
  @Column({
    type: DataType.DECIMAL,
  })
  discount: number;

  @ApiProperty({ example: '2023-12-12', description: 'Book purchase date' })
  @Column({
    type: DataType.DATE,
  })
  purchase_date: Date;

  @ApiProperty({ example: 1, description: 'BOUGHT' })
  @Column({
    type: DataType.STRING,
  })
  status: string;
  //========== Relationships ================================
  @BelongsTo(() => Book)
  book: Book;
}
