import { Box, Stack, Typography, Button, ButtonGroup } from '@mui/material'
import React from 'react'


const Blogs = (props) => {
    const {blogs, handleEditBlog, handleOpen, getBlogs} = props;  
    
    //Edit blog data
    let blogData = {id:'',tag: '', artical:''}

    // send edit blog data to parent (EditBox)
    const sendDataToEditBox = ()=>{
        handleEditBlog(blogData);  // from parent
    }

    // when click on Edit Btn 
    const handleEditBtn = (editBlogData)=>{
        // setBlogData(editBlogData);
        blogData = editBlogData;
        handleOpen();   // from parent to open the edit box
        sendDataToEditBox();
        
    }

    //when click on delete Btn
    const handleDeleteBtn = async (id)=>{
        let del = confirm('Are you want to delete this BLog');

        try {
            if(del){
                let delete_blog = await fetch(`http://localhost:5000/deepak/deleteblog/${id}`,{
                    method: 'DELETE'
                });
    
                delete_blog = await delete_blog.json();
    
                if(delete_blog.success){
                    getBlogs();
                    props.showAlert('success',delete_blog.msg)
                }
            }
        } catch (error) {
            props.showAlert('error','blog is not deleted. something wrong');
        }
       
    }
    return (
        <>{blogs.map((blog)=>{  
            return <Box component="section" sx={{ p: 2, border: '1px dashed grey', my: 8}} key={blog._id}>
            <Stack spacing={2}>
                <ButtonGroup variant="outlined" color="default">  
                    <Button onClick={()=>handleEditBtn({id: blog._id,tag:blog.tag, artical:blog.artical})}>Edit</Button>
                    <Button onClick={()=>handleDeleteBtn(blog._id)}>Delete</Button>
                </ButtonGroup>
                <Typography variant="h4" color="initial" sx={{ textAlign: 'center' }}>{blog.tag}</Typography>
                <Typography variant="caption" color="initial">Publish Date : {blog.publishingDate}
</Typography>
                <Typography variant="body1" color="initial">{blog.artical}</Typography>

            </Stack>
        </Box>
        })}
            
        </>
    )
}

export default Blogs
