import { Box, Typography, styled } from '@mui/material';

// ✅ FIX 1: Banner height is reasonable — was 50vh which pushed content too far down
// background-size changed from "55% repeat-x" to "cover" so it fills cleanly
const Image = styled(Box)`
  background: url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg') center / cover no-repeat #000;
  width: 100%;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  /* ✅ FIX 2: Dark overlay so text is always readable over the photo */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }
`;

const Heading = styled(Typography)`
  font-size: 64px;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 10px;
  line-height: 1;
  position: relative;   /* sits above the overlay */
  z-index: 1;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
`;

const SubHeading = styled(Typography)`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 2px;
  position: relative;
  z-index: 1;
  margin-top: 8px;
`;

const Banner = () => {
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Code for Interview</SubHeading>
        </Image>
    );
};

export default Banner;