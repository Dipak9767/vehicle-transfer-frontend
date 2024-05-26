'use client'

import AddButton from "@/components/addButton/AddButton";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchVehicles } from "./actions/vehicleActions";
import DataTable from "@/components/dataTable/DataTable";
import AddVehicleDialog from "./components/AddVehicleDialog";
import { vehiclesColumns } from "./components/vehiclesColumns"

export default function Home() {
    const [vehicles, setVehicles] = useState([])
    const [openDialog, setOpenDialog] = useState(false)

    const getVehicles = async () => {
        try {
            const response: any = await fetchVehicles()
            if (response?.status) {
                setVehicles(response?.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getVehicles();
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
            <AddVehicleDialog
                onClose={handleClose}
                open={openDialog}
                getVehicles={getVehicles}
            />
            <AddButton onClick={() => setOpenDialog(true)} />
            <Box sx={{
                width: '100%',
                height: '90vh',
                padding: 2
            }}>
                <Typography color={'black'} fontSize={30}>Vehicles</Typography>
                <DataTable
                    rows={vehicles?.map((item: any, idx) => ({ ...item, id: idx + 1 }))}
                    columns={vehiclesColumns}
                />

            </Box>


        </Box>
    );
}
