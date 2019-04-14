import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Param,
  NotFoundException,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './models/dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post('/create')
  async createCustomer(@Body() customerDTO: CreateCustomerDTO, @Res() res) {
    const customer = await this.customerService.createCustomer(customerDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'Customer has been created successfully',
      customer,
    });
  }

  @Get('customers')
  async getAllCustomers(@Res() res) {
    const customers = await this.customerService.getAllCustomers();
    return res.status(HttpStatus.OK).json(customers);
  }

  @Get('customer/:id')
  async getCustomer(@Param('id') customerId, @Res() res) {
    const customer = await this.customerService.getCustomer(customerId);
    if (!customer) {
      throw new NotFoundException('Customer does not exist!!!');
    }
    return res.status(HttpStatus.OK).json(customer);
  }

  @Put('/update/:id')
  async updateCustomer(
    @Param('id') customerId,
    @Body() customerDTO: CreateCustomerDTO,
    @Res() res,
  ) {
    const customer = await this.customerService.updateCustomer(
      customerId,
      customerDTO,
    );
    if (!customer) {
      throw new NotFoundException('Customer does not exist!!!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been successfully updated',
      customer,
    });
  }

  @Delete('/delete/:id')
  async deleteCustomer(@Param('id') customerId, @Res() res) {
    const customer = await this.customerService.deleteCustomer(customerId);
    if (!customer) {
      throw new NotFoundException('Customer does not exist!!!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been successfully deleted',
      customer,
    });
  }
}
