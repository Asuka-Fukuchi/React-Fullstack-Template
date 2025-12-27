import { Container, Typography, Box } from "@mui/material";

export default function Footer(){
    return(
        <Box sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[800],
            p: { xs: 3, sm: 6 },
        }}
            component='footer'
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    &copy;  {new Date().getFullYear()} Asuka Fukuchi. All rights reserved.
                </Typography>
            </Container>
        </Box>
    )
}