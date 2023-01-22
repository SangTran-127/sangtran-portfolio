"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import avatarUrl from "@/assests/images/lap.png";
import AnimatedLetter from "./AnimatedLetter";
import Container from "../layout/Container";
const HeroSection = () => {
  const [letterClass, setLetterClass] = useState<string>("text-animate");
  const nameArray = ["S", "a", "n", "g"];
  const jobArray = [
    "W",
    "e",
    "b",
    " ",
    "D",
    "e",
    "v",
    "e",
    "l",
    "o",
    "p",
    "e",
    "r",
  ];
  function popupLetters() {
    window.setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
  }
  useEffect(() => {
    popupLetters();
  }, []);
  return (
    <section className="pt-4 md:px-16 py-16">
      <Container tailWindClass="max-w-screen-lg md:px-20 mx-auto hero-container md:flex md:justify-between md:items-center px-3">
        <>
          <div className="text-zone text-center min-w-max">
            <div className="mb-3">
              <h1 className="pt-5 hero-title">
                <span className={letterClass}>H</span>
                <span className={`${letterClass} _12`}>i,</span>
                <br />
                <span className={`${letterClass} _13`}>I</span>
                <span className={`${letterClass} _14`}>&apos;m</span>
                <span> </span>
                <AnimatedLetter
                  letterClass={letterClass}
                  idx={15}
                  strArray={nameArray}
                />
                <br />
                <AnimatedLetter
                  letterClass={letterClass}
                  idx={22}
                  strArray={jobArray}
                />
              </h1>
            </div>
            <h2 className="mb-3 text-dracula-light">Welcome to my Portfolio</h2>
            <button className="contact-button">Contact Me &rarr;</button>
          </div>
          <div className="py-5 hidden md:block">
            <Image
              src={avatarUrl}
              alt="avatar"
              // style={{
              //   boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
              //   color: "#282A36",
              //   borderRadius: "50%",
              // }}
              width="400"
            />
          </div>
        </>
      </Container>
    </section>
  );
};

export default HeroSection;
