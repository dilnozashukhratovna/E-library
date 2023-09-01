import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/models/admin.model';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';
import { User } from './user/models/user.model';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { Book } from './book/models/book.model';
import { Genre } from './genre/models/genre.model';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin, User, Book, Genre],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    MailModule,
    UserModule,
    BookModule,
    GenreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
