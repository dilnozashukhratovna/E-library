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

interface UserPreferencesAttr {
  user_id: number;
  preferred_genres: number[];
  preferred_language: number[];
  preferred_author: number[];
  preferred_categories: number[];
  allow_recommendations: boolean;
  notification_preferences: boolean;
}

@Table({ tableName: 'user_preferences' })
export class UserPreferences extends Model<
  UserPreferences,
  UserPreferencesAttr
> {
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

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred genres' })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false, 
  })
  preferred_genres: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred languages' })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
  })
  preferred_language: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred authors' })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
  })
  preferred_author: number[];

  @ApiProperty({ example: [1, 2, 3], description: 'Preferred categories' })
  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
  })
  preferred_categories: number[];

  @ApiProperty({ example: true, description: 'Allow recommendations' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  allow_recommendations: boolean;

  @ApiProperty({ example: true, description: 'Allow notifications' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  notification_preferences: boolean;

  //========== Relationships ================================
  @BelongsTo(() => User)
  user: User;
}
