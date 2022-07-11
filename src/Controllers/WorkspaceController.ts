import { Request, Response } from 'express-serve-static-core';
import { IController } from 'src/Interfaces/@Controller/IController';
import { WorkspaceDTO } from 'src/Interfaces/@DTO/WorkspaceDTO';
import { IPayloadDecoded } from 'src/Interfaces/IPayloadDecoded';
import { AuthMiddleware } from 'src/Middleware/AuthMiddleware';
import { Workspace } from 'src/Models/Workspace';
import { WorkspaceRepository } from 'src/Repositories/WorkspaceRepository';
import { WorkspaceService } from 'src/Services/WorkspaceService';

const workspceRepository = new WorkspaceRepository(Workspace);
const workspaceService = new WorkspaceService(workspceRepository);
const middleware = new AuthMiddleware();

export class WorkspaceController implements IController {
  async store(req: Request, res: Response) {
    const data: WorkspaceDTO = req.body;
    console.log(data);
    const authorization = req.headers.authorization;
    try {
      const user = middleware.getUserLogged(authorization) as IPayloadDecoded;
      await workspaceService.create(data, user.user_id);
      return res.status(201).json({ message: 'success' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
}
