import React, {useEffect, useState} from 'react';

import {Button, Dialog, List, AppBar, Toolbar, IconButton, Typography, Slide, TextField} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import Blogs from './Blogs';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [open, setOpen] = useState(false);
  const [editBlog, setEditBlog] = useState({id:0, tag: '',artical:''});

  //getBlogs send to child blogs
  const [blogs,setBlogs] = useState([]);

  // getBlogs is coming from child (Blogs)
  const handleEditBlog = (getBlogs) => {
    setEditBlog(getBlogs); 
 };
  
  // handling closing and opening of edit box(dailog box)
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    let close = confirm('Are you sure to close')
    if(close){
        setOpen(false);
    }
  };

  // Save the edit blog in the getBlogsbase on clicking save btn
   const handleSave = ()=>{ 
       let save = confirm("Are you want to save");

       if(save){
         updateBlog(editBlog.id)
         setOpen(false)
         getBlogs();
       }
   }

   // Handle Server Requests 
   let getBlogs = async ()=>{
    try {
      let response = await fetch('http://localhost:5000/deepak/blogs')
      let json = await response.json();
      console.log([json])
      setBlogs(json)
    } catch (error) {
        props.showAlert('error','server not respond');
    } 
   }

   const updateBlog = async (id)=>{
      try {
        let blog = await fetch(`http://localhost:5000/deepak/updateblog/${id}`,{
          method: 'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({tag:editBlog.tag, artical:editBlog.artical})
        });

        blog = await blog.json();
        props.showAlert('success','Blog is Edited successfully')
      } catch (error) {
        props.showAlert('error','Server not respond')
      }
   }
   
   useEffect(()=>{
    getBlogs()
   },[])

   

  return (
    <>
      <Blogs handleOpen = {handleOpen} blogs={blogs} handleEditBlog={handleEditBlog} getBlogs={getBlogs} showAlert={props.showAlert}/>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Blog Edit Mode
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>  
              save 
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{textAlign:'center'}}>
          <TextField
            id='edit_title'
            label="Edit Title"
            variant='standard'
            defaultValue={editBlog.tag}
            onChange={(e)=> setEditBlog((prevState)=>({...prevState, tag:e.target.value}))}
            sx={{m:2, width: 800, maxWidth: '90%'}}
          />
          <br />
          <TextField
                    id="filled-multiline-static"
                    label="Edit Blog Description"
                    multiline
                    rows={20}
                    defaultValue={editBlog.artical}
                    variant="filled"
                    sx={{m:2, width: 800, maxWidth: '90%'}}
                    onChange={(e)=> setEditBlog((prevState)=>({...prevState, artical:e.target.value}))}
                  />
        </List>
      </Dialog>
    </>
  );
}
