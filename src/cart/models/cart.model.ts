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
import { Payment } from '../../payment/models/payment.model';

interface CartAttr {
  book_id: number;
  user_id: number;
  status: string;
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, CartAttr> {
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
    unique: true,
  })
  user_id: number;

  @ApiProperty({ example: 'NOT BOUGHT', description: 'Status' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  //========== Relationships ================================
  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Payment)
  payments: Payment[];
}
