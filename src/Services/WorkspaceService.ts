import { HttpError } from 'src/Exeptions/HttpError';
import { WorkspaceDTO } from 'src/Interfaces/@DTO/WorkspaceDTO';
import { IWorkspaceRepository } from 'src/Interfaces/@Repository/IWorkspaceRepository';

export class WorkspaceService {
  constructor(private workspaceRepository: IWorkspaceRepository) {}

  async create(data: WorkspaceDTO, user_id: string): Promise<void> {
    if (
      Object.values(data)
        .map((values) => !!values)
        .includes(false)
    )
      throw new HttpError(400, 'Fields cannot be empty');
    await this.workspaceRepository.create(data, user_id);
  }
}
