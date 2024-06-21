import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import Paper from '@mui/material/Paper';
import { IPermission } from '../types/Permission';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IPermissionsTableProps {
    data: IPermission[];
    onDelete: (id: number) => void;
}

const PermissionsTable: React.FC<IPermissionsTableProps> = ({ data, onDelete }) => {
    return (
        <div>
            {
                data.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Apellido</TableCell>
                                <TableCell align="right">Fecha de permiso</TableCell>
                                <TableCell align="right">Tipo de permiso</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.nombreEmpleado}
                                    </TableCell>
                                    <TableCell align="right">{row.apellidoEmpleado}</TableCell>
                                    <TableCell align="right"> {new Date(row.fechaPermiso).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">{row.tipoPermisoId}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" onClick={() => {
                                            if (row.id) {
                                                onDelete(row.id)
                                            }
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete">
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }


        </div>
    )
}

export default PermissionsTable