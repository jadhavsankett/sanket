import React, { useEffect, useRef, useState } from "react";
import './SectionAbout.css'
import hoverSoundFile from "/media/buttonMouseOverHk.wav";
import clickSoundFile from "/media/clickEffectHk.wav";
import { NavLink } from "react-router-dom";

const SectionAbout = () => {
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  const fullText = `> Sanket is a versatile Full-Stack Web Developer with expertise spanning frontend, backend, and emerging AI technologies. Beyond building robust web platforms, he designs and deploys generative AI applications that deliver innovative user experiences. With a blend of software engineering, UI/UX design, and cutting-edge AI integration, Sanket crafts end-to-end solutions that are as scalable as they are impactful.`;

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 30); // typing speed in ms
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);


  /* skills section */
  const devSkills = [
    { src: "./images/React-icon.svg.webp", alt: "React" },
    { src: "./images/nextjs.png", alt: "Next.js" },
    { src: "./images/node-min.webp", alt: "Node.js" },
    { src: "./images/html-min.webp", alt: "HTML" },
    { src: "./images/css-min.webp", alt: "CSS" },
    { src: "./images/js-min.webp", alt: "JavaScript" },
    { src: "./images/mongodb-min.webp", alt: "MongoDB" },
    { src: "./images/express.png", alt: "Express.js" },
    { src: "./images/github-min.webp", alt: "GitHub" },
    { src: "./images/redux.png", alt: "Redux" },
    { src: "./images/barba-min.png", alt: "Barba.js" },
    { src: "./images/gsap-min.webp", alt: "GSAP" },
    { src: "./images/download-min.webp", alt: "Download" },
    { src: "./images/swiper.svg", alt: "Swiper.js" },
    { src: "./images/tailwind.png", alt: "Tailwind CSS" },
  ];

  const designSkills = [
    { src: "./images/canva.png", alt: "Canva" },
    { src: "./images/premierepro-min.png", alt: "Premiere Pro" },
    { src: "./images/figma-min.webp", alt: "Figma", className: "figmaimg" },
  ];


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
    <div className='main-dev'>
      <div className="about-back">
        <div className="first-dev">
          <h1>
            &gt;sanketjadhav<br />
          </h1>
          <p className="a-desc-regular a-text-shadow a-hero-terminal">
            &gt; boot_sequence: web_developer.sanketjadhav<br />
            &gt; user: sanket.jadhav.2x5()<br />
            &gt; role_detected: frontend.backend.uiux.dev<br />
            &gt; permissions_granted: full_stack.development<br />
            &gt; user_profile: ui_ux_designer.frontend_backend.builder
          </p>
        </div>
        <img src="/images/eyes.jpg" alt="" />
        <div className="second-dev">
          <div className="para-container">
            <p className="para">{displayText}</p>
            <span className="cursor">|</span>
          </div>
          <div className="svg-dev">
            <svg
              onMouseEnter={handleMouseEnter}
              onClick={() => { handlePlayPause(); handleClick(); }}
              className={`a-play-btn ${isPlaying ? "rotate" : ""}`}
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M61.6316 31.7368C61.6316 15.2264 48.2472 1.84211 31.7368 1.84211C15.2264 1.84211 1.84211 15.2264 1.84211 31.7368C1.84211 48.2472 15.2264 61.6316 31.7368 61.6316C48.2472 61.6316 61.6316 48.2472 61.6316 31.7368ZM62.4737 31.7368C62.4737 48.7123 48.7123 62.4737 31.7368 62.4737C14.7614 62.4737 1 48.7123 1 31.7368C1 14.7614 14.7614 1 31.7368 1C48.7123 1 62.4737 14.7614 62.4737 31.7368Z"
                fill="#F5FBEF"
              />
              <g>
                <path
                  d="M3.36842 31.5732C3.36844 35.3956 4.10104 39.1799 5.5222 42.7089C6.94336 46.2377 9.02511 49.4412 11.6464 52.1373C14.2676 54.8334 17.3768 56.9695 20.7952 58.426C24.2136 59.8824 27.8761 60.6316 31.5732 60.6316V64C27.4204 64 23.3094 63.1581 19.4753 61.5247C15.6414 59.8912 12.1606 57.4984 9.23109 54.4852C6.30171 51.4721 3.98013 47.8977 2.3972 43.9671C0.814307 40.0365 2.17142e-05 35.825 0 31.5732H3.36842Z"
                  fill="#00FF3C"
                />
                <path
                  d="M31.5732 0C35.8315 2.70085e-05 40.0486 0.839168 43.9827 2.46875C47.9167 4.09834 51.4915 6.48659 54.5025 9.49753C57.5135 12.5086 59.9025 16.0839 61.5321 20.0181C63.1615 23.9521 64 28.1687 64 32.4268H60.6316C60.6316 28.6109 59.8797 24.8322 58.4194 21.3067C56.9591 17.7813 54.8191 14.5774 52.1209 11.8791C49.4226 9.18086 46.2187 7.0409 42.6933 5.58059C39.1678 4.12031 35.3891 3.36845 31.5732 3.36842V0Z"
                  fill="#00FF3C"
                />
              </g>
              <path
                className="a-play-icon-path"
                d="M42.2514 32.1053L24.7486 42.2105L24.7486 22L42.2514 32.1053Z"
                fill="#00FF3C"
              />
              <g className="a-pause-icon-group" style={{ display: isPlaying ? "block" : "none" }}>
                <path d="M30 41H24V23H30V41Z" fill="#00FF3C" />
                <path d="M40 41H34V23H40V41Z" fill="#00FF3C" />
              </g>
            </svg>

            {/* <h1 className="pointer-none">&gt;Play()</h1> */}
            <NavLink to={"/collection"}
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              className="text border p-2 rounded"><h1>&gt;Collection</h1></NavLink>

            {/* Audio element */}
            <audio ref={audioRef} src="/media/sanket.mp3" />
            <audio ref={hoverSoundRef} src={hoverSoundFile} preload="auto" />
            <audio ref={clickSoundRef} src={clickSoundFile} preload="auto" />

          </div>
        </div>
      </div>
      <div className="about-next">
        <section data-scroll-section id="page3">
          <h3>
            Things I'm <span>good</span> at
          </h3>
          <h5>skills, interests, passion and hobbies</h5>

          <div className="box dev-box">
            <h4>development</h4>
            <div className="elem-div">
              {devSkills.map((skill, index) => (
                <img key={index} src={skill.src} alt={skill.alt} />
              ))}
            </div>
          </div>

          <div className="box des-box">
            <h4>designing</h4>
            <div className="elem-div">
              {designSkills.map((skill, index) => (
                <img
                  key={index}
                  src={skill.src}
                  alt={skill.alt}
                  className={skill.className || ""}
                />
              ))}
            </div>
          </div>
          <div className="marquee">
            <div className="marquee-inner">
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
              <span>Sanket Jadhav</span>
            </div>

          </div>
        </section>
      </div>
      <div className="about-best">
        <div className="page2">
          <div className="page2-left">
            <h2>Check-Repo <span>  <a href="https://github.com/jadhavsankett"
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
            > GITHUT!</a>!</span></h2>
            <img
              src="\images\left-side.jpeg.jpg"
              alt=""
            />
            <p>
              <span>Hi! </span>I’m Sanket — a Full Stack Developer and UI/UX Designer who loves turning ideas
              into fast, beautiful, and seamless digital experiences.
            </p>

          </div>
          <div className="page2-right">
            <img
              src="\images\right-side.jpeg.jpg"
              alt=""
            />
            <h1>Reach out through <br />
              <span className="mail">
                <a href="mailto: sanketjadhav9550@gmail.com"
                  onMouseEnter={handleMouseEnter}
                  onClick={handleClick}
                >mail</a>
              {/* </span> or
              <span className="instagram">
                <a href="/"
                  onMouseEnter={handleMouseEnter}
                  onClick={handleClick}
                > instagram</a> */}
              </span> or <span className="linkedin">
                <a href="https://www.linkedin.com/in/sanket2x5/"
                  onMouseEnter={handleMouseEnter}
                  onClick={handleClick}
                > linkedIn</a></span>.
              I’d love to hear from you
            </h1>
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-inner">
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
            <span>created with ❤️ by me</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default SectionAbout
