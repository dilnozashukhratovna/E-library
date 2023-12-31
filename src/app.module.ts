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
import { Category } from './category/models/category.model';
import { CategoryModule } from './category/category.module';
import { Rating } from './rating/models/rating.model';
import { RatingModule } from './rating/rating.module';
import { Author } from './author/models/author.model';
import { AuthorModule } from './author/author.module';
import { BookAuthor } from './book_author/models/book_author.model';
import { BookAuthorModule } from './book_author/book_author.module';
import { BookLanguage } from './book_language/models/book_language.model';
import { BookLanguageModule } from './book_language/book_language.module';
import { Language } from './language/models/language.model';
import { LanguageModule } from './language/language.module';
import { UserCard } from './user_card/models/user_card.model';
import { UserCardModule } from './user_card/user_card.module';
import { UserPreferences } from './user_preferences/models/user_preferences.model';
import { UserPreferencesModule } from './user_preferences/user_preferences.module';
import { UserBooksInfo } from './user_books_info/models/user_books_info.model';
import { UserBooksInfoModule } from './user_books_info/user_books_info.module';
import { Payment } from './payment/models/payment.model';
import { PaymentModule } from './payment/payment.module';
import { Cart } from './cart/models/cart.model';
import { CartModule } from './cart/cart.module';
import { PaidBooks } from './paid_books/models/paid_books.model';
import { PaidBooksModule } from './paid_books/paid_books.module';

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
      models: [
        Admin,
        User,
        Book,
        Genre,
        Category,
        Rating,
        Author,
        BookAuthor,
        BookLanguage,
        Language,
        UserCard,
        UserPreferences,
        UserBooksInfo,
        Payment,
        Cart,
        PaidBooks
      ],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    MailModule,
    UserModule,
    BookModule,
    GenreModule,
    CategoryModule,
    RatingModule,
    AuthorModule,
    BookAuthorModule,
    BookLanguageModule,
    LanguageModule,
    UserCardModule,
    UserPreferencesModule,
    UserBooksInfoModule,
    PaymentModule,
    CartModule,
    PaidBooksModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
