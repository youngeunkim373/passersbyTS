import styled from "styled-components";

interface ProfileImageProps {
  height?: string;
  image?: string | null;
  width?: string;
}

const ProfileImage = ({
  height = "55px",
  image,
  width = "55px",
}: ProfileImageProps) => {
  return <Container height={height} id="image" image={image} width={width} />;
};

export default ProfileImage;

const Container = styled.div<ProfileImageProps>`
  background: #ffe8f5;
  background-image: ${({ image }) =>
    image
      ? `url("https://storage.cloud.google.com/passersby_profile/${encodeURIComponent(
          image
        )}")`
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
