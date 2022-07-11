import { WorkspaceDTO } from 'src/Interfaces/@DTO/WorkspaceDTO';
import { IModel } from 'src/Interfaces/@Models/IModel';

export class WorkspaceRepository {
  constructor(private workspaceModel: IModel<WorkspaceDTO>) {}

  async create(data: WorkspaceDTO, user_id: string): Promise<void> {
    await this.workspaceModel.create({
      fk_user_id: user_id,
      workspace_name: data.workspace_name,
      description: data.description
    });
  }
}
