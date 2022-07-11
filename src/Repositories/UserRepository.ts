import { UserDTO } from 'src/Interfaces/@DTO/UserDTO';
import { IModel } from 'src/Interfaces/@Models/IModel';
import { IUserRepository } from 'src/Interfaces/@Repository/IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private userModel: IModel<UserDTO>) {}

  async createUser(data: UserDTO): Promise<void> {
    await this.userModel.create({
      user_name: data.user_name,
      email: data.email,
      password: data.password
    });
  }

  async getUserByEmail(email: string): Promise<UserDTO> {
    const user = await this.userModel.findOne({
      where: {
        email: email
      }
    });
    return user?.get() as UserDTO;
  }
}
