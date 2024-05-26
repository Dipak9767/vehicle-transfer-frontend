'use client'

import AddButton from "@/components/addButton/AddButton";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchDrivers } from "./actions/driverActions";
import DataTable from "@/components/dataTable/DataTable";
import AddDriverDialog from "./components/AddDriverDialog";
import { driverTableColumns } from "./components/driverTableColumns"

export default function Home() {
    const [drivers, setDrivers] = useState([])
    const [openDialog, setOpenDialog] = useState(false)

    const getDrivers = async () => {
        try {
            const response: any = await fetchDrivers()
            if (response?.status) {
                setDrivers(response?.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDrivers();
    }, [])

    const handleClose = () => {
        setOpenDialog(false)
    }

    return (
        <Box sx={{
            maxHeight: '100vh',
            maxWidth: '100vw',
            overflow: 'hidden',
            width: '100vw',
            height: '100vh',
            position: 'relative',
            padding: 2
        }}>
            <AddDriverDialog
                onClose={handleClose}
                open={openDialog}
                getDrivers={getDrivers}
            />
            <AddButton onClick={() => setOpenDialog(true)} />
            <Box sx={{
                width: '100%',
                height: '90vh',
                padding: 2
            }}>
                <Typography color={'black'} fontSize={30}>Drivers</Typography>
                <DataTable
                    rows={drivers}
                    columns={driverTableColumns}
                />

            </Box>


        </Box>
    );
}
