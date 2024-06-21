import axios from "axios";
import { IPermissionTypes } from "../types/PermissionTypes";

export const GetPermissionTypes = (): Promise<IPermissionTypes[]> => {
  return axios
    .get<IPermissionTypes[]>(
      `${import.meta.env.VITE_APP_PERMISSION_API}/api/permissiontype`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

