import { Request, Response } from 'express-serve-static-core';
import { IController } from 'src/Interfaces/@Controller/IController';
import { UserDTO } from 'src/Interfaces/@DTO/UserDTO';
import { User } from 'src/Models/User';
import { SignInRepository } from 'src/Repositories/SignInRepository';
import { SignInService } from 'src/Services/SignInService';


const signInRepository = new SignInRepository(User);
const signInService = new SignInService(signInRepository);

export class SignInController implements IController {
  async store(req: Request, res: Response) {
    const data: UserDTO = req.body;
    try {
      const token = await signInService.signIn(data);
      return res.status(200).json({ status_code: 200, data: token });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
}
