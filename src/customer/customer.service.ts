import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './models/interface/customer.interface';
import { CreateCustomerDTO } from './models/dto/create-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async getAllCustomers(): Promise<Customer[]> {
    const customers = await this.customerModel.find().exec();
    return customers;
  }
  async getCustomer(customerId): Promise<Customer> {
    const customer = await this.customerModel.findById(customerId).exec();
    return customer;
  }
  async createCustomer(customerDTO: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = await this.customerModel.create(customerDTO);
    return await newCustomer.save();
  }
  async updateCustomer(
    customerId,
    customerDTO: Partial<CreateCustomerDTO>,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      customerId,
      customerDTO,
      { new: true },
    );
    return updatedCustomer;
  }
  async deleteCustomer(customerId): Promise<Customer> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerId,
    );
    return deletedCustomer;
  }
}
