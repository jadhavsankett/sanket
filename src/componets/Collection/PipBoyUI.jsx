import React, { useRef, useState } from "react";
import "./PipBoyUI.css";
import clickSoundFile from "/media/playBtnHoverHk.wav";

export default function PipBoyUI() {
    const clickSoundRef = useRef(null);

    const stats = [
        { name: "Sundown-c", value: 2, url: "https://jadhavsankett.github.io/Sundown-c/" },
        { name: "Digitally Crafted", value: 4, url: " https://jadhavsankett.github.io/GOOD-clothes/" },
        { name: "Branding-Agency", value: 6, url: "https://jadhavsankett.github.io/-Branding-Agency/" },
        { name: "biotech-clone", value: 8, url: "https://jadhavsankett.github.io/biotech-clone/" },
        { name: "cultural", value: 10, url: "https://jadhavsankett.github.io/cultural---CLONE/" },
        { name: "landing", value: 12, url: " https://jadhavsankett.github.io/animated-landing-page/" },
        { name: "ZARA", value: 14, url: "https://jadhavsankett.github.io/ZARA-landing-page/" },
        { name: "Notion Like Notes", value: 16, url: "https://jadhavsankett.github.io/Notion-Like-Notes-App/" },
        { name: "github profiles", value: 18, url: "https://jadhavsankett.github.io/github-profiles/" },
        { name: "Productvity-dasbord", value: 20, url: "https://jadhavsankett.github.io/productvity-dasbord/" },
        { name: "Snake paly", value: 22, url: "https://jadhavsankett.github.io/Snake/" },
        { name: "MIRANDA", value: 24, url: "https://jadhavsankett.github.io/MIRANDA/" },
    ];

    const [selectedIndex, setSelectedIndex] = useState(1); // default Perception
      const [redMode, setRedMode] = useState(false);


    const handleClick = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play();
        }
    };


    return (
        <div className={`pipboy ${redMode ? 'red' : ''}`}>
            {/* Left side */}
            <div className="stats-panel">
                <h2>WATCH MY MORE ARTWORK.</h2>
                <p className="mode">DEMO MODE</p>

                <div className="stats-list-wrapper">
                    <div
                        className="highlight-slider"
                        style={{ top: `${selectedIndex * 40}px` }}
                    />
                    <ul className="stats-list">
                        {stats.map((stat, index) => (
                            <li
                                key={stat.name}
                                onClick={() => setSelectedIndex(index)}
                                className={selectedIndex === index ? "active" : ""}
                            >
                                <a
                                    href={stat.url}
                                    style={{ color: 'inherit', textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                    onClick={(e) => {
                                        e.stopPropagation(), handleClick() // Prevent li click interfering
                                    }}
                                >
                                    {stat.name} <span>{stat.value}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right side */}
            <div className="right-panel">
                <div className="vaultboy-box">
                    <img src="/images/eyes2.jpg" alt="" />
                </div>
                <p className="description">
                    {stats[selectedIndex].name} A star formed from code, where each line 
                    builds the art bit by bit — a symbol of learning and creating step by step.
                </p>
            </div>

            {/* Bottom bar */}
            <div className="bottom-bar">
                <div className="hp">FEB 003/025</div>
                <div className="level">
                    LODDING
                    <div className="level-bar"><div className="fill"></div></div>
                </div>
                <div className="border-b px-2 py-1 rounded cursor-pointer"
                onClick={() => {setRedMode(!redMode), handleClick()}}
                >&gt;&gt; ReNdEr</div>
                <div className="ap">2X5 10/05</div>
            </div>

            
            <audio ref={clickSoundRef} src={clickSoundFile} preload="auto" />
        </div>
    );
}


