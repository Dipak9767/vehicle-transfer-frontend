'use client'

import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase';
import { createVehicle } from '../actions/vehicleActions';
// import { createDriver } from '../actions/vehicleActions';

interface AddVehicleDialogProps {
    open: boolean;
    onClose: () => void;
    getVehicles: () => void
}

const AddVehicleDialog: React.FC<AddVehicleDialogProps> = ({ open, onClose, getVehicles }) => {
    const [vehicleData, setVehicleData] = useState({
        vehicleNumber: '',
        vehicleType: '',
        pucCertificate: '',
        insuranceCertificate: ''
    })
    const [errorList, setErrorList] = useState([]) as any

    const handleChange = (event: any) => {
        const { name, value } = event?.target;
        if (name === 'phoneNumber' && value?.length > 10) return;
        setVehicleData(prev => ({ ...prev, [name]: value }))
    }

    const handleUpload = async (event: any) => {
        const file = event.target.files[0]
        if (!file) return '';

        const storageRef = ref(storage, `uploads/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            error => {
                alert(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setVehicleData(prev => ({ ...prev, [event?.target.name]: downloadURL }))
                alert('File uploaded')
            }
        );

    };

    const handleSubmit = async () => {
        setErrorList([])
        if (!vehicleData?.vehicleNumber) {
            setErrorList(['vehicleNumber'])
            return
        }
        if (!vehicleData?.vehicleType) {
            setErrorList(['vehicleType'])
            return
        }
        if (!vehicleData?.insuranceCertificate) {
            setErrorList(['insuranceCertificate'])
            return
        }
        if (!vehicleData?.pucCertificate) {
            setErrorList(['pucCertificate'])
            return
        }

        try {
            const response: any = await createVehicle(vehicleData)
            if (response.status) {
                alert(response?.data?.message)
                onClose()
                getVehicles()
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        setVehicleData({
            vehicleNumber: '',
            vehicleType: '',
            pucCertificate: '',
            insuranceCertificate: ''
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
                        label={"vehicle Number"}
                        name='vehicleNumber'
                        error={errorList.includes('vehicleNumber')}
                        value={vehicleData?.vehicleNumber}
                        helperText='vehicleNumber is required'
                        onChange={handleChange}
                    />
                    <TextField
                        label={"vehicle Type"}
                        name='vehicleType'
                        error={errorList.includes('vehicleType')}
                        helperText='vehicleType is required'
                        value={vehicleData?.vehicleType}
                        onChange={handleChange}

                    />
                    <TextField
                        type='file'
                        label={"puc Certificate"}
                        InputLabelProps={{ shrink: true }}
                        error={errorList.includes('pucCertificate')}
                        name='pucCertificate'
                        helperText="puc Certificate is required"
                        onChange={handleUpload}
                    />
                    <TextField
                        type='file'
                        helperText='insurance Certificate is required'
                        label={"insurance Certificate"}
                        InputLabelProps={{ shrink: true }}
                        error={errorList.includes('insuranceCertificate')}
                        name='insuranceCertificate'
                        onChange={handleUpload}
                    />
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

export default AddVehicleDialog;
