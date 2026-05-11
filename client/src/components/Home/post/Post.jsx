import { Box, Typography, styled } from '@mui/material';

import { addElipse } from '../../../utils/common-util';

const Container = styled(Box)`
    border: 1px solid #d3ced2;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    background: #fff;
`;

const Image = styled('img')({
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '5px'
});

const Text = styled(Typography)`
    font-size: 14px;
    color: #878787;
    word-break: break-word;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600; 
    
`;

const Post = ({ post }) => {

    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    return (
        <Container>
            <Image src={url} alt="post" />

            <Text>{post.categories}</Text>

            <Heading>{addElipse(post.title, 50)}</Heading>

            <Text>{post.username}</Text>

            <Text>{addElipse(post.description, 100)}</Text>
        </Container>
    );
};

export default Post;