import { Box } from '@mui/material'
import React from 'react'

export default function NotFound() {
  return (
        <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
          <img src={require('../Assets/no-course-found.png')} alt='no_course_found'/>
        </Box>
  )
}
