'use client'

import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, MenuItem, TextField } from '@mui/material';
import { createTransfer } from '../actions/transferActions';

interface AddTransferDialogProps {
    open: boolean;
    onClose: () => void;
    getTransfer: () => void;
    vehicle: any;
    driver: any;
}

const AddTransferDialog: React.FC<AddTransferDialogProps> = ({ open, onClose, getTransfer, vehicle, driver }) => {
    const [transferData, setTransferData] = useState({
        vehicleNumber: 0,
        fromDriver: 0,
        toDriver: 0,
    })
    const [errorList, setErrorList] = useState([]) as any

    const handleChange = (event: any) => {
        const { name, value } = event?.target;
        if (name === 'phoneNumber' && value?.length > 10) return;
        setTransferData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        setErrorList([])
        if (!transferData?.vehicleNumber) {
            setErrorList(['vehicleNumber'])
            return
        }
        if (!transferData?.fromDriver) {
            setErrorList(['fromDriver'])
            return
        }
        if (!transferData?.toDriver) {
            setErrorList(['toDriver'])
            return
        }
        try {
            const response: any = await createTransfer(transferData)
            if (response.status) {
                onClose()
                getTransfer()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTransferData({
            vehicleNumber: 0,
            fromDriver: 0,
            toDriver: 0,
        })
    }, [open])

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">Add Driver</DialogTitle>
            <DialogContent >
                <Box sx={{
                    width: '30rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 2
                }}>
                    <TextField
                        label={"Select vehicle"}
                        name='vehicleNumber'
                        error={errorList.includes('vehicleNumber')}
                        value={transferData?.vehicleNumber}
                        helperText='vehicle Number is required'
                        onChange={handleChange}
                        select
                    >
                        <MenuItem value={0}>Select vehicle</MenuItem>
                        {
                            vehicle?.map((v: any) => (
                                <MenuItem value={v.vehicleNumber} key={v.vehicleNumber}>{v.vehicleNumber}</MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField
                        label={"From"}
                        name='fromDriver'
                        error={errorList.includes('fromDriver')}
                        helperText='from driver is required'
                        value={transferData?.fromDriver}
                        onChange={handleChange}
                        select
                    >
                        <MenuItem value={0}>Select From Driver</MenuItem>
                        {
                            driver?.filter((d: any) => d.id !== transferData?.toDriver).map((d: any) => (
                                <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField
                        label={"To Driver"}
                        error={errorList.includes('toDriver')}
                        name='toDriver'
                        value={transferData?.toDriver}
                        helperText="puc Certificate is required"
                        onChange={handleChange}
                        select
                    >
                        <MenuItem value={0}>Select To Driver</MenuItem>
                        {
                            driver?.filter((d: any) => d.id !== transferData?.fromDriver).map((d: any) => (
                                <MenuItem value={d.id} key={d.id}>{d.name}</MenuItem>
                            ))
                        }
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant='contained'>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant='contained'>
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTransferDialog;
