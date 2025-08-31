import React, { useRef, useState } from "react";
import './ProCollection.css'
import hoverSoundFile from "/media/playBtnHoverHk.wav";
import clickSoundFile from "/media/projectsClickHk.wav";
import PipBoyUI from "./PipBoyUI";
import PlayGround from "./PlayGround";

/* card info */
const cards = [
  {
    codeTop: "000.011",
    title: ["NohaTalk", "Conversational AI", "Reimagined."],
    subtitle: "Full-stack ChatGPT Clone",
    codeBottom: "0100 1000.0 100 101!",
    details: "A fast, friendly, and capable AI—built to draft, summarize, brainstorm, and answer questions in seconds. Designed for teams and creators who want ChatGPT-like power with a clean, modern experience..",
    link:'https://chat-gpt-h08n.onrender.com',
    iconType: "swirl"
  },
  {
    codeTop: "000.021",
    title: ["Moody Player", "Scan-face", "Play Song."],
    subtitle: "Mood-based Music Player",
    details: "A music player that adapts to your mood, creating the perfect playlist for any situation. Whether you're feeling happy, sad, or anything in between, Moody Player has got you covered.",
    link:'https://github.com/jadhavsankett/moody-player.git',
    codeBottom: "1100 0110.0 010 111!",
    iconType: "hex"
  },
  {
    codeTop: "000.031",
    title: ["Reimagined", "you-tube", "Engine."],
    subtitle: "on YouTube Data API v3",
    details: "A fast, modern YouTube clone powered by the YouTube Data API v3. Search videos, view details, and watch instantly with a clean React UI.",
    link:'https://youtube-api-gray-one.vercel.app',
    codeBottom: "1010 1110.1 000 011!",
    iconType: "pulse"
  },
  {
    codeTop: "000.041",
    title: ["Beauty Brand", "Kylie Cosmetics", "Showcase."],
    subtitle: "A Modern Digital Beauty",
    details: 'This project is a fully responsive, Kylie Jenner–inspired cosmetics website, designed and built during a hackathon organized by Sheryians Coding School. The goal was to re-imagine how a high-profile beauty brand could present products online with speed, elegance, and a premium feel — all within the tight time constraints of a live coding challenge.',
    link: 'https://kylie-cosmetics-pj19-dfj5npxm1-sankets-projects-4fc19544.vercel.app/',
    codeBottom: "1001 0101.1 001 001!",
    iconType: "ring"
  },
  {
    codeTop: "000.051",
    title: ["Neon", "Triangle", "Scanner."],
    subtitle: "Geometric Visualizer",
    codeBottom: "1110 0101.0 111 000!",
    iconType: "cube"
  },
  {
    codeTop: "000.061",
    title: ["Precision", "Targeting", "Module."],
    subtitle: "AI-Powered Guidance System",
    codeBottom: "0111 1010.1 010 110!",
    iconType: "crosshair"
  },
  {
    codeTop: "000.071",
    title: ["Precision", "Targeting", "Module."],
    subtitle: "AI-Integrated Auto System",
    codeBottom: "0111 1010.1 010 110!",
    iconType: "square"
  },
  {
    codeTop: "000.081",
    title: ["Precision", "Targeting", "Zara."],
    subtitle: "E-Com Clothing Brand",
    codeBottom: "0111 1010.1 010 110!",
    iconType: "pentagon"
  }
];

const ProCollection = () => {
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const [openCard, setOpenCard] = useState(null);


     // Mouse hover / click sounds
    const handleMouseEnter = () => {
        if (hoverSoundRef.current) {
            hoverSoundRef.current.currentTime = 0;
            try { hoverSoundRef.current.play(); } catch { }
        }
    };
    const handleClick = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play();
        }
    };


  return (
    <div className="pro-dev">
      <div className="pro-collection">

        <div className="titles-dev">
          <h1>&gt;Pixel to Query</h1>
          <p>&gt;highlighting end-to-end work.</p>
        </div>

        {/* Card Grid */}
      <div className="grid-container">
        {cards.map((card, i) => (        
          <div
            key={i}                             
            className="card-border"
            onClick={() => {setOpenCard(card) , handleClick()} }  // open modal
            style={{ cursor: "pointer" }}
                        onMouseEnter={handleMouseEnter}
          >
            <div className="card-grid">
              <div className="card-icon">
                <div className={card.iconType}></div>
              </div>
              <div className="card-text">
                <div className="top-code">{card.codeTop}</div>
                <h2>
                  {card.title.map((line, idx) => (
                    <React.Fragment key={idx}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h2>
                <p>{card.subtitle}</p>
                <div className="bottom-code">{card.codeBottom}</div>
              </div>
            </div>
             {/* Audio elements (hidden) */}
                                        <audio ref={hoverSoundRef} src={hoverSoundFile} preload="auto" />
                                        <audio ref={clickSoundRef} src={clickSoundFile} preload="auto" />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {openCard && (
        <div className="modal-overlay">
          <div className="modal-card">
            <span className="close-btn" onClick={() => {setOpenCard(null), handleClick()}} 
              onMouseEnter={handleMouseEnter}
              >
              ✕
            </span>
            <div className="modal-grid">
              <div className="modal-left">
                <div className="top-code">{openCard.codeTop}</div>
                <h2>{openCard.title.join(" ")}</h2>
                <p className="subtitle">{openCard.subtitle}</p>
                <p className="details">{openCard.details || "No extra details provided."}</p>
                <h1 className="border-l-8 px-2"><a href={openCard.link}
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
                >check Out</a></h1>
              </div>
              <div className="modal-right">
                <div className={`${openCard.iconType} big`}></div>
                <div className="bottom-code">{openCard.codeBottom}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <PipBoyUI/>   
      <PlayGround/>
      </div>
    </div>
  )
}

export default ProCollection
