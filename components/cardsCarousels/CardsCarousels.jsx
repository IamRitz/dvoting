import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  ReactImg,
  VueImg,
  AngularImg,
} from "@coreui/react";
import CandidateCard from "../candidateCard/CandidateCard";
import ReactSimplyCarousel from "react-simply-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// function CardsCarousels({ data }) {
//   return (
//     <Carousel centerMode={true} centerSlidePercentage={30}>
// {data.map((candidate, i) => (
//   <div>
//     <CandidateCard key={i + 1} />
//     <img src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png" />
//   </div>
// ))}
//     </Carousel>
//   );
// }

function CardsCarousels({ data }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ width: "400px" }}>
      <Slider {...settings}>
        {data.map((candidate, i) => {
          return (
            <CandidateCard
              key={i + 1}
              name={candidate.name}
              age={candidate.age}
              url={candidate.url}
              moto={candidate.moto}
              candidateId={candidate.candidateId}
              candidateAddress={candidate.candidateAddress}
            />
          );
        })}
        {/* <CandidateCard name={"Ritesh"} /> */}
      </Slider>
    </div>
  );
}
export default CardsCarousels;
