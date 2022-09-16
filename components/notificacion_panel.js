import { useEffect, useState } from 'react'

import { CircularProgress } from "@mui/material";
import { Box, Button, Tooltip, IconButton, Container, Badge, Grid, InputLabel, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material";
import { ButtonUnstyled } from "@mui/base";
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Popover from '@mui/material/Popover';



export const Notificacion = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return (
        <Container>


            <div>
                <Tooltip title='View Notification'>
                    <IconButton onClick={handleClick}>
                        <Badge

                            aria-describedby={id} variant="contained" 
                            badgeContent={5}

                            color="info"
                            style={{ float: 'right' }}  >

                            <NotificationsRoundedIcon sx={{ cursor: 'pointer', color: 'white' }} />

                        </Badge>
                    </IconButton>
                </Tooltip>


                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        style: { width: '20%' },
                    }}

                >
                    {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="Trash" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list">
                                <ListItemText primary="Spam" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list" >
                                <ListItemText primary="Asueto Docente" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#simple-list" >
                                <ListItemText>
                                  <div style={{textAlign: 'center'}}>
                                      <strong> Ver todo</strong>
                                  </div>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Popover>

            </div >
        </Container >


    )
}

export default Notificacion