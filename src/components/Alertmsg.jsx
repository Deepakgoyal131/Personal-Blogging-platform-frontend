import React from 'react'
import { Alert } from '@mui/material'

const Alertmsg = (props) => {
  return (
    <>
        {props.alert && <Alert severity={props.alert.type} sx={{m : 8}}>{props.alert.msg}</Alert>}
    </>
   
  )
}

export default Alertmsg
