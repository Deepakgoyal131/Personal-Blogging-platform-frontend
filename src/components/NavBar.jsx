import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <Box sx={{flexGrow: 1}}>
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Personal Bloging Platform 
            </Typography>
            <Link to='/'><Button variant="text" color="inherit">
              Your Blogs
            </Button></Link>

            <Link to='/add_blog'><Button variant="text" color="inherit">
              Add Blog
            </Button></Link>
          </Toolbar>
        </AppBar>
    </Box>
  )
}

export default NavBar
