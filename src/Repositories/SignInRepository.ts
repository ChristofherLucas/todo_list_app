import { UserDTO } from 'src/Interfaces/@DTO/UserDTO';
import { IModel } from 'src/Interfaces/@Models/IModel';
import { ISignInRepository } from 'src/Interfaces/@Repository/ISignInRepository';

export class SignInRepository implements ISignInRepository {
  constructor(private userModel: IModel<UserDTO>) {}
  async getUserLogin(email: string): Promise<UserDTO> {
    const user = await this.userModel.findOne({
      where: {
        email: email
      }
    });
    return user?.get() as UserDTO;
  }
}
