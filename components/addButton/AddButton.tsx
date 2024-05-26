import { colors } from '@/utils/colors/colors';
import { Box, Typography } from '@mui/material';
import React from 'react';

type AddButtonProps = {
  onClick: () => void;
};

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        background: colors.customLakeGreen,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 70,
        right: 40,
        zIndex: 100,
        cursor: 'pointer'
      }}>
      <Typography color={'white'} fontSize={50}>
        +
      </Typography>
    </Box>
  );
};

export default AddButton;