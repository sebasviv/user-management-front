import React, { useEffect } from "react";
import Textfield from "@mui/material/TextField";
import {
    Alert,
    AlertColor,
    Button,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IPermission } from "../types/Permission";
import { IPermissionTypes } from "../types/PermissionTypes";
import { FieldValues, useForm } from "react-hook-form";
import { PostPermission } from "../services/PermissionService";

interface IPermissionFormProps {
    permissionTypes: IPermissionTypes[];
    onUpdate: () => void;
}


const PermissionForm: React.FC<IPermissionFormProps> = ({ permissionTypes, onUpdate }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [permissionSelected, setPermissionSelected] = React.useState(1);
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

    const handleChange = (event: SelectChangeEvent<number>) => {
        setPermissionSelected(event.target.value as number);
    };

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

    const handleSubmitForm = (data: FieldValues) => {
        const permission: IPermission = {
            nombreEmpleado: data.nombreEmpleado,
            apellidoEmpleado: data.apellidoEmpleado,
            tipoPermisoId: data.tipoPermisoId,
            fechaPermiso: new Date(data.fechaPermiso),
        };

        createPermission(permission);
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
                        inputProps={{ ...register("nombreEmpleado", { required: true }) }}
                    />
                    <Textfield
                        id="outlined-basic"
                        label="Apellido del empleado"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        inputProps={{
                            ...register("apellidoEmpleado", { required: true }),
                        }}
                    />
                    <InputLabel id="demo-simple-select-label">
                        Tipo de permiso
                    </InputLabel>
                    <Select
                        sx={{ width: "100%" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={permissionSelected}
                        label="Age"
                        onChange={(val) => handleChange(val)}
                        autoWidth={true}
                        inputProps={{ ...register("tipoPermisoId", { required: true }) }}
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
                        />
                    </LocalizationProvider>
                    <Button variant="contained" type="submit">
                        Aceptar
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
