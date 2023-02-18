export interface IAuthResponse {
  token: string;
  userName: string;
  validaty: string;
  refreshToken?: string;
  email?: string;
  guidId: string;
  firstname?: string;
  custID: number;
  accountNo: string;
  expiredTime?: string;
}
