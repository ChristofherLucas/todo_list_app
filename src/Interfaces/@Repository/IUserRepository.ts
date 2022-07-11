import { UserDTO } from '../@DTO/UserDTO';

export interface IUserRepository {
  createUser: (data: UserDTO) => Promise<void>;
  getUserById: (id: string) => Promise<UserDTO>;
  getUserByEmail: (email: string) => Promise<UserDTO>;
}
