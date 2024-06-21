import React, { useEffect } from "react";
import Textfield from "@mui/material/TextField";
import {
    Alert,
    AlertColor,
    Button,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IPermission } from "../types/Permission";
import { IPermissionTypes } from "../types/PermissionTypes";
import { FieldValues, useForm } from "react-hook-form";
import { PostPermission, UpdatePermission } from "../services/PermissionService";
import dayjs from "dayjs";

interface IPermissionFormProps {
    permissionTypes: IPermissionTypes[];
    onUpdate: () => void;
    data: IPermission | null;
}


const PermissionForm: React.FC<IPermissionFormProps> = ({ permissionTypes, onUpdate, data }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [permissionSelected, setPermissionSelected] = React.useState<IPermission>({
        nombreEmpleado: "",
        apellidoEmpleado: "",
        tipoPermisoId: 1,
        fechaPermiso: new Date(),
    });

    const [feedBackMessage, setFeedBackMessage] = React.useState({
        message: "",
        severity: "",
    });
    useEffect(() => {
        setTimeout(() => {
            setFeedBackMessage({
                message: "",
                severity: "",
            });
        }, 5000);
    }, [feedBackMessage]);

    useEffect(() => {
        if (data) {
            setPermissionSelected(data);
        }else {
            setPermissionSelected({
                nombreEmpleado: "",
                apellidoEmpleado: "",
                tipoPermisoId: 1,
                fechaPermiso: new Date(),
            });
        }
    }, [data])

    const createPermission = (permission: IPermission) => {
        PostPermission(permission).then((response) => {
            console.log("response", response)
            setFeedBackMessage({
                message: "Permiso creado correctamente",
                severity: "success",
            });
            reset();
            onUpdate();
        }).catch((error) => {
            setFeedBackMessage({
                message: "Error al crear el permiso" + error.message,
                severity: "error",
            });
        });
    };

    const EditPermission = (permission: IPermission) => {
        UpdatePermission(permission).then((response) => {
            setFeedBackMessage({
                message: "Permiso actualizado correctamente",
                severity: "success",
            });
            reset();
            onUpdate();
        }).catch((error) => {
            setFeedBackMessage({
                message: "Error al actualizar el permiso" + error.message,
                severity: "error",
            });
        });
    }

    const handleSubmitForm = (data: FieldValues) => {
        const permission: IPermission = {
            nombreEmpleado: data.nombreEmpleado,
            apellidoEmpleado: data.apellidoEmpleado,
            tipoPermisoId: data.tipoPermisoId,
            fechaPermiso: new Date(data.fechaPermiso),
        };

        if (permissionSelected.id) {
            permission.id = permissionSelected.id;
            permission.fechaPermiso = data.fechaPermiso ? new Date(data.fechaPermiso) : permissionSelected.fechaPermiso;
            EditPermission(permission);

        }

        if (!permission.id) {
            createPermission(permission);
        }

    };
    return (
        <div style={{ width: "100%" }}>

            <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
                <PermissionFormContainer>
                    <Textfield
                        id="outlined-basic"
                        label="Nombre del empleado"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        inputProps={{ ...register("nombreEmpleado", { required: true}) }}
                        value={permissionSelected.nombreEmpleado}
                        onChange={(e) => {
                            setPermissionSelected({
                                ...permissionSelected,
                                nombreEmpleado: e.target.value,
                            });
                        }}
                    />
                    <Textfield
                        id="outlined-basic"
                        label="Apellido del empleado"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        inputProps={{
                            ...register("apellidoEmpleado", { required: true }),
                        }}
                        value={permissionSelected.apellidoEmpleado}
                        onChange={(e) => {
                            setPermissionSelected({
                                ...permissionSelected,
                                apellidoEmpleado: e.target.value,
                            });
                        }}
                    />
                    <InputLabel id="demo-simple-select-label">
                        Tipo de permiso
                    </InputLabel>
                    <Select
                        sx={{ width: "100%" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={permissionSelected.tipoPermisoId}
                        label="Age"
                        autoWidth={true}
                        inputProps={{ ...register("tipoPermisoId", { required: true }) }}
                        onChange={(e) => {
                            setPermissionSelected({
                                ...permissionSelected,
                                tipoPermisoId: e.target.value as number,
                            });
                        }}
                    >
                        {permissionTypes.length > 0 &&
                            permissionTypes.map((permission) => (
                                <MenuItem key={permission.id} value={permission.id}>
                                    {permission.description}
                                </MenuItem>
                            ))}
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{ width: "100%" }}
                            onChange={(date) => {
                                register("fechaPermiso", {
                                    value: date?.format("YYYY-MM-DD"),
                                });
                            }}
                            value={dayjs(permissionSelected.fechaPermiso)}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" type="submit">
                        {
                            permissionSelected.id ? "Actualizar Permiso" : "Crear Permiso"
                        }
                    </Button>
                </PermissionFormContainer>
            </form>

            {
                feedBackMessage && <Alert variant="filled" severity={feedBackMessage.severity as AlertColor | undefined} sx={{ width: "100%" }}>
                    {feedBackMessage.message}
                </Alert>
            }
        </div>
    );
};

export default PermissionForm;

const PermissionFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #f0f0f0;
  width: 100%;
  padding: 1rem;
`;
