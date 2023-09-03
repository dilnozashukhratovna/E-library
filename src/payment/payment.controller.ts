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
  @UseGuards(AdminGuard)
  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return this.paymentService.getPaymentById(+id);
  }

  @ApiOperation({ summary: 'Delete payment' })
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deletePaymentById(@Param('id') id: string) {
    return this.paymentService.deletePaymentById(+id);
  }

  @ApiOperation({ summary: 'Update payment' })
  @UseGuards(AdminGuard)
  @Put(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentService.updatePayment(+id, updatePaymentDto);
  }
}
