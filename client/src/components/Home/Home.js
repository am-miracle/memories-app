import React, { useEffect, useState } from 'react'
import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@mui/material'
import { MuiChipsInput } from 'mui-chips-input';
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Paginate from '../Pagination/Paginate';

import useStyles from './styles';
import { useLocation, useNavigate } from 'react-router-dom'

// which page are we currently on and what search term we are looking for
const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery();
    const navigate  = useNavigate();
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    useEffect (() => {
      dispatch(getPosts())
    }, [currentId, dispatch]);

    const searchPost = () => {
        if(search.trim() || tags){
            // dispatch -> fetch search post
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
        } else {
            navigate('/')
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            // search post
            searchPost()
        }
    }
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))
    const handleAdd = (tag) => setTags({ ...tags, tag})
    const handleChange = (tag) => setTags(tag)

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container sx={{ flexDirection: { xs: 'column-reverse', md: 'row'}}} justifyContent='space-between' alignItems='stretch' fullWidth spacing={3} 
                    className={classes.gridContainer}
                >
                    <Grid item xs={12} sm={12} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit' elevation={2}>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                onKeyPress={handleKeyPress}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <MuiChipsInput
                                onAddChip={handleAdd}
                                onDeleteChip={handleDelete}
                                value={tags}
                                label="Search Tags"
                                variant="outlined"
                                sx={{margin: '10px 0'}}
                                onChange={handleChange}
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={2}>
                            <Paginate />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home