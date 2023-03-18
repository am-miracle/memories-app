import React, { useState } from 'react'

import useStyles from './styles';
import { Button, TextField, Typography } from '@mui/material';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>Comments</Typography>
          {comments.map((comment, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>
              Comment {i}
            </Typography>
          ))}
        </div>
        <div sx={{ width: '70%'}}>
          <Typography gutterBottom variant='h6'>Write a Comment</Typography>
          <TextField
            fullWidth
            rows={4}
            variant='outlined'
            label='Comment'
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button sx={{ marginTop: '10px'}} fullWidth disabled={!comment} variant='container'>
            
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CommentSection