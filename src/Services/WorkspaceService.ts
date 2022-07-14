import { HttpError } from 'src/Exeptions/HttpError';
import { WorkspaceDTO } from 'src/Interfaces/@DTO/WorkspaceDTO';
import { IWorkspaceRepository } from 'src/Interfaces/@Repository/IWorkspaceRepository';
import { IWorkspaceService } from 'src/Interfaces/@Service/IWorkspaceService';

export class WorkspaceService implements IWorkspaceService {
  constructor(private workspaceRepository: IWorkspaceRepository) {}

  async _haveEmptyFields(data: WorkspaceDTO) {
    return Object.values(data)
      .map((values) => !!values)
      .includes(false);
  }

  async createWorkspace(data: WorkspaceDTO, user_id: string): Promise<void> {
    const dataHaveEmptyFields = await this._haveEmptyFields(data);
    if (dataHaveEmptyFields) throw new HttpError(400, 'Fields cannot be empty');
    await this.workspaceRepository.createWorkspace(data, user_id);
  }

  async getAllWorkspaces(user_id: string): Promise<WorkspaceDTO> {
    const workspaces = await this.workspaceRepository.getAllWorkspaces(user_id);
    return workspaces;
  }

  async getWorkspaceByName(
    name: string,
    user_id: string
  ): Promise<WorkspaceDTO> {
    const workspace = await this.workspaceRepository.getWorkspaceByName(
      name,
      user_id
    );

    if (!workspace) throw new HttpError(404, 'These workspaces do not exist');

    if (workspace.fk_user_id !== user_id)
      throw new HttpError(401, 'User unauthorized');

    return workspace;
  }

  async updateWorkspace(
    data: WorkspaceDTO,
    name: string,
    user_id: string
  ): Promise<void> {
    const workspace = await this.getWorkspaceByName(name, user_id);
    
    if (workspace.fk_user_id !== user_id)
      throw new HttpError(401, 'User unauthorized');

    const dataHaveEmptyFields = await this._haveEmptyFields(data);
    if (dataHaveEmptyFields) throw new HttpError(400, 'Fields cannot be empty');

    await this.workspaceRepository.updateWorkspace(data, name, user_id);
  }

  async deleteWorkspace(name: string, user_id: string): Promise<void> {
    const workspace = await this.getWorkspaceByName(name, user_id);
    if (workspace.fk_user_id !== user_id)
      throw new HttpError(401, 'User unauthorized');
    await this.workspaceRepository.deleteWorkspace(name, user_id);
  }
}
