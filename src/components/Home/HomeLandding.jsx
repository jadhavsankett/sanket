import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomeLandding.css';
import hoverSoundFile from "/media/buttonMouseOverHk.wav";
import clickSoundFile from "/media/clickEffectHk.wav";
import bgPopupFile from "/media/alarm.wav";

const HomeLandingWithPreloader = () => {
    const hoverSoundRef = useRef(null);
    const clickSoundRef = useRef(null);
    const bgMusicRef = useRef(null);
    const bgPopupRef = useRef(null);

    const navigate = useNavigate();
    const [preloaderFinished, setPreloaderFinished] = useState(false);
    const [soundOn, setSoundOn] = useState(true);

    // Popup states
    const [showPopup, setShowPopup] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const toggleSound = () => setSoundOn(prev => !prev);

    const handleMouseEnter = () => {
        if (hoverSoundRef.current && soundOn) {
            hoverSoundRef.current.currentTime = 0;
            try { hoverSoundRef.current.play(); } catch { }
        }
    };

    const handleClick = () => {
        if (clickSoundRef.current && soundOn) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play();
        }
    };

    const playPopupSound = () => {
        if (bgPopupRef.current && soundOn) {
            bgPopupRef.current.currentTime = 0;
            bgPopupRef.current.play();
        }
    };

    // Sync mute state whenever soundOn changes
    useEffect(() => {
        if (hoverSoundRef.current) hoverSoundRef.current.muted = !soundOn;
        if (clickSoundRef.current) clickSoundRef.current.muted = !soundOn;
        if (bgMusicRef.current) {
            if (soundOn) {
                bgMusicRef.current.play().catch(() => { });
            } else {
                bgMusicRef.current.pause();
            }
        }
    }, [soundOn]);

    // Preloader + Matrix effect
    useEffect(() => {
        const line1 = "> run sanketJadhav.me";
        const line2 = "> load sanket.core...";

        const el1 = document.querySelector('.a-preloader-run-text');
        const el2 = document.querySelector('.a-preloader-loading-text');
        const percentEl = document.querySelector('.a-preloader-percent');
        const canvas = document.getElementById('matrixCanvas');

        if (!el1 || !el2 || !percentEl || !canvas) return;

        canvas.style.display = "none";

        function typeText(element, text, delay = 80) {
            return new Promise(resolve => {
                let i = 0;
                const interval = setInterval(() => {
                    element.textContent += text[i];
                    i++;
                    if (i >= text.length) {
                        clearInterval(interval);
                        resolve();
                    }
                }, delay);
            });
        }

        function loadingCounter(delay = 30) {
            return new Promise(resolve => {
                let count = 1;
                const interval = setInterval(() => {
                    percentEl.textContent = "..." + count + "%";
                    count++;
                    if (count > 100) {
                        clearInterval(interval);
                        resolve();
                    }
                }, delay);
            });
        }

        const ctx = canvas.getContext('2d');
        const letters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const matrix = letters.split('');
        let fontSize = 16;
        let columns = Math.floor(window.innerWidth / fontSize);
        let drops = Array(columns).fill(1);

        function drawMatrixRain() {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0f0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            requestAnimationFrame(drawMatrixRain);
        }

        function startMatrixRain() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
            drawMatrixRain();
        }

        async function runPreloader() {
            await typeText(el1, line1);
            await new Promise(r => setTimeout(r, 200));
            await typeText(el2, line2);
            await new Promise(r => setTimeout(r, 200));
            await loadingCounter();

            canvas.style.display = "block";
            startMatrixRain();

            setTimeout(() => {
                canvas.style.display = "none";
                setPreloaderFinished(true);

                if (bgMusicRef.current && soundOn) {
                    bgMusicRef.current.play().catch(() => {
                        console.warn("Autoplay blocked. User must click somewhere to start sound.");
                    });
                }
            }, 3000);
        }

        runPreloader();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = Array(columns).fill(1);
        });
    }, [soundOn]);






    // Show popup and auto redirect
    // useEffect(() => {
    //     if (showPopup) {
    //         setCountdown(3);
    //         const interval = setInterval(() => {
    //             setCountdown(prev => {
    //                 if (prev <= 1) {
    //                     clearInterval(interval);
    //                     navigate("/about");
    //                     return 0;
    //                 }
    //                 return prev - 1;
    //             });
    //         }, 1000);
    //         return () => clearInterval(interval);
    //     }
    // }, [showPopup, navigate]);


    useEffect(() => {
        if (showPopup) {
            setCountdown(3);
            const interval = setInterval(() => {
                setCountdown(prev => Math.max(prev - 1, 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [showPopup]);

    // navigate cleanly after countdown hits 0
    useEffect(() => {
        if (countdown === 0 && showPopup) {
            navigate("/about");
        }
    }, [countdown, showPopup, navigate]);
    // End of popup and redirect


    if (!preloaderFinished) {
        return (
            <div className="a-preloader-wrapper">
                <canvas id="matrixCanvas"></canvas>
                <div className="a-preloader-content">
                    <p className="a-preloader-text a-preloader-run-text"></p>
                    <p className="a-preloader-text a-preloader-loading-text"></p>
                    <p className="a-preloader-percent"></p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-dev" id="main-container">
            {/* Left & Right content */}
            <div className="text-dev">
                <div className="left-side">
                    <div id="moving-text">
                        <div className="scroll-container">
                            {/* <!-- First copy of text --> */}
                            <div className="con">
                                <p>
                                    Hi, I’m Sanket Jadhav—a full-stack developer who loves building things that are both beautiful on the outside and powerful on the inside.
                                    I work with the core building blocks of the web—HTML, CSS, and JavaScript—and bring interfaces to life using React with animations powered by GSAP, Framer Motion, and CSS magic.
                                    But I’m not just about making pages look pretty. I also design solid back-end systems with Node.js, Express, and MongoDB to make sure the applications I create are fast, secure, and ready to scale.
                                    From concept to deployment, I enjoy connecting every piece of the puzzle to deliver real, working solutions.
                                </p>
                                <p>
                                    But I’m not just about making pages look pretty. I also design solid back-end systems with Node.js, Express, and MongoDB to make sure the applications I create are fast, secure, and ready to scale.
                                    From concept to deployment, I enjoy connecting every piece of the puzzle to deliver real, working solutions.
                                    Along my journey, I’ve worked on amazing real-life projects—websites and apps that combine clean design, interactive features, and modern functionality.
                                    These projects have given me the chance to experiment with JavaScript libraries, animation frameworks, and AI integrations to make user experiences more intelligent and engaging.
                                </p>
                                <p>
                                    Along my journey, I’ve worked on amazing real-life projects—websites and apps that combine clean design, interactive features, and modern functionality.
                                    These projects have given me the chance to experiment with JavaScript libraries, animation frameworks, and AI integrations to make user experiences more intelligent and engaging.
                                    What I really care about is creating technology that feels alive. A button that responds smoothly when you hover.
                                    A page that flows seamlessly when you scroll. A smart feature that saves someone a few minutes of their day.
                                    I believe these little details turn a regular website into something people remember.
                                </p>
                                <p>
                                    What I really care about is creating technology that feels alive. A button that responds smoothly when you hover.
                                    A page that flows seamlessly when you scroll. A smart feature that saves someone a few minutes of their day.
                                    I believe these little details turn a regular website into something people remember.
                                    Outside of coding, I’m always exploring new tools, frameworks, and creative ideas to push my work further.
                                    Learning never stops in tech, and that’s what makes it exciting.
                                    Every project I take on is a chance to try something new, sharpen my skills, and deliver something I can be proud of.
                                </p>
                                <p>
                                    Outside of coding, I’m always exploring new tools, frameworks, and creative ideas to push my work further.
                                    Learning never stops in tech, and that’s what makes it exciting.
                                    Every project I take on is a chance to try something new, sharpen my skills, and deliver something I can be proud of.
                                    If you’d like to see my work, check out my portfolio and connect with me on my socials—sipitia (LinkedIn, GitHub, Instagram, and more).
                                    I’m always open to collaborating, exchanging ideas, or just talking about how to make the web a better, faster, and more beautiful place.
                                </p>
                                <p>
                                    If you’d like to see my work, check out my portfolio and connect with me on my socials—sipitia (LinkedIn, GitHub, Instagram, and more).
                                    I’m always open to collaborating, exchanging ideas, or just talking about how to make the web a better, faster, and more beautiful place.
                                    Let’s create something meaningful together.
                                </p>
                                <p>
                                    Let’s create something meaningful together.
                                </p>
                            </div>

                             <div className="con">
                                <p>
                                    Hi, I’m Sanket Jadhav—a full-stack developer who loves building things that are both beautiful on the outside and powerful on the inside.
                                    I work with the core building blocks of the web—HTML, CSS, and JavaScript—and bring interfaces to life using React with animations powered by GSAP, Framer Motion, and CSS magic.
                                     </p>
                                <p>
                                    But I’m not just about making pages look pretty. I also design solid back-end systems with Node.js, Express, and MongoDB to make sure the applications I create are fast, secure, and ready to scale.
                                    From concept to deployment, I enjoy connecting every piece of the puzzle to deliver real, working solutions.
                                      </p>
                                <p>
                                    Along my journey, I’ve worked on amazing real-life projects—websites and apps that combine clean design, interactive features, and modern functionality.
                                    These projects have given me the chance to experiment with JavaScript libraries, animation frameworks, and AI integrations to make user experiences more intelligent and engaging.
                                   </p>
                                <p>
                                    What I really care about is creating technology that feels alive. A button that responds smoothly when you hover.
                                    A page that flows seamlessly when you scroll. A smart feature that saves someone a few minutes of their day.
                                    I believe these little details turn a regular website into something people remember.
                                    </p>
                                <p>
                                    Outside of coding, I’m always exploring new tools, frameworks, and creative ideas to push my work further.
                                    Learning never stops in tech, and that’s what makes it exciting.
                                    Every project I take on is a chance to try something new, sharpen my skills, and deliver something I can be proud of.
                                   </p>
                                <p>
                                    If you’d like to see my work, check out my portfolio and connect with me on my socials—sipitia (LinkedIn, GitHub, Instagram, and more).
                                    I’m always open to collaborating, exchanging ideas, or just talking about how to make the web a better, faster, and more beautiful place.
                                    Let’s create something meaningful together.
                                </p>
                                <p>
                                    Let’s create something meaningful together.
                                </p>
                            </div>

                            {/* <!-- Second copy of text for seamless loop --> */}
                            <div className="con">
                                <p>
                                    Hi, I’m Sanket Jadhav—a full-stack developer who loves building things that are both beautiful on the outside and powerful on the inside.
                                    I work with the core building blocks of the web—HTML, CSS, and JavaScript—and bring interfaces to life using React with animations powered by GSAP, Framer Motion, and CSS magic.
                                    But I’m not just about making pages look pretty. I also design solid back-end systems with Node.js, Express, and MongoDB to make sure the applications I create are fast, secure, and ready to scale.
                                    From concept to deployment, I enjoy connecting every piece of the puzzle to deliver real, working solutions.
                                </p>
                                <p>
                                    But I’m not just about making pages look pretty. I also design solid back-end systems with Node.js, Express, and MongoDB to make sure the applications I create are fast, secure, and ready to scale.
                                    From concept to deployment, I enjoy connecting every piece of the puzzle to deliver real, working solutions.
                                    Along my journey, I’ve worked on amazing real-life projects—websites and apps that combine clean design, interactive features, and modern functionality.
                                    These projects have given me the chance to experiment with JavaScript libraries, animation frameworks, and AI integrations to make user experiences more intelligent and engaging.
                                </p>
                                <p>
                                    Along my journey, I’ve worked on amazing real-life projects—websites and apps that combine clean design, interactive features, and modern functionality.
                                    These projects have given me the chance to experiment with JavaScript libraries, animation frameworks, and AI integrations to make user experiences more intelligent and engaging.
                                    What I really care about is creating technology that feels alive. A button that responds smoothly when you hover.
                                    A page that flows seamlessly when you scroll. A smart feature that saves someone a few minutes of their day.
                                    I believe these little details turn a regular website into something people remember.
                                </p>
                                <p>
                                    What I really care about is creating technology that feels alive. A button that responds smoothly when you hover.
                                    A page that flows seamlessly when you scroll. A smart feature that saves someone a few minutes of their day.
                                    I believe these little details turn a regular website into something people remember.
                                    Outside of coding, I’m always exploring new tools, frameworks, and creative ideas to push my work further.
                                    Learning never stops in tech, and that’s what makes it exciting.
                                    Every project I take on is a chance to try something new, sharpen my skills, and deliver something I can be proud of.
                                </p>
                                <p>
                                    Outside of coding, I’m always exploring new tools, frameworks, and creative ideas to push my work further.
                                    Learning never stops in tech, and that’s what makes it exciting.
                                    Every project I take on is a chance to try something new, sharpen my skills, and deliver something I can be proud of.
                                    If you’d like to see my work, check out my portfolio and connect with me on my socials—sipitia (LinkedIn, GitHub, Instagram, and more).
                                    I’m always open to collaborating, exchanging ideas, or just talking about how to make the web a better, faster, and more beautiful place.
                                </p>
                                <p>
                                    If you’d like to see my work, check out my portfolio and connect with me on my socials—sipitia (LinkedIn, GitHub, Instagram, and more).
                                    I’m always open to collaborating, exchanging ideas, or just talking about how to make the web a better, faster, and more beautiful place.
                                    Let’s create something meaningful together.
                                </p>
                                <p>
                                    Let’s create something meaningful together.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="right-side">
                    <div className="top">
                        <h1
                            className="text"
                            onMouseEnter={handleMouseEnter}
                            onClick={() => { handleClick(); setShowPopup(true); playPopupSound(); }}
                            style={{ cursor: "pointer" }}
                        >
                            ./About
                        </h1>
                    </div>
                    <div className="bottom">
                        <h4
                            onMouseEnter={handleMouseEnter}
                            onClick={() => { handleClick(); toggleSound(); }}
                        >
                            {soundOn ? '>sound off' : '> sound on'}
                        </h4>
                        <div className="mt-3 d-flex align-items-center justify-content-center a-hero-btn-wrapper">
                            <a
                                className="a-btn a-p-btn position-relative a-hero-btn d-flex align-items-center justify-content-center"
                                href="/path-to-your-resume.pdf"
                                download
                                onMouseEnter={handleMouseEnter}
                                onClick={handleClick}
                            >
                                <span className="a-btn-border"></span>
                                <span className="a-btn-border"></span>
                                <span className="a-btn-border"></span>
                                <span className="a-btn-border"></span>
                                <span className="a-btn-content">Resume</span>
                            </a>

                            <audio ref={hoverSoundRef} src={hoverSoundFile} preload="auto" />
                            <audio ref={clickSoundRef} src={clickSoundFile} preload="auto" />
                            <audio ref={bgMusicRef} src="/media/sanketjadhav.mp3" preload="auto" loop />
                            <audio ref={bgPopupRef} src={bgPopupFile} preload="auto" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="img-dev">
                {/* <img src="/images/me2.png" alt="" /> */}
            </div>

            {/* Popup modal */}
            {showPopup && (
                <div className="about-popup">
                    <div className="about-popup-frame">
                        <div className="about-popup-header">000.0 10</div>
                        <div className="about-popup-body">
                            <h3>&gt; Check Out the</h3>
                            <h4>&gt; Who the fuck is?./</h4>
                            <p>
                                Thank you for visiting my web.
                                I’d love to <span> connect with you and build something amazing </span> together
                            </p>
                            <p className="countdown"><span>Redirecting in....</span>{countdown}...</p>
                        </div>
                        <div className="about-popup-footer">0 100 1000.0 100 1011</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeLandingWithPreloader;
