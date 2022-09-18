import { useEffect, useState } from 'react'


import { Layout } from "../../../components/layout";
import { Box, Button, Stack, Menu, Popover, TextareaAutosize, Container, IconButton, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";

import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Edit } from "@mui/icons-material";
import Icon from '@mui/material/Icon';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


import styles from "../../../styles/tarjetaNoticias.module.css";

const MaterialEstudio = () => {
    const [curso, setCurso] = useState('Curso');

    const handleCurso = (e) => {
        setCurso(e.target.value);
    };



    return (
        <Layout>


            <FormControl sx={{ width: '100px' }}>
                <InputLabel id="demo-simple-select-label">Curso</InputLabel>
                <Select
                    direction='row'
                    // PONER LA LISTA EN HORIZONTAL 
                    MenuProps={{

                        anchorOrigin: {
                            vertical: 'center',
                            horizontal: 'right',
                        },
                        transformOrigin: {
                            vertical: 'center',
                            horizontal: 'left',
                        },

                    }}
                    value={curso}
                    label="Age"
                    onChange={handleCurso}

                >
                
                    <MenuItem value={1}sx={{ display: "inline-block" }}>1 A</MenuItem>
                    <MenuItem value={2}sx={{ display: "inline-block" }}>1 B</MenuItem>
                    <MenuItem value={3}sx={{ display: "inline-block" }}>2 A</MenuItem>
                    <MenuItem value={4}sx={{ display: "inline-block" }}>2 B</MenuItem>
                    <MenuItem value={5}sx={{ display: "inline-block" }}>3 A</MenuItem>
                    <MenuItem value={6}sx={{ display: "inline-block" }}>3 B</MenuItem>
                    <MenuItem value={5}sx={{ display: "inline-block" }}>4 A</MenuItem>
                    <MenuItem value={6}sx={{ display: "inline-block" }}>4 B</MenuItem>
                    <MenuItem value={5}sx={{ display: "inline-block" }}>5 A</MenuItem>
                    <MenuItem value={6}sx={{ display: "inline-block" }}>5 B</MenuItem>
                    <MenuItem value={5}sx={{ display: "inline-block" }}>6 A</MenuItem>
                    <MenuItem value={6}sx={{ display: "inline-block" }}>6 B</MenuItem>
                 



                </Select>
            </FormControl>

        </Layout >
    )
}

export default MaterialEstudio



{/* <div>
                <Button
                    sx={{ height: '50px' }}
                    aria-describedby={id}
                    variant="outlined"
                    spacing={3}
                    onClick={handleClick}
                    name="curso"
                    value={curso}

                >

                    <ArrowRightIcon />
                </Button>
                <Popover

                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClick={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >


                    <List sx={{ flexDirection: 'row', display: 'flex', padding: '0' }} >
                        <ListItem disablePadding>
                            <ListItemButton component="a" onChange={handleCurso} href="#simple-list">
                                <ListItemText primary="1A" value="1A" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="1B" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list" >
                                <ListItemText primary="2A" />
                            </ListItemButton>
                        </ListItem>
                    </List>



                </Popover> */}

{/* </div> */ }