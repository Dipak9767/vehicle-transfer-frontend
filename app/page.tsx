'use client'

import { Box, Button, Typography } from "@mui/material";
import { colors } from '../utils/colors/colors'
import { commonStyles } from "../styles/commonStyle"
import { routes } from "../utils/routes/routes"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <Box sx={{
      maxHeight: '100vh',
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

      <Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography sx={{
            fontSize: 50,
          }}>
            Welcome To</Typography>
          <Typography sx={{
            fontSize: 50,
            color: colors.customBlue
          }}>
            Vehicle Transport</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          marginTop: 2
        }}>
          <Button
            variant="contained"
            sx={commonStyles.buttonStyle}
            onClick={() => router.push(routes.DRIVER)}>
            Drivers
          </Button>
          <Button
            variant="contained"
            sx={commonStyles.buttonStyle}>
            Vehicle
          </Button>
          <Button
            variant="contained"
            sx={commonStyles.buttonStyle}>
            Transfer
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
