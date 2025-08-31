
export default function page404() {
  const longGlitchText = Array(1000).fill("PAGE NOT EXIST").join(" ");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono overflow-hidden relative">
      {/* Scrolling background text */}
      <div className="glitch-bg absolute top-0 left-0 w-full h-full whitespace-nowrap opacity-20">
        {longGlitchText}
      </div>
  
      {/* Main content */}
      <h1 className="text-6xl font-bold tracking-widest mb-4 glitch-text z-10">
        404 PAGE NOT FOUND
      </h1>

      <div className="glitch-bg absolute top-0 left-0 w-full h-full whitespace-nowrap opacity-20">
        {longGlitchText}
      </div>
  

    </div>
  );
}
