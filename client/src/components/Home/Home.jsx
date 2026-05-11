import React from 'react';
import Banner from '../Banner/Banner'; //components
import Category from './category';
import {Grid} from '@mui/material';
import Posts from './post/Posts.jsx';

// <Grid container > is parent grid, lg large screen sm = small screen

const Home =()=>{
    return (
  <>
    <Banner />

    <Grid container>
      
      {/* LEFT SIDE */}
      <Grid item lg={2} sm={2} xs={12}>
        <Category />
      </Grid>

      {/* RIGHT SIDE */}
      <Grid item lg={10} sm={10} xs={12}>
        <Posts />
      </Grid>

    </Grid>
  </>
);
}

export default Home;