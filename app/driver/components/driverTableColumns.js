import { Box, Typography } from "@mui/material"
import {colors} from "../../../utils/colors/colors"

export const driverTableColumns = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        renderCell: (params) => (
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 4,gap:2 }}>
                <Box
                    sx={{
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: 'hidden',
                        gap:2
                    }}
                >
                    {
                        params?.row?.profilePhoto ?
                            <img
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    borderRadius: "50%",
                                }}
                                src={params?.row?.profilePhoto} alt="" />
                            :
                            <Box
                                sx={{
                                    background: colors.customBlue,
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography color={'white'}>
                                    {params.value?.charAt(0)}
                                </Typography>
                            </Box>
                    }
                </Box>
                <Box  >
                    <Typography colors={colors.customBlue} fontSize={14}>
                        {params.value}
                    </Typography>
                </Box>
            </Box>
        )
    },
    {
        field: 'phoneNumber',
        headerName: 'Phone Number',
        flex: 1
    }
]