import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';

@ApiTags('Language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({ summary: 'Create language' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createLanguage(@Body() createLanguageDto: CreateLanguageDto) {
    const language = this.languageService.createLanguage(createLanguageDto);
    return language;
  }

  @ApiOperation({ summary: 'Get all languages' })
  @Get('all')
  async getAllLanguages() {
    return this.languageService.getAllLanguages();
  }

  @ApiOperation({ summary: 'Get language by id' })
  @Get(':id')
  async getLanguageById(@Param('id') id: string) {
    return this.languageService.getLanguageById(+id);
  }

  @ApiOperation({ summary: 'Delete language' })
  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteLanguageById(@Param('id') id: string) {
    return this.languageService.deleteLanguageById(+id);
  }

  @ApiOperation({ summary: 'Update language' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateLanguage(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.updateLanguage(+id, updateLanguageDto);
  }
}
