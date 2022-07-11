import { JwtPayload } from 'jsonwebtoken';

export interface IPayloadDecoded extends JwtPayload {
  user_id: string;
}
