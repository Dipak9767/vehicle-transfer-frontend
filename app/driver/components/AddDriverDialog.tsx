'use client'

import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase';
import { createDriver } from '../actions/driverActions';

interface AddDriverDialogProps {
    open: boolean;
    onClose: () => void;
    getDrivers: () => void
}

const AddDriverDialog: React.FC<AddDriverDialogProps> = ({ open, onClose, getDrivers }) => {
    const [driverData, setDriverData] = useState({
        name: '',
        phoneNumber: '',
        profilePhoto: ''
    })
    const [errorList, setErrorList] = useState([]) as any

    const handleChange = (event: any) => {
        const { name, value } = event?.target;
        if (name === 'phoneNumber' && value?.length > 10) return;
        setDriverData(prev => ({ ...prev, [name]: value }))
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
                console.error('Upload failed:', error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setDriverData(prev => ({ ...prev, profilePhoto: downloadURL }))
            }
        );

    };

    const handleSubmit = async () => {
        setErrorList([])
        if (!driverData?.name) {
            setErrorList(['name'])
            return
        }
        if (!driverData?.phoneNumber) {
            setErrorList(['phoneNumber'])
            return
        }

        try {
            const response: any = await createDriver(driverData)
            if (response.status) {
                console.log(response)
                onClose()
                getDrivers()
            }
        } catch (error) {

        }
    }

    console.log(driverData)
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
                        label={"Name"}
                        name='name'
                        error={errorList.includes('name')}
                        value={driverData?.name}
                        helperText='Name is required'
                        onChange={handleChange}

                    />
                    <TextField
                        type='number'
                        label={"Phone Number"}
                        name='phoneNumber'
                        error={errorList.includes('phoneNumber')}
                        helperText='Phone number is required'
                        value={driverData?.phoneNumber}
                        onChange={handleChange}

                    />
                    <TextField
                        type='file'
                        label={"Profile Photo"}
                        InputLabelProps={{ shrink: true }}
                        name='profilePhoto'
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

export default AddDriverDialog;
