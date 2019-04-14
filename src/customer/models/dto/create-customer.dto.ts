export class CreateCustomerDTO {
  // tslint:disable-next-line:variable-name
  readonly first_name: string;
  // tslint:disable-next-line:variable-name
  readonly last_name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
