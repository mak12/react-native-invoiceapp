export interface ApiResponse<T> {
  status: {
    code: string;
    message: string;
  };
  data: T;
}

// response model for token api call
export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
}

//membdership model for profile response
export interface IMembderShip {
  membershipId: string;
  organisationId: string;
  roleName: string;
  token: string;
}

// response model for get profile api call
export interface IProfileResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  memberships: IMembderShip[];
}

//customer model for invoices list response
export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
}
export interface IInvoice {
  createdAt: string;
  currency: string;
  currencySymbol: string;
  customer: ICustomer;
  description: string;
  dueDate: string;
  invoiceDate: string;
  invoiceId: string;
  invoiceNumber: string;
  invoiceSubTotal: number;
  totalDiscount: number;
  totalTax: number;
  totalAmount: number;
  totalPaid: number;
  balanceAmount: number;
}
