import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useStyles from './styles';
import { Button, TextField, Typography } from '@mui/material';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments)
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentsRef = useRef()

  const handleClick = async () => {
    const finalComment = `${user?.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment('');
    console.log(commentsRef)

    commentsRef.current.scrollIntoView({ behavior: 'smooth'})
  };

  return (
    // <div>
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant='h6'>Comments</Typography>
        {comments.map((comment, i) => (
          <Typography key={i} gutterBottom variant='subtitle1'>
            <strong>{comment.split(': ')[0]}: </strong>
            {comment.split(':')[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>
      { user?.result?.name && (
        <div style={{ width: '5 0%'}}>
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
          <Button sx={{ marginTop: '10px'}} fullWidth disabled={!comment} color='primary' variant='contained' onClick={handleClick}>
            Comment
          </Button>
        </div>
      )}
    </div>
    // </div>
  )
}

export default CommentSection