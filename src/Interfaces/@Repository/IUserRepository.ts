import { UserAuthenticateDTO } from '../@DTO/UserAuthenticateDTO';
import { UserDTO } from '../@DTO/UserDTO';

export interface IUserRepository {
  createUser: (data: UserDTO) => Promise<void>;
  getUserByEmail: (email: string) => Promise<UserDTO>;
}
