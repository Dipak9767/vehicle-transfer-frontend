import { Box, Typography } from "@mui/material"
import { colors } from "../../../utils/colors/colors"

export const vehiclesColumns = [
    {
        field: 'vehicleNumber',
        headerName: 'Vehicle Number',
        flex: 1,
    },
    {
        field: 'vehicleType',
        headerName: 'vehicle Type',
        flex: 1
    },
    {
        field: 'pucCertificate',
        headerName: 'puc Certificate',
        flex: 1,
        renderCell: (params) => (
            <a target="_blank" href={params.value}>{params.value}</a>
        )
    },
    {
        field: 'insuranceCertificate',
        headerName: 'insurance Certificate',
        flex: 1,
        renderCell: (params) => (
            <a target="_blank" href={params.value}>{params.value}</a>
        )
    }
]