import { Button, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";

export function EditarAsistenciaModal({ asistencia, idUsuario, open, toggleOpen }) {
    const [motivo, setMotivo] = useState("")

    const handleMotivo = (e) => {
        setMotivo(e.target.value)
    }

    const guardarAsistencia = async (e) => {
        e.preventDefault()
        console.log({ motivo });
        const res = await axios.put(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/update/${asistencia.id}`, {
            presente: asistencia?.presente,
            ausente: asistencia?.ausente,
            ausenteJustificado: asistencia?.ausenteJustificado,
            llegadaTarde: asistencia?.llegadaTarde,
            llegadaTardeJustificada: asistencia?.llegadaTardeJustificada,
            mediaFalta: asistencia?.mediaFalta,
            mediaFaltaJustificada: asistencia?.mediaFaltaJustificada,
            motivo: motivo,
            idUsuario: idUsuario
        })
        if (res.data) {
            console.log(res.data);
        }
        toggleOpen()
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={open}
            onClose={toggleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component={'form'} onSubmit={guardarAsistencia}>
                <Typography variant="h3">Asistencia de {asistencia?.alumnoXcursoXdivision?.usuario?.nombre}</Typography>
                <Grid container spacing={2} marginTop={5}>
                    <Grid sx={{ margin: 'auto' }}
                        item xs={8}>
                        <TextField
                            placeholder='Agregue un motivo para la asistencia'
                            fullWidth
                            name="motivo"
                            multiline
                            rows={5}
                            value={motivo}
                            onChange={handleMotivo}
                            required />

                        <Button sx={{ mt: 3 }} variant='contained' color='primary' type={'submit'}>Guardar Asistencia</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}