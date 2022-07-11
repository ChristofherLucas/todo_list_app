import { UserAuthenticateDTO } from '../@DTO/UserAuthenticateDTO';
import { UserDTO } from '../@DTO/UserDTO';

export interface ISignInService {
  signIn: (data: UserDTO) => Promise<UserAuthenticateDTO>;
}
