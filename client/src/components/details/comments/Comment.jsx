import { Box, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { Delete } from "@mui/icons-material";
import { API } from "../../../service/api";

const Component = styled(Box)`
    margin-top: 20px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 10px;
`;

const Comment = ({ comment, setComments, post }) => {
    const { account } = useContext(DataContext);

    const removeComment = async (id) => {
        let response = await API.deleteComment(id);
        if (response.issuccess) {
            const res = await API.getAllComments({ postId: post._id });
            if (res.issuccess) {
                setComments(res.data.data);
            }
        }
    };

    return (
        <Component>
            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography style={{ fontWeight: 600, fontSize: '14px' }}>
                    {comment.name}
                </Typography>
                <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Typography style={{ fontSize: '12px', color: '#999' }}>
                        {new Date(comment.date).toDateString()}
                    </Typography>
                    {comment.name === account.username &&
                        <Delete
                            onClick={() => removeComment(comment._id)}
                            style={{ fontSize: '18px', color: 'red', cursor: 'pointer' }}
                        />
                    }
                </Box>
            </Box>
            <Box>
                <Typography style={{ fontSize: '14px', color: '#444' }}>
                    {comment.comments}
                </Typography>
            </Box>
        </Component>
    );
}

export default Comment;