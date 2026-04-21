import React from 'react';
import Banner from '../Banner/Banner'; //components
import Category from './category';
import {Grid} from '@mui/material';

// <Grid container > is parent grid, lg large screen sm = small screen

const Home =()=>{
    return (
        <>
            <Banner />
            <Grid container> 
                    <Grid item lg={2} sm={2} xs={12}>
                    <Category />
            </Grid>
                <Grid container item ls={12} sm={10} xs={10}>
                              Posts
                </Grid>
            </Grid>
        </>
    )
}

export default Home;