import React, { useState } from "react";
import styled from "styled-components";
import data from "./data.js";
import './DiaryPic.css';

function DiaryPic() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(data[0].date);
  const [currentContent, setCurrentContent] = useState(data[0].content);

  const moveToPrevSlide = () => {
    setSlideIndex((prev) => {
      const newIndex = prev === 0 ? data.length - 1 : prev - 1;
      setCurrentDate(data[newIndex].date);
      setCurrentContent(data[newIndex].content);
      return newIndex;
    });
  };

  const moveToNextSlide = () => {
    setSlideIndex((prev) => {
      const newIndex = prev === data.length - 1 ? 0 : prev + 1;
      setCurrentDate(data[newIndex].date);
      setCurrentContent(data[newIndex].content);
      return newIndex;
    });
  };

  const moveDot = (index) => {
    setSlideIndex(index);
    setCurrentDate(data[index].date);
    setCurrentContent(data[index].content);
  };

  return (
    <div className='DiaryPic'>
      <p className='DiaryPicDay'>{currentDate}</p>
      <ThumbnailContainer>
        {data.map((character, index) => (
          <ThumbnailWrapper
            key={character.id}
            className={index === slideIndex ? "active" : ""}
            onClick={() => moveDot(index)}
          >
            <Thumbnail
              src={`/images/${character.thumbnail}`}
              alt={character.content}
            />
          </ThumbnailWrapper>
        ))}
      </ThumbnailContainer>
      <Arrow className="DiaryArrows" direction="prev" onClick={moveToPrevSlide}>
        ◀
      </Arrow>
      <Container>
        <Wrapper slideIndex={slideIndex}>
          {data.map((character) => (
            <Slide key={character.id}>
              <PhotoWrapper>
                <Photo
                  src={`/images/${character.img}`}
                  alt={character.content}
                />
              </PhotoWrapper>
            </Slide>
          ))}
        </Wrapper>
        <span className="DiaryPicContents">{currentContent}</span>
      </Container>
      <Arrow className="DiaryArrows" direction="next" onClick={moveToNextSlide}>
        ▶
      </Arrow>
    </div>
  );
}

export default DiaryPic;

const Container = styled.div`
  width: 500px;
  height: 330px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-family: PretendardR;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(12px);
`;

const Wrapper = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  transition: all 0.3s ease-in-out;
  transform: translateX(${({ slideIndex }) => slideIndex * -100 + "%"});
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoWrapper = styled.div`
  width: 90%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Arrow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 80px;
  left: ${({ direction }) => direction === "prev" && "0px"};
  right: ${({ direction }) => direction === "next" && "0px"};
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
`;

const ThumbnailContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

const ThumbnailWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    width: 55px;
    height: 55px;
    border-radius: 25px;
    background-color: #9E69FA;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`;
