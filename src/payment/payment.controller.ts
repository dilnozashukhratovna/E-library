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
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user.self.guard';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create payment' })
  @UseGuards(UserGuard)
  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentService.createPayment(createPaymentDto);
    return payment;
  }

  @ApiOperation({ summary: 'Get all payments' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @ApiOperation({ summary: 'Get payment by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get('userId/:id/paymentId/:paymentId')
  async getPaymentById(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentById(+paymentId);
  }

  @ApiOperation({ summary: 'Delete payment' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Delete('userId/:id/paymentId/:paymentId')
  async deletePaymentById(@Param('paymentId') paymentId: string) {
    return this.paymentService.deletePaymentById(+paymentId);
  }

  @ApiOperation({ summary: 'Update payment' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Put('userId/:id/paymentId/:paymentId')
  async updatePayment(
    @Param('paymentId') paymentId: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.updatePayment(+paymentId, updatePaymentDto);
  }
}
