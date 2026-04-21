import {Box, FormControl, styled, InputBase,Button, TextareaAutosize} from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useLocation } from 'react-router-dom';
import { DataContext} from '../../context/DataProvider';
import { API } from '../../service/api';

const Container = styled(Box) ({
    margin: '50px 100px',

})

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)({
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row',
});

const InputTextField = styled(InputBase)({
    flex: 1,
    margin: '0 30px',
    objectfit: 'cover',

});

const Textarea= styled(TextareaAutosize)({
    width: '100%',
    marginTop: 50,
    fontSize: 18,
    border: 'none',
    '&:focus-visible': {
        outline: 'none',
    }
    

});

const InitialPost = {
    title: '',
    description: '',
    picture: '',
    username:'',
    categories: '',
    createddate: new Date()
}

const CreatePost = () => {

    const [post, setPost] = useState(InitialPost);
    const [file, setFile] = useState(null);

    const { account } = useContext(DataContext);
    const location = useLocation();

    const url = post.picture || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b";

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);

                setPost(prev => ({
                    ...prev,
                    picture: response.data
                }));
            }
        };

        getImage();
    }, [file]);

    useEffect(() => {
        setPost(prev => ({
            ...prev,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [location.search, account.username]);

    const handleChange = (e) => {
        setPost(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <Container>
            <Image src={url} alt="banner" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <AddCircleIcon fontSize="large" color="action" />
                </label>

                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <InputTextField
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <Button variant="contained">Publish</Button>
            </StyledFormControl>

            <Textarea
                name="description"
                value={post.description}
                onChange={handleChange}
                placeholder="Write your post here..."
                minRows={5}
            />
        </Container>
    );
};

export default CreatePost;