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

interface UserCardAttr {
  user_id: number;
  card_number: string;
  cardholder_name: string;
  expiration_date: string;
  card_type: string;
  last_used: Date;
}

@Table({ tableName: 'user_card' })
export class UserCard extends Model<UserCard, UserCardAttr> {
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

  @ApiProperty({ example: '1234565789', description: 'User card number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  card_number: string;

  @ApiProperty({ example: 'John Green', description: 'Card holder name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cardholder_name: string;

  @ApiProperty({ example: '03/26', description: 'Card expiration date' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  expiration_date: string;

  @ApiProperty({ example: 'Visa', description: 'Card type' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  card_type: string;

  @ApiProperty({ example: '2023-12-12', description: 'Last used date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  last_used: Date;

  //========== Relationships ================================
  @BelongsTo(() => User)
  user: User;
}
