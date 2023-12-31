import React from "react";
import styled from "styled-components";
import Navigator from "./Navigator";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//전체 BOX
const BigBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "BMJUA";
`;

//상단
const EmtyBox = styled.div`
  display: flex;
`;

const EmtyBox2 = styled.div`
  margin-left: 700px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: left;
`;

const Line1 = styled.p`
  font-size: 24px;
  margin: 0px;
  margin-bottom: 5px;
  font-weight: 700;
`;

const Line2 = styled.p`
  font-size: 24px;
  margin: 0px;
  margin-bottom: 17px;
  font-weight: 700;
`;

const Line3 = styled.p`
  font-size: 18px;
  margin: 0px;
  font-weight: 550;
`;

//독후감 목록들
const Articles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 300px;
`;

//독후감 한개 영역
const ArticleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

//프로필 영역
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 45px;
`;

const ProfileImg = styled.img`
  width: 190px;
  height: 170px;
`;

const ProfileNickName = styled.p`
  text-align: center;
  font-size: 17px;
  margin-top: 0px;
  margin-bottom: 7px;
  font-weight: 800;
`;

const ShowLikeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: #e7e7e7;
  border-radius: 50px;
  margin-right: 80px;
  margin-left: 80px;
  height: 27px;
`;

const HeartImg = styled.img`
  height: 15px;
  margin-left: 10px;
`;

const HeartNum = styled.p`
  margin-right: 12px;
  margin-left: 3px;
  font-size: 13px;
  font-weight: 600;
`;

//프로필 영역 옆부분, 독후감 내용 보여지는 곳
const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px 50px 20px;
  width: 800px;
  height: 150px;
`;

const ColBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
`;

const Date = styled.p`
  font-size: 15px;
  font-weight: 600;
`;

const Content = styled.p`
  padding: 30px;
  margin: 0px;
  margin-top: 5px;
`;

const GoToArticle = styled.button`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin-right: 30px;
  margin-top: 40px;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const Img2 = styled.img`
  width: 50px;
  &:hover {
    filter: brightness(0.5);
    transition: 0.7s;
  }
`;

//font 하이라이트
const HighLight1 = styled.span`
  color: #667121;
  font-size: 34px;
`;

const HighLight2 = styled.span`
  color: #667121;
`;

const BookRecommend = () => {
  const activeMenu = "독후감 검색";

  const { op } = useParams();
  const [informs, SetInforms] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    axios.get(`https://mutsabooked.store/bookreviewall/`).then((res) => {
      SetInforms(res.data.filter((e) => e.book_title === op));
    });
  }, []);
  console.log(informs);

  return (
    <>
      <Navigator activeMenu={activeMenu} />
      <BigBox>
        <EmtyBox>
          <TextBox>
            <Line1>
              <HighLight1>아기사자님이</HighLight1>궁금하신
            </Line1>
            <Line2>독후감 정보를 알려드릴게요.</Line2>
            <Line3>
              총<HighLight2>{informs.length}</HighLight2>의 독후감이
              검색되었습니다.
            </Line3>
          </TextBox>
          <EmtyBox2></EmtyBox2>
        </EmtyBox>
        <Articles>
          {informs.map((e) => (
            <>
              <ArticleBox>
                <Profile>
                  <ProfileImg src="/undraw_Drink_coffee_av1x.png" />
                  <ProfileNickName>{e.user}</ProfileNickName>
                  {/* <ShowLikeBox>
                            <HeartImg src="/heart.png" />
                            <HeartNum>{e.like_count}</HeartNum>
                          </ShowLikeBox> */}
                </Profile>

                <ContentBox>
                  <ColBox>
                    <Content>{e.content}</Content>
                  </ColBox>
                  {/* <GoToArticle>
                            <Img2 src="/GrFormNextLink.png" />
                            </GoToArticle> */}
                </ContentBox>
              </ArticleBox>
            </>
          ))}
        </Articles>
      </BigBox>
    </>
  );
};

export default BookRecommend;
