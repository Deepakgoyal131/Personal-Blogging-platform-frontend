import { Box, Paper, TextField, Button } from '@mui/material'
import React, { useState } from 'react'

const AddBlog = (props) => {
  const [tag,setTag] = useState('');
  const [artical,setArtical] = useState('');

  const publishNewBlog = async ()=>{
    try {
      let newBlog = await fetch('http://localhost:5000/deepak/createblog',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({tag, artical})
      })

      let res = await newBlog.json();
      if(res.success){
        console.log(res)
        setTag('');
        setArtical('');
        props.showAlert('success',"Blog is added sussessfully")
      }
      
    } catch (error) {
        props.showAlert('error','please write blog and title');
    }
  }

  return (
    <>
    <Box sx={{my: 10}}>
            <Paper elevation={2} sx={{textAlign: 'center'}}>
                <TextField
                  id="tag"
                  label="Blog Title"
                  variant='standard'
                  value={tag}
                  sx={{width: 800, maxWidth: '90%'}}
                  onChange={(e)=> setTag(e.target.value)}
                />
                <br />
                <TextField
          id="filled-multiline-static"
          label="Blog Description"
          multiline
          rows={20}
          value={artical}
          variant="filled"
          sx={{m:2, width: 800, maxWidth: '90%'}}
          onChange={(e)=> setArtical(e.target.value)}
        />
        <br />
        <Button variant="outlined" color="primary" sx={{float: 'right', m: 2}} onClick={publishNewBlog}>
          Publish Blog
        </Button>

            </Paper>
        </Box>
    
        
    </>
  )
}

export default AddBlog
