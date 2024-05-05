import "../styles/login.scss";
import React, { useState } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from "universal-cookie";
import AdminPost from "./AdminPost"
import AdminUser from "./AdminUser"
import { jwtDecode } from 'jwt-decode';
const cookies = new Cookies();
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MUI compnent reworked
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminEvent(props) {

  const { dispatch, state, setDescription } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const token = cookies.get('token')
  const decodedToken = jwtDecode(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const description = state.description;
      const event_name = state.eventName;
      const event_start = state.eventStart;
      const event_end = state.eventEnd;
      const user_id = decodedToken.userId;
      const active = true;

      // Log the data being sent in the request
      console.log("Sending data:", { description, user_id, event_end, event_name, event_start });

      // Make a POST request to create the event
      const response = await axios.post(`http://localhost:3001/events`, { description, user_id, event_name, event_start, event_end, active },{
        headers: {
          Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
        }
      }
    );

      // Reload the window after successful creation
      window.location.reload();
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error("Error creating event:", error);
      alert("Event creation failed!");
    }
  };


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (buttonName) => {
    handleMenuClose(); 
    dispatch({ type: "SET_ADMIN_PAGE_STATE", payload: buttonName });
  
    console.log("adminpage",state.adminPage);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Update description when input changes
  };


  const handleDelete = async () => {
    try {
      const user_id = cookies.get("user_id");

      // Make an HTTP request to delete the user account
      const response = await axios.delete(`/register`, {
        data: { id: user_id } // Include the user ID in the request body
      });

      alert("User deleted successfully!");

    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };















  return (
    <ThemeProvider theme={defaultTheme}>
      
      <Box
        sx={{
          height: '100%',
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Box}
          elevation={6}
          square
          width='75%'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderRadius: '4px',
    padding: '10px', 
    marginTop: '12vh',
          }}
          
        >
          {state.adminPage === "Events" && (<Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              width: '80%',
              height:'80vh',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >
              <LockOutlinedIcon />
            </Avatar>

            <Button
              
              onClick={handleMenuOpen}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: 'linear-gradient(to right, #ff0000, #00ff00)', 
                width: '25%', 
              }}

            >Select Action</Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ width: '100%' }}
             
            >
              <MenuItem
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '100%' }} onClick={() => handleItemClick('Events')}>
                Events
              </MenuItem>
              <MenuItem 
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '100%' }} onClick={() => handleItemClick('Posts')}>
                Posts
              </MenuItem>
              <MenuItem 
                variant="contained"
                sx={{ mt: 3, mb: 2, width: '100%' }} onClick={() => handleItemClick('Other')}>
                Users
              </MenuItem>
            </Menu>
            <Typography component="h1" variant="h5">
              Add Events
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >

              <TextField
                margin="normal"
                required

                id="event_name"
                label="Event Name"
                name="event_name"
                value={state.eventName}
                onChange={(e) => dispatch({ type: "SET_EVENT_NAME_STATE", payload: e.target.value })}
                placeholder="Enter event name"
                sx={{ width: '80%' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Enter a new description"
                name="description"
                autoComplete="description"
                autoFocus
                type="description"
                value={state.description}
                onChange={(e) => dispatch({ type: "SET_DESCRIPTION_STATE", payload: e.target.value })}
                placeholder="Enter description"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="event_start"
                label="Event Start"
                name="event_start"
                type="datetime-local"
                value={state.event_start}
                onChange={(e) => dispatch({ type: "SET_EVENT_START_STATE", payload: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="event_end"
                label="Event End"
                name="event_end"
                type="datetime-local"
                value={state.event_end}
                onChange={(e) => dispatch({ type: "SET_EVENT_END_STATE", payload: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                onClick={handleSubmit}

                variant="contained"
                sx={{ mt: 3, mb: 2 }}

              >Add Event</Button>




              <Grid container>
                <Grid item xs>

                </Grid>
                <Grid item>

                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>)}
          
          {state.adminPage === "Posts" && <AdminPost state={state} dispatch={dispatch}  />}


          {state.adminPage === "Other" && <AdminUser state={state} dispatch={dispatch}  />}
            
        </Grid>
      </Box>
    </ThemeProvider>);

}

