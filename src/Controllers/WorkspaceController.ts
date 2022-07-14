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
    const authorization = req.headers.authorization;
    try {
      const user = middleware.getUserLogged(authorization) as IPayloadDecoded;
      await workspaceService.createWorkspace(data, user.user_id);
      return res.status(201).json({ status_code: 201, message: 'success' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
  async index(req: Request, res: Response) {
    const authorization = req.headers.authorization;
    try {
      const user = middleware.getUserLogged(authorization) as IPayloadDecoded;
      const workspaces = await workspaceService.getAllWorkspaces(user.user_id);
      return res.status(200).json({ status_code: 200, workspaces: workspaces });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }

  async show(req: Request, res: Response) {
    const { name } = req.params;
    const authorization = req.headers.authorization;
    try {
      const user = middleware.getUserLogged(authorization) as IPayloadDecoded;
      const workspace = await workspaceService.getWorkspaceByName(
        name,
        user.user_id
      );
      return res.status(200).json({ status_code: 200, workspace: workspace });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ error });
    }
  }

  async destroy(req: Request, res: Response) {
    const { name } = req.params;
    const authorization = req.headers.authorization;
    try {
      const user = middleware.getUserLogged(authorization) as IPayloadDecoded;
      await workspaceService.deleteWorkspace(name, user.user_id);
      return res
        .status(200)
        .json({ status_code: 200, message: 'Workspace  deleted' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    const data: WorkspaceDTO = req.body;
    const { name } = req.params;
    const authorization = req.headers.authorization;
    try {
      const user = middleware.getUserLogged(authorization) as IPayloadDecoded;
      await workspaceService.updateWorkspace(data, name, user.user_id);
      return res
        .status(200)
        .json({ status_code: 200, message: 'Workspace updated' });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
}
