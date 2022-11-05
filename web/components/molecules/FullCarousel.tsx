import styled from "styled-components";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

interface FullCarouselProps {
  banners: any[];
}

const FullCarousel = ({ banners }: FullCarouselProps) => {
  return (
    <CenteredCarousel navButtonsAlwaysVisible={true}>
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
