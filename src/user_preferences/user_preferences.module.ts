import { Module } from '@nestjs/common';
import { UserPreferencesService } from './user_preferences.service';
import { UserPreferencesController } from './user_preferences.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPreferences } from './models/user_preferences.model';

@Module({
  imports: [SequelizeModule.forFeature([UserPreferences])],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService],
})
export class UserPreferencesModule {}
