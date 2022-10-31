import styled from "styled-components";

interface ProfileImageProps {
  image?: string | null;
  width?: string;
  height?: string;
}

const ProfileImage = ({
  image,
  width = "55px",
  height = "55px",
}: ProfileImageProps) => {
  return <Container id="image" image={image} width={width} height={height} />;
};

export default ProfileImage;

const Container = styled.div<ProfileImageProps>`
  background: #ffe8f5;
  background-image: ${({ image }) =>
    image
      ? `url("/upload/profileImage/${image}")`
      : `url("/upload/profileImage/basicProfile.png")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  height: ${({ height }) => height};
  position: relative;
  width: ${({ width }) => width};
  z-index: 1;
`;
