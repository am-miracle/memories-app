import React, { useState } from 'react'
import useStyles from './styles'
import { Button, Card, CardActions, CardContent, CardMedia, Typography, Link } from '@mui/material';
import { Delete, MoreHoriz, ThumbUpAltOutlined, ThumbUpAlt } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLikes] = useState(post?.likes);

    const openPost = () => {
      navigate(`/posts/${post._id}`);
    }

    const hasLikedPost = post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
    const userId = user?.result.googleId || user?.result?._id;

    const handleLike = async () => {
      dispatch(likePost(post._id));

      if(hasLikedPost){
        setLikes(post.likes.filter((id) => id !== userId))
      } else{
        setLikes({ ...post.likes, userId})
      }
    }

    const Likes = () => {
      if (likes.length > 0) {
        return likes.find((like) => like === userId)
        ? (
          <>
            <ThumbUpAlt fontSize='small' />&nbsp;{likes.length > 2 ? `You and ${likes.length -1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
          </>
        ) : (
          <>
            <ThumbUpAltOutlined fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? `Like`: `Likes`}
          </>
        )
      }
      return <>
        <ThumbUpAltOutlined fontSize='small' />&nbsp;Like
      </>
    }

  return (
    <Card className={classes.card} raised elevation={6}>
      <Link
        component="div"
        underline="none"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHoriz fontSize="default" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
        </CardContent>
      </Link>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <Delete fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post