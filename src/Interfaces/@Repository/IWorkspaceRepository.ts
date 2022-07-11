import { WorkspaceDTO } from '../@DTO/WorkspaceDTO';

export interface IWorkspaceRepository {
  create: (data: WorkspaceDTO, user_id: string) => Promise<void>;
}
