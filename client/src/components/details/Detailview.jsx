import { Box, Typography, styled } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Edit, Delete } from '@mui/icons-material';
import { API } from "../../service/api";
import { blue, red } from "@mui/material/colors";
import { DataContext } from "../../context/DataProvider";
import  Comments  from "./comments/Comments";

const Container = styled(Box)({   
    margin: '0 auto',
    maxWidth: '900px',
    padding: '20px',
    background: '#ffffff',
    minHeight: '100vh',
});

const Image = styled('img')({
    width: '100%',
    height: '55vh',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    display: 'block',
    margin: '0 auto'
});

const IconBox = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    margin: '16px 0',
});

const Detailview = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();
    const url = post.picture
        ? post.picture
        : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.issuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);


    const deletePost = async () => {
        let response = await API.deletePost(id);
        if (response.issuccess) {
            navigate('/home');
        }



    }


    return (
        <Container>
            <Image src={url} alt="blog" />

            {account?.username === post.username && (
                <IconBox>
                    <Link to={`/update/${post._id}`}>
                        <Edit style={{
                            color: blue[500],
                            cursor: 'pointer',
                            padding: '6px',
                            border: `1px solid ${blue[200]}`,
                            borderRadius: '50%',
                            fontSize: '2rem',
                            transition: '0.2s',
                        }} />
                    </Link>
                    <Delete onClick={() => {
                        deletePost();
                    }} style={{
                        color: red[500],
                        cursor: 'pointer',
                        padding: '6px',
                        border: `1px solid ${red[200]}`,
                        borderRadius: '50%',
                        fontSize: '2rem',
                        transition: '0.2s',
                    }} />
                   
                </IconBox>
            )}

            <Box style={{ padding: '10px 0' }}>
                <Typography variant="h4" style={{
                    color: '#111111',
                    marginBottom: '16px',
                    textAlign: 'center',
                    fontWeight: 700,
                    letterSpacing: '0.5px'
                }}>
                    {post.title}
                </Typography>

                <Typography style={{
                    color: '#444444',
                    marginBottom: '24px',
                    lineHeight: '1.8',
                    fontSize: '1rem'
                }}>
                    {post.description}
                    
                </Typography>

                <Comments post={post} />

                <Box style={{
                    borderTop: '1px solid #eeeeee',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography style={{ color: '#555555', fontWeight: 600 }}>
                        ✍️ {post.username}
                    </Typography>
                    <Typography style={{ color: '#999999', fontSize: '14px' }}>
                        {post.createdDate ? new Date(post.createdDate).toDateString() : ''}
                    </Typography>
                </Box>
            </Box>
            
        </Container>
    );
};

export default Detailview;