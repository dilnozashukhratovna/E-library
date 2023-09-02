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
import { UserCard } from '../../user_card/models/user_card.model';
import { Cart } from '../../cart/models/cart.model';

interface PaymentAttr {
  cart_id: number
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

  @ForeignKey(() => Cart)
  @ApiProperty({ example: 1, description: 'Cart id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cart_id: number;

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
  @BelongsTo(() => UserCard)
  userCard: UserCard;

  @BelongsTo(() => Cart)
  cart: Cart;
}
