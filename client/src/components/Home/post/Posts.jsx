import { useEffect, useState } from 'react';
import { API } from '../../../service/api.js';
import { Box, Grid } from '@mui/material';
import { useSearchParams, Link } from 'react-router-dom';
import Post from './Post.jsx';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            // ✅ Only send category param if it actually exists
            const response = await API.getAllpost(category ? { category } : {});
            console.log("API RESPONSE:", response);

            if (response?.issuccess) {
                setPosts(response.data.data || []);
            }
        };

        fetchData();
    }, [category]);

    return (
        <Grid container spacing={2}>
            {
                posts.length > 0
                ? posts.map((post, index) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                        <Link to={`/details/${post._id}`} style={{ textDecoration: 'none' }}>
                            <Post post={post}/>
                        </Link>
                    </Grid>
                ))
                : <Box>No post available</Box>
            }
        </Grid>
    );
};

export default Posts;