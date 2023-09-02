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

interface AdminAttr {
  first_name: string;
  last_name: string;
  admin_photo: string;
  email: string;
  password: string;
  phone_number: string;
  birthdate: Date;
  is_creator: boolean;
  is_active: boolean;
  hashed_refresh_roken: string;
  activation_link: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttr> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'Admin first name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @ApiProperty({ example: 'Green', description: 'Admin last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Admin photo' })
  @Column({
    type: DataType.STRING,
  })
  admin_photo: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Admin email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Admin password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: '+998998887766', description: 'Admin phone number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @ApiProperty({ example: '2000-12-12', description: 'Admin birth date' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthdate: Date;

  @ApiProperty({ example: 'false', description: 'Is admin creator' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({ example: 'false', description: 'Is admin active' })
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

  //========== Relationships ================================
  @HasMany(() => Book)
  books: Book[];

}
