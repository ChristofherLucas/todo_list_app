import { UserAuthenticateDTO } from '../@DTO/UserAuthenticateDTO';
import { UserDTO } from '../@DTO/UserDTO';

export interface ISignInRepository {
  getUserLogin: (email: string) => Promise<UserDTO>;
}
