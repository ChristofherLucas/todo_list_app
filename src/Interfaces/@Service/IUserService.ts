import { UserDTO } from '../@DTO/UserDTO';

export interface IUserService {
  createUser: (data: UserDTO) => Promise<void>;
}
