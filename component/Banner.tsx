"use client";

import styled from "styled-components";

const BannerContainer = styled.div`
  width: 100%;
  height: 40vh;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(to right, #e0e0e0 1px, transparent 1px),
    linear-gradient(to bottom, #e0e0e0 1px, transparent 1px);
  background-size: 50px 50px;
  transform: skew(-10deg);
`;

const Content = styled.div`
  text-align: center;
  color: #333;
  z-index: 1;
  padding: 2rem;
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
`;

const Subheading = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Banner = () => {
  return (
    <BannerContainer>
      <GridBackground />
      <Content>
        <Heading>Check Ongkir Prices Across Indonesia</Heading>
        <Subheading>
          Discover the most competitive shipping rates for all destinations in
          Indonesia. Fast, reliable, and transparent pricing at your fingertips.
        </Subheading>
      </Content>
    </BannerContainer>
  );
};

export default Banner;
