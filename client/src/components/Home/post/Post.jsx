import { Box, Typography, styled, Chip } from '@mui/material';
import { addElipse } from '../../../utils/common-util';

// ✅ FIX 1: Card has consistent height so all cards in a row align properly
const Container = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

// ✅ FIX 2: Fixed height image so all cards are same height regardless of image size
const Image = styled('img')`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
`;

// ✅ FIX 3: Content area grows to fill remaining space
const Content = styled(Box)`
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const CategoryBadge = styled(Typography)`
  font-size: 11px;
  font-weight: 600;
  color: #1976d2;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const Heading = styled(Typography)`
  font-size: 15px;
  font-weight: 700;
  color: #1a237e;
  line-height: 1.3;
  word-break: break-word;
`;

const AuthorText = styled(Typography)`
  font-size: 12px;
  color: #888;
  margin-top: auto;
`;

const DescText = styled(Typography)`
  font-size: 13px;
  color: #555;
  line-height: 1.5;
  word-break: break-word;
`;

const Post = ({ post }) => {
    const url = post.picture
        ? post.picture
        : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    return (
        <Container>
            {/* Post image */}
            <Image src={url} alt={post.title || 'post'} />

            <Content>
                {/* ✅ FIX 4: Category shown as a styled badge, not plain gray text */}
                {post.categories && (
                    <CategoryBadge>{post.categories}</CategoryBadge>
                )}

                {/* Post title */}
                <Heading>{addElipse(post.title, 50)}</Heading>

                {/* Description */}
                {post.description && (
                    <DescText>{addElipse(post.description, 90)}</DescText>
                )}

                {/* ✅ FIX 5: Author pushed to bottom of card */}
                <AuthorText>By {post.username}</AuthorText>
            </Content>
        </Container>
    );
};

export default Post;