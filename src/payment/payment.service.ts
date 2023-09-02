import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './models/payment.model';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private paymentRepo: typeof Payment) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepo.create(createPaymentDto);
    return payment;
  }

  async getAllPayments(): Promise<Payment[]> { 
    const payments = await this.paymentRepo.findAll({
      include: { all: true },
    });

    if (!payments || payments.length === 0) {
      throw new NotFoundException(`No payments were found.`);
    }

    return payments;
  }

  async getPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found.`);
    }
    return payment;
  }

  async deletePaymentById(id: number) {
    const payment = await this.paymentRepo.destroy({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found.`);
    }
    return payment;
  }

  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    const existingPayment = await this.paymentRepo.findByPk(id);

    if (!existingPayment) {
      throw new NotFoundException(`Payment with id ${id} not found.`);
    }
    const [affectedRows, [updatedPayment]] = await this.paymentRepo.update(
      updatePaymentDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedPayment) {
      throw new Error(`Update operation failed for payment with id ${id}.`);
    }

    return updatedPayment;
  }
}
