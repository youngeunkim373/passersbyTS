import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

interface FullCarouselProps {
  banners: any[];
  height?: string;
}

const FullCarousel = ({ banners, height }: FullCarouselProps) => {
  return (
    <CenteredCarousel height={height} navButtonsAlwaysVisible={true}>
      {banners.map((banner, idx) => (
        <BannerPaper key={idx}>{banner}</BannerPaper>
      ))}
    </CenteredCarousel>
  );
};

export default FullCarousel;

const BannerPaper = styled(Paper)`
  background: transparent;
  height: 340px;
`;

const CenteredCarousel = styled(Carousel)`
  .MuiPaper-root {
    box-shadow: none;
    display: flex;
    height: ${({ height }) => (height ? height : "auto")};
    justify-content: center;
    align-items: center;
  }
  .css-1m9128y {
    margin: 0px;
  }
`;
