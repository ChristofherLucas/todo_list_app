import { WorkspaceDTO } from '../@DTO/WorkspaceDTO';

export interface IWorkspaceService {
  createWorkspace: (data: WorkspaceDTO, user_id: string) => Promise<void>;
  getAllWorkspaces: (user_id: string) => Promise<WorkspaceDTO>;
  getWorkspaceByName: (name: string, user_id: string) => Promise<WorkspaceDTO>;
  deleteWorkspace: (name: string, user_id: string) => Promise<void>;
  updateWorkspace: (
    data: WorkspaceDTO,
    name: string,
    user_id: string
  ) => Promise<void>;
  _haveEmptyFields: (data: WorkspaceDTO) => Promise<boolean>;
}
