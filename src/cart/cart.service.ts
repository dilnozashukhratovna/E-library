import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './models/cart.model';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart) private cartRepo: typeof Cart) {}

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    const cart = await this.cartRepo.create(createCartDto);
    return cart;
  }

  async getAllCarts(): Promise<Cart[]> {
    const carts = await this.cartRepo.findAll({
      include: { all: true },
    });

    if (!carts || carts.length === 0) {
      throw new NotFoundException(`No carts were found.`);
    }

    return carts;
  }

  async getCartById(id: number): Promise<Cart> {
    const cart = await this.cartRepo.findByPk(id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found.`);
    }
    return cart;
  }

  async deleteCartById(id: number) {
    const cart = await this.cartRepo.destroy({ where: { id } });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found.`);
    }
    return cart;
  }

  async updateCart(id: number, updateCartDto: UpdateCartDto) {
    const existingCart = await this.cartRepo.findByPk(id);

    if (!existingCart) {
      throw new NotFoundException(`Cart with id ${id} not found.`);
    }
    const [affectedRows, [updatedCart]] = await this.cartRepo.update(
      updateCartDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (affectedRows === 0 || !updatedCart) {
      throw new Error(`Update operation failed for cart with id ${id}.`);
    }

    return updatedCart;
  }
}
