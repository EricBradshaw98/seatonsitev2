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
import ImageUpload from "./ImageDrop"
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

export default function AdminUser(props) {

  const { dispatch, state, setDescription } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user_email = state.email;
      
      

      // Log the data being sent in the request
      console.log(" Sending user data:", { user_email });

      // Make a POST request to create the event
      const response = await axios.post(`/users/send-email`, { email: user_email});

      // Reload the window after successful creation
      window.location.reload();
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error("Error creating Post:", error);
      alert("Post creation failed!");
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
              Add User
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
                fullWidth
                id="user_email"
                label="Enter an email to add"
                name="user_email"
                autoComplete="user_email"
                autoFocus
                type="user_email"
                value={state.email}
                onChange={(e) => dispatch({ type: "SET_EMAIL_STATE", payload: e.target.value })}
                placeholder="Enter a new post"
              />
             
             
              <Button
                onClick={handleSubmit}

                variant="contained"
                sx={{ mt: 3, mb: 2 }}

              >Add User</Button>




              <Grid container>
                <Grid item xs>

                </Grid>
                <Grid item>

                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>

          

        
    </ThemeProvider>);

}

