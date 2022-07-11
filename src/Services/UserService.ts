import { HttpError } from 'src/Exeptions/HttpError';
import { UserDTO } from 'src/Interfaces/@DTO/UserDTO';
import { IUserRepository } from 'src/Interfaces/@Repository/IUserRepository';
import { IUserService } from 'src/Interfaces/@Service/IUserService';
import bcrypt from 'bcryptjs';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}
  async createUser(data: UserDTO): Promise<void> {
    if (
      Object.values(data)
        .map((values) => !!values)
        .includes(false)
    )
      throw new HttpError(400, 'Fields cannot be empty');

    const pattern = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const validEmail = pattern.test(data.email);
    if (!validEmail) throw new HttpError(400, 'Invalid email');

    const emailExists = await this.userRepository.getUserByEmail(data.email);
    if (!!emailExists) throw new HttpError(400, 'This email is already in use');

    if (data.password.length < 8)
      throw new HttpError(400, 'Password must be at least 8 characters long');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    const _data = {
      user_name: data.user_name,
      email: data.email,
      password: hash
    } as UserDTO;

    await this.userRepository.createUser(_data);
  }
}
