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

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Create cart' })
  // @UseGuards(AdminGuard)
  @Post('create')
  async createCart(@Body() createCartDto: CreateCartDto) {
    const cart = this.cartService.createCart(createCartDto);
    return cart;
  }

  @ApiOperation({ summary: 'Get all carts' })
  @Get('all')
  async getAllCarts() {
    return this.cartService.getAllCarts();
  }

  @ApiOperation({ summary: 'Get cart by id' })
  @Get(':id')
  async getCartById(@Param('id') id: string) {
    return this.cartService.getCartById(+id);
  }

  @ApiOperation({ summary: 'Delete cart' })
  // @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteCartById(@Param('id') id: string) {
    return this.cartService.deleteCartById(+id);
  }

  @ApiOperation({ summary: 'Update cart' })
  // @UseGuards(AdminGuard)
  @Put(':id')
  async updateCart(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(+id, updateCartDto);
  }
}
