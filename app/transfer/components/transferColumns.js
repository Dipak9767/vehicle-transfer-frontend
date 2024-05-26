
export const transferColumns = [
    {
        field: 'vehicleNumber',
        headerName: 'Vehicle Number',
        flex: 1,
        renderCell: (params) => (
            <p>{params?.row?.vehicle?.vehicleNumber}</p>
        )
    },
    {
        field: 'vehicleType',
        headerName: 'vehicle Type',
        flex: 1,
        renderCell: (params) => (
            <p>{params?.row?.vehicle?.vehicleType}</p>
        )
    },
    {
        field: 'fromDriverName',
        headerName: 'puc Certificate',
        flex: 1,
        renderCell: (params) => (
            <p>{params?.row?.fromDriver?.name}</p>
        )
    },
    {
        field: 'toDriverName',
        headerName: 'insurance Certificate',
        flex: 1,
        renderCell: (params) => (
            <p>{params?.row?.toDriver?.name}</p>
        )
    }
]