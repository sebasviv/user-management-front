import { useEffect, useState } from "react";

import "./App.css";
import PermissionForm from "./components/PermissionForm";
import styled from "styled-components";
import PermissionsTable from "./components/PermissionsTable";
import { DeletePermission, GetPermissions } from "./services/PermissionService";
import { IPermission } from "./types/Permission";
import { GetPermissionTypes } from "./services/PermissionTypesService";
import { IPermissionTypes } from "./types/PermissionTypes";
import { Box, CircularProgress } from "@mui/material";

function App() {

  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [permissionTypes, setPermissionTypes] = useState<IPermissionTypes[]>([]);
  const [permissionToEdit, setPermissionToEdit] = useState<IPermission | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    GetPermissions().then((data) => {
      setPermissions(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    GetPermissionTypes().then((data) => {
      setIsLoading(false);
      setPermissionTypes(data);
    });
  }, []);

  const handleUpdate = () => {
    setIsLoading(true);
    setPermissionToEdit(null);
    GetPermissions().then((data) => {
      setPermissions(data);
      setIsLoading(false);
    });
  }

  const handleDelete = (id: number) => {
    setIsLoading(true);
    DeletePermission(id).then(() => {
      GetPermissions().then((data) => {
        setPermissions(data);
        setIsLoading(false);
      });
    });
  }

  const handleEdit = (permission: IPermission) => {
    setPermissionToEdit(permission);
  }

  return (

    <Container>
      <PermissionForm permissionTypes={permissionTypes} onUpdate={handleUpdate} data={permissionToEdit}/>
      <div> Tabla de Permisos</div>
      <PermissionsTable data={permissions} onDelete={handleDelete} onEdit={handleEdit}/>
      {
        isLoading && <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      }
    </Container>

  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;
