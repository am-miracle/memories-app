import React from 'react'
import {ArrowForward, ArrowBack} from '@mui/icons-material'
import useStyles from './styles'
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';


const Paginate = () => {
  const classes = useStyles();

  return (
    <Pagination
      classes={{ ul: classes.ul}}
      count={5}
      page={1}
      variant='outlined'
      color='primary'
      renderItem={(item) => (
        <PaginationItem
          slots={{ previous: ArrowBack, next: ArrowForward }}
          component={Link}
          to={`/posts?.page=${1}`}
          {...item}
        />
      )}
    />
  )
}

export default Paginate