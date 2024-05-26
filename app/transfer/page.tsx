'use client'

import AddButton from "@/components/addButton/AddButton";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "@/components/dataTable/DataTable";
import { transferColumns } from "./components/transferColumns"
import { fetchTransfer } from "./actions/transferActions";
import AddTransferDialog from "./components/TransferDialog";
import { fetchDrivers } from "../driver/actions/driverActions";
import { fetchVehicles } from "../vehicle/actions/vehicleActions";

export default function Home() {
    const [transfer, setTransfer] = useState([])
    const [vehicle, setVehicle] = useState([])
    const [driver, setDriver] = useState([])
    const [openDialog, setOpenDialog] = useState(false)

    const getTransfer = async () => {
        try {
            const response: any = await fetchTransfer()
            if (response?.status) {
                console.log(response)
                setTransfer(response?.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getDrivers = async () => {
        try {
            const response: any = await fetchDrivers()
            if (response?.status) {
                setDriver(response?.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getVehicles = async () => {
        try {
            const response: any = await fetchVehicles()
            if (response?.status) {
                setVehicle(response?.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransfer();
        getDrivers();
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
            <AddTransferDialog
                onClose={handleClose}
                open={openDialog}
                getTransfer={getTransfer}
                driver={driver}
                vehicle={vehicle}
            />
            <AddButton onClick={() => setOpenDialog(true)} />
            <Typography color={'black'} fontSize={30}>transfer</Typography>
            <Box sx={{
                width: '100%',
                height: '90vh',
                padding: 2
            }}>
                <DataTable
                    rows={transfer}
                    columns={transferColumns}
                />

            </Box>


        </Box>
    );
}
