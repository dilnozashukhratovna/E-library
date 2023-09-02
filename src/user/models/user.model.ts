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
import { Rating } from '../../rating/models/rating.model';
import { UserCard } from '../../user_card/models/user_card.model';
import { UserPreferences } from '../../user_preferences/models/user_preferences.model';
import { UserBooksInfo } from '../../user_books_info/models/user_books_info.model';
import { Cart } from '../../cart/models/cart.model';

interface UserAttr {
  first_name: string;
  last_name: string;
  gender: string;
  user_photo: string;
  short_bio: string;
  email: string;
  password: string;
  birthdate: Date;
  is_active: boolean;
  hashed_refresh_roken: string;
  activation_link: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Green', description: 'User last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'male', description: 'User gender' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gender: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'User photo' })
  @Column({
    type: DataType.STRING,
  })
  user_photo: string;

  @ApiProperty({ example: 'Just booklover boy', description: 'User bio' })
  @Column({
    type: DataType.STRING,
  })
  short_bio: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'User password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: '+998998887766', description: 'User phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({ example: '2000-12-12', description: 'User birth date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate: Date;

  @ApiProperty({ example: 'false', description: 'Is user active' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  //================== Relationships ================================

  @HasMany(() => Rating)
  ratings: Rating[];

  @HasMany(() => UserCard)
  user_cards: UserCard[];

  @HasMany(() => UserPreferences)
  user_preferences: UserPreferences[];

  @HasMany(() => UserBooksInfo)
  userBooksInfos: UserBooksInfo[];

  @HasMany(() => Cart)
  carts: Cart[];
}
