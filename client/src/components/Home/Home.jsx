import React from 'react';
import Banner from '../Banner/Banner';
import Category from './category';
import { Box, Grid } from '@mui/material';
import Posts from './post/Posts.jsx';

const Home = () => {
    return (
        // ✅ FIX: Added Box wrapper so content starts below the fixed AppBar (64px)
        // Without this, the Banner was hidden under the navbar
        <Box sx={{ marginTop: '0px' }}>
            <Banner />

            <Grid container sx={{ marginTop: '0' }}>

                {/* LEFT SIDE — Category sidebar */}
                <Grid item lg={2} sm={2} xs={12}
                    sx={{
                        borderRight: '1px solid #e0e0e0',
                        minHeight: 'calc(100vh - 50vh - 64px)',
                    }}
                >
                    <Category />
                </Grid>

                {/* RIGHT SIDE — Blog posts grid */}
                <Grid item lg={10} sm={10} xs={12} sx={{ padding: '16px' }}>
                    <Posts />
                </Grid>

            </Grid>
        </Box>
    );
};

export default Home;