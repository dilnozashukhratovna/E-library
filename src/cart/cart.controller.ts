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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import { UserSelfGuard } from '../guards/user.self.guard';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create cart' })
  @UseGuards(UserGuard)
  @Post('create')
  async createCart(@Body() createCartDto: CreateCartDto) {
    const cart = this.cartService.createCart(createCartDto);
    return cart;
  }

  @ApiOperation({ summary: 'Get all carts' })
  @UseGuards(AdminGuard)
  @Get('all')
  async getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @ApiOperation({ summary: 'Get cart by id' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get('userId/:id/cartId/:cartId')
  async getCartById(@Param('cartId') cartId: string) {
    return this.cartService.getCartById(+cartId);
  }

  @ApiOperation({ summary: 'Delete cart' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Delete('userId/:id/cartId/:cartId')
  async deleteCartById(@Param('cartId') cartId: string) {
    return this.cartService.deleteCartById(+cartId);
  }

  @ApiOperation({ summary: 'Update cart' })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Put('userId/:id/cartId/:cartId')
  async updateCart(
    @Param('cartId') cartId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(+cartId, updateCartDto);
  }
}
