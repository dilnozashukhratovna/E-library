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
import { UserCard } from '../../user_card/models/user_card.model';

interface PaymentAttr {
  user_id: number;
  book_id: number;
  payment_date: Date;
  amount: number;
  user_card_id: number;
  status: string;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentAttr> {
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
    unique: true,
  })
  user_id: number;

  @ForeignKey(() => Book)
  @ApiProperty({ example: 1, description: 'Book id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  book_id: number;

  @ApiProperty({ example: '2023-12-12', description: 'Payment date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  payment_date: Date;

  @ApiProperty({ example: 102.98, description: 'Payment amount' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  amount: number;

  @ForeignKey(() => UserCard)
  @ApiProperty({ example: 1, description: 'User card id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  user_card_id: number;

  @ApiProperty({ example: 'NOT PAID', description: 'Payment status' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  //========== Relationships ================================
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Book)
  book: Book;

  @BelongsTo(() => UserCard)
  userCard: UserCard;
}
