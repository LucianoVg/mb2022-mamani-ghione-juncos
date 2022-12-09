import { ArrowBack } from "@mui/icons-material"
import { Avatar, Button, Container, Grid, Link, Typography } from "@mui/material"
import Head from "next/head"

export default function Error() {
    return (
        <>
            <Head>
                <title>Forbidden</title>
            </Head>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={5} sx={{ m: 'auto', mt: '15%', textAlign: 'center' }}>
                        <Avatar src={'/assets/img/error.svg'} sx={{ m: 'auto', width: 80, height: 80 }} />
                        <Typography variant="h5" sx={{ textAlign: 'center' }}>
                            No poseee los permisos para ingresar a esta parte
                        </Typography>
                        <Link href={'/'}>
                            <Button
                                variant="outlined"
                                color="info"
                                sx={{ mt: 2 }}
                                startIcon={<ArrowBack color="info" />}>
                                Volver al inicio
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
