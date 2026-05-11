import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { API } from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";
import Comment from "./Comment";

const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
    margin-top: 20px;
    border-top: 1px solid #eeeeee;
    padding-top: 20px;
`;

const StyledTextarea = styled(TextareaAutosize)`
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #ccc;
    resize: vertical;
    font-family: inherit;
    outline: none;
    &:focus {
        border-color: #1976d2;
    }
`;

const initialValue = {
    name: '',
    postId: '',
    comments: '',
    date: new Date(),
};

export const Comments = ({ post }) => {
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const { account } = useContext(DataContext);

    const url = 'https://static.thenounproject.com/png/12017-200.png';

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments({ postId: post._id });
            if (response.issuccess) {
                setComments(response.data.data);  // ✅ fixed
            }
        };
        getData();
    }, [post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value,
            date: new Date(),
        });
    };

    const addComment = async (e) => {
        e.preventDefault();
        await API.newComment(comment);
        setComment(initialValue);
        const response = await API.getAllComments({ postId: post._id });
        if (response.issuccess) {
            setComments(response.data.data);  // ✅ fixed
        }
    };

    return (
        <Box style={{ padding: '0 20px' }}>

            {/* Input row */}
            <Container>
                <img
                    src={url}
                    alt="dp"
                    style={{ width: 40, height: 40, borderRadius: '50%', marginTop: 8 }}
                />
                <Box style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 8 }}>
                    <StyledTextarea
                        minRows={3}
                        placeholder="What's on your mind?"
                        value={comment.comments}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        style={{ height: 40, alignSelf: 'flex-end' }}
                        onClick={(e) => addComment(e)}
                    >
                        Post
                    </Button>
                </Box>
            </Container>

            {/* Comments list */}
            <Box style={{ marginTop: 20 }}>
               {comments && comments.length > 0 && comments.map((comment, i) => (
                 <Comment key={i} comment={comment} setComments={setComments} post={post} />
               ))}
            </Box>

        </Box>
    );
};

export default Comments;