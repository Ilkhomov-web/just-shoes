import React from "react";
import Marquee from "react-fast-marquee";
import ClientFeedbackCard from "./header/ClientFeedbackCard";
import { Box } from "@mui/material";

const feedbacks = [
  {
    id: 1,
    name: "Александр Иванов",
    feedback: "Очень удобные кроссовки!",
    avatar: "/vercel.svg",
  },
  {
    id: 2,
    name: "Dilnoza Karimova",
    feedback: "Nike sport krossovkalari oldim.",
    avatar: "/vercel.svg",
  },
  {
    id: 3,
    name: "Дмитрий Соколов",
    feedback: "Качество отличное!",
    avatar: "/vercel.svg",
  },
  {
    id: 4,
    name: "Jasur Tursunov",
    feedback: "Adidas krasofkasi oldim.",
    avatar: "/vercel.svg",
  },
  {
    id: 5,
    name: "Мария Петрова",
    feedback: "Белые кроссовки 🔥",
    avatar: "/vercel.svg",
  },
  {
    id: 6,
    name: "Madina Abdullayeva",
    feedback: "Puma yugurish uchun zo‘r.",
    avatar: "/vercel.svg",
  },
  {
    id: 7,
    name: "Николай Морозов",
    feedback: "Дизайн классный!",
    avatar: "/vercel.svg",
  },
  {
    id: 8,
    name: "Shahzoda Ismoilova",
    feedback: "Reebok juda engil.",
    avatar: "/vercel.svg",
  },
  {
    id: 9,
    name: "Светлана Орлова",
    feedback: "Доставка быстрая.",
    avatar: "/vercel.svg",
  },
  {
    id: 10,
    name: "Ulug‘bek Raxmonov",
    feedback: "Jordan super!",
    avatar: "/vercel.svg",
  },
];

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};

const FeedbackMarquee = ({ data, reverse = false }) => {
  return (
    <Marquee
      speed={40}
      gradient={false}
      direction={reverse ? "right" : "left"}
      loop={0} // 0 = infinite
      pauseOnHover={false} // to‘xtamasin
    >
      {data.map((item) => (
        <ClientFeedbackCard key={item.id} item={item} />
      ))}
    </Marquee>
  );
};

export default function FeedbackSection() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <FeedbackMarquee data={feedbacks} />
      <FeedbackMarquee data={shuffleArray(feedbacks)} reverse />
      <FeedbackMarquee data={feedbacks} />
    </Box>
  );
}
