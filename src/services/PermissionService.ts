import axios from "axios";
import { IPermission } from "../types/Permission";

export const GetPermissions = (): Promise<IPermission[]> => {
  return axios
    .get<IPermission[]>(
      `${import.meta.env.VITE_APP_PERMISSION_API}/api/permission`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const PostPermission = (permission: IPermission): Promise<any> => {
  return axios
    .post(
      `${import.meta.env.VITE_APP_PERMISSION_API}/api/permission`,
      permission
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const UpdatePermission = (permission: IPermission): Promise<any> => {
  return axios
    .put(
      `${import.meta.env.VITE_APP_PERMISSION_API}/api/permission/${
        permission.id
      }`,
      permission
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const DeletePermission = (id: number): Promise<any> => {
  return axios
    .delete(`${import.meta.env.VITE_APP_PERMISSION_API}/api/permission/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
