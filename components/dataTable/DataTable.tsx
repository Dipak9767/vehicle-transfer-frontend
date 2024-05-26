import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

type Props = {
    rows: any,
    columns: any
}

export default function DataTable({ rows, columns }: Props) {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 15,
                    },
                },
            }}
            pageSizeOptions={[15, 30, 45, 60, 100]}
        />
    )
}