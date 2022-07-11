require('dotenv').config();
import { HttpError } from 'src/Exeptions/HttpError';
import { UserAuthenticateDTO } from 'src/Interfaces/@DTO/UserAuthenticateDTO';
import { UserDTO } from 'src/Interfaces/@DTO/UserDTO';
import { ISignInRepository } from 'src/Interfaces/@Repository/ISignInRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ISignInService } from 'src/Interfaces/@Service/ISignIService';

export class SignInService implements ISignInService {
  constructor(private signInRepository: ISignInRepository) {}
  async signIn(data: UserDTO): Promise<UserAuthenticateDTO> {
    console.log(data);
    if (
      Object.values(data)
        .map((values) => !!values)
        .includes(false)
    )
      throw new HttpError(400, 'Fields cannot be empty');

    const pattern = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const validEmail = pattern.test(data.email);
    if (!validEmail) throw new HttpError(400, 'Invalid email');

    const user = await this.signInRepository.getUserLogin(data.email);
    if (!user) throw new HttpError(400, 'Invalid credentials');

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw new HttpError(400, 'Invalid credentials');

    const token = jwt.sign(
      {
        user_id: user.user_id
      },
      process.env.SECRET_KEY as string,
      { expiresIn: 86400 }
    );

    return { token };
  }
}
