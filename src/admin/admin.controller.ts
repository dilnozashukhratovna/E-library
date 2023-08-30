import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Admin } from './models/admin.model';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { CreatorGuard } from '../guards/creator.guard';
import { AdminGuard } from '../guards/admin.guard';
import { AdminSelfGuard } from '../guards/admin.self.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Get all admins' })
  @UseGuards(CreatorGuard)
  @Get('all')
  async getAllAdmin() {
    return this.adminService.getAllAdmin();
  }

  @ApiOperation({ summary: 'Get admin by id' })
  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminGuard)
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(+id);
  }

  @ApiOperation({ summary: 'Delete admin' })
  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteAdminById(@Param('id') id: string) {
    return this.adminService.deleteAdminById(+id);
  }

  @ApiOperation({ summary: 'Update admin' })
  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminGuard)
  @Put(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  // ================= AUTH ==================================================

  @ApiOperation({ summary: 'Signup Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  signup(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signup(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Login Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'logout Admin' })
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'Activate Admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshToken(+id, refreshToken, res);
  }
}
