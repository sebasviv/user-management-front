import React, { useEffect } from "react";
import Textfield from "@mui/material/TextField";
import { InputLabel, MenuItem, Select } from "@mui/material";
import styled from "styled-components";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { PermissionT } from "../types/Permission";
import axios from "axios";
import { IPermissionTypes } from "../types/PermissionTypes";

const PermissionForm = () => {
    const [age, setAge] = React.useState("");
    const [permissionList, setPermissionList] = React.useState<IPermissionTypes[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    useEffect(() => {
        const fetchPermissionTypes = async () => {
            try {
                const response = await axios.get<IPermissionTypes[]>(`${import.meta.env.VITE_APP_PERMISSION_API}/api/permissiontype`);
                setPermissionList(response.data);
            }catch (error) {
                console.error("error", error);
            }
        };

        fetchPermissionTypes();

    },[]);

    return (
        <div>
            <form>
                <PermissionFormContainer>
                    <Textfield
                        id="outlined-basic"
                        label="Nombre del empleado"
                        variant="outlined"
                    />
                    <Textfield
                        id="outlined-basic"
                        label="Apellido del empleado"
                        variant="outlined"
                    />
                    <InputLabel id="demo-simple-select-label">Tipo de permiso</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                        autoWidth={true}
                    >
                        {
                            permissionList.length > 0 ? permissionList.map((permission) => (
                                <MenuItem key={permission.id} value={permission.id}>{permission.description}</MenuItem>
                            )) : <span>Cargando...</span>

                        }
                   
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker />
                    </LocalizationProvider>
                </PermissionFormContainer>
            </form>
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
`;
