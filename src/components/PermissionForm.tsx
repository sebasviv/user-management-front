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
import { Controller, FieldValues, useForm } from "react-hook-form";
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
        setValue,
        control,
        formState: { errors },
    } = useForm();
    // const [permissionSelected, setPermissionSelected] = React.useState<IPermission>({
    //     nombreEmpleado: "",
    //     apellidoEmpleado: "",
    //     tipoPermisoId: 1,
    //     fechaPermiso: new Date(),
    // });

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
        // if (data) {
        //     setPermissionSelected(data);
        // }else {
        //     setPermissionSelected({
        //         nombreEmpleado: "",
        //         apellidoEmpleado: "",
        //         tipoPermisoId: 1,
        //         fechaPermiso: new Date(),
        //     });
        // }

        if (data) {
            setValue("nombreEmpleado", data.nombreEmpleado);
            setValue("apellidoEmpleado", data.apellidoEmpleado);
            setValue("tipoPermisoId", data.tipoPermisoId);
            setValue("fechaPermiso", dayjs(data.fechaPermiso));
        } else {
            reset();
        }
    }, [data, setValue, reset])

    const createPermission = (permission: IPermission) => {
        PostPermission(permission).then((response) => {
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

        if (data.id) {
            permission.id = data.id;
            EditPermission(permission);
        }

        if (!data.id) {
            createPermission(permission);
        }
    };
    return (
        <div style={{ width: "100%" }}>
            <div>{data ? 'EDITAR PERMISO' : 'CREAR PERMISO'}</div>
            <form onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
                <PermissionFormContainer>
                    <Controller
                        name="nombreEmpleado"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={""}
                        render={({ field }) => (
                            <Textfield
                                {...field}
                                label="Nombre del empleado"
                                variant="outlined"
                                sx={{ width: "100%" }}
                                error={!!errors.nombreEmpleado}
                                helperText={errors.nombreEmpleado ? "Campo requerido" : ""}
                            />
                        )}
                    />
                    <Controller
                        name="apellidoEmpleado"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={""}
                        render={({ field }) => (
                            <Textfield
                                {...field}
                                label="Apellido del empleado"
                                variant="outlined"
                                sx={{ width: "100%" }}
                                error={!!errors.apellidoEmpleado}
                                helperText={errors.apellidoEmpleado ? "Campo requerido" : ""}
                            />
                        )}
                    />
                    <InputLabel id="demo-simple-select-label">
                        Tipo de permiso
                    </InputLabel>
                    <Controller
                        name="tipoPermisoId"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                sx={{ width: "100%" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                            >
                                {permissionTypes.length > 0 &&
                                    permissionTypes.map((permission) => (
                                        <MenuItem key={permission.id} value={permission.id}>
                                            {permission.description}
                                        </MenuItem>
                                    ))}
                            </Select>
                        )}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Controller
                            name="fechaPermiso"
                            control={control}
                            defaultValue={dayjs()}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    sx={{ width: "100%" }}
                                    onChange={(date) => field.onChange(date?.format("YYYY-MM-DD"))}
                                />
                            )}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" type="submit">
                        {
                            data ? "Actualizar Permiso" : "Crear Permiso"
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
