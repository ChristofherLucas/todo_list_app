import { where } from 'sequelize/types';
import { WorkspaceDTO } from 'src/Interfaces/@DTO/WorkspaceDTO';
import { IModel } from 'src/Interfaces/@Models/IModel';
import { IWorkspaceRepository } from 'src/Interfaces/@Repository/IWorkspaceRepository';

export class WorkspaceRepository implements IWorkspaceRepository {
  constructor(private workspaceModel: IModel<WorkspaceDTO>) {}

  async createWorkspace(data: WorkspaceDTO, user_id: string): Promise<void> {
    await this.workspaceModel.create({
      fk_user_id: user_id,
      workspace_name: data.workspace_name,
      description: data.description
    });
  }

  async getAllWorkspaces(user_id: string): Promise<WorkspaceDTO> {
    const workspaces = await this.workspaceModel.findAll({
      where: {
        fk_user_id: user_id
      }
    });
    return workspaces as unknown as WorkspaceDTO;
  }

  async getWorkspaceByName(name: string): Promise<WorkspaceDTO | null> {
    const workspace = await this.workspaceModel.findOne({
      where: {
        workspace_name: name
      }
    });
    return workspace?.get() as WorkspaceDTO;
  }

  async updateWorkspace(
    data: WorkspaceDTO,
    name: string,
    user_id: string
  ): Promise<void> {
    await this.workspaceModel.update(
      {
        workspace_name: data.workspace_name,
        description: data.description
      },
      {
        where: {
          fk_user_id: user_id
        }
      }
    );
  }

  async deleteWorkspace(name: string): Promise<void> {
    await this.workspaceModel.destroy({
      where: {
        workspace_name: name
      }
    });
  }
}
