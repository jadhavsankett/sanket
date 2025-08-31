import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './PlayGround.css'
import clickSoundFile from "/media/projectsClickHk.wav";

export default function PlayGround() {
    const clickSoundRef = useRef(null);
    const [open, setOpen] = useState(false);

    // Five example bounding boxes with larger size and outfit images
    const boxes = [
        { id: "1", x: "18%", y: "12%", w: "30%", h: "25%", label: "ERROR$", image: "/images/error.png", line: { x: "5%", y: "5%" } },
        { id: "2", x: "20%", y: "15%", w: "60%", h: "30%", label: ">>Codee", image: "/images/code.png", line: { x: "75%", y: "20%" } },
        { id: "3", x: "25%", y: "60%", w: "30%", h: "25%", label: "EDITOR", image: "/images/editor.png", line: { x: "10%", y: "68%" } },
        { id: "4", x: "60%", y: "78%", w: "50%", h: "20%", label: "@PrAcTiCe", image: "/images/practice.png", line: { x: "30%", y: "40%" } },
        { id: "5", x: "42%", y: "42%", w: "40%", h: "20%", label: "%@LoGiC", image: "/images/logic.png", line: { x: "82%", y: "65%" } }
    ];


    const handleClick = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play();
        }
    };


    return (
        <div className="relative w-full h-screen flex justify-center items-center">
            <img
                src="/images/GOT.jpg"
                alt="Detected Person"
                className="max-h-full max-w-full cursor-pointer"
                onClick={() => {setOpen(!open), handleClick()}}
            />

            {/* Top info box */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="battle absolute top-4 left-1/2 -translate-x-1/2 border-2  bg-black/80 text-lime-400 text-base p-4 rounded font-bold"
                    >
                        $&gt;Battleground
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="play absolute left-40  -translate-x-1/2 border-2 border-lime-500 bg-black/80 text-lime-400 text-base p-4 rounded font-black"
                    >
                        &gt;&gt; Try to Win The Game
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom description box */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 border-2 border-lime-500 bg-black/80 text-lime-400 text-sm p-4 rounded max-w-lg font-black"
                    >
                        Here is building and better the day by day practice to try to win and ready to next level
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lines from bounding boxes */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <AnimatePresence>
                    {open && boxes.map((box) => (
                        <motion.line
                            key={`line-${box.id}`}
                            x1={`calc(${box.x} + ${box.w} / 2)`}
                            y1={`calc(${box.y} + ${box.h} / 2)`}
                            x2={box.line.x}
                            y2={box.line.y}
                            stroke="lime"
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            exit={{ pathLength: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    ))}
                </AnimatePresence>
            </svg>

            {/* Callouts with outfit images */}
            <AnimatePresence>
                {open && boxes.map((box) => (
                    <motion.div
                        key={box.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        className="absolute border-2 border-lime-500 bg-black/70 text-lime-400 text-xs p-2 rounded max-w-[150px]"
                        style={{ left: box.line.x, top: box.line.y }}
                    >
                        <div className="mb-1 font-bold">{box.label}</div>
                        <img src={box.image} alt={box.label} className="rounded w-full h-auto" />
                    </motion.div>
                ))}
            </AnimatePresence>

            <audio ref={clickSoundRef} src={clickSoundFile} preload="auto" />
        </div>
    );
}

