import "./App.css";
// import loading2 from "../public/loading2.gif"
import loading2 from "/loading2.gif";

import { useState, useRef } from "react";

function App() {
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState(70);
  const [size, setSize] = useState(26);
  const [gif, setGif] = useState(0);

  const YesRef = useRef(null);

  const [clickCount, setClickCount] = useState(0);
  const MAX_CLICK = 3;

  const clickHook = () => {
    setGif(1);
    if (clickCount >= MAX_CLICK) return;
    setClickCount((prev) => prev + 1);
    setWidth((prev) => prev + 100);
    setHeight((prev) => prev + 20);
    setSize((prev) => prev + 20);
  };

  const yesClick = () => {
    setGif(3);
    setTimeout(() => {
      setGif(2);
    }, 4000);
  };

  const [noPosition, setNoPosition] = useState(null);
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (clickCount < MAX_CLICK) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      (e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2,
    );

    if (distance < 100) {
      const parentRect =
        buttonRef.current.parentElement.getBoundingClientRect();

      const maxX = parentRect.width - rect.width;
      const maxY = parentRect.height - rect.height;

      setNoPosition({
        x: Math.random() * maxX,
        y: Math.random() * maxY,
      });
    }
  };

  return (
    <div className="pagescontainer w-full h-[110vh] ">
      <div className="upperpages w-full flex flex-col h-2/3">
        <div className="imagesbox w-full flex justify-center items-center h-full">
          <img
            src="https://media.tenor.com/JCisrg4T5-wAAAAi/happy-valentines-day-valentines-day.gif"
            className={`w-full h-full object-contain ${gif === 0 ? "block" : "hidden"} `}
            alt="valentine"
          ></img>

          <img
            src="https://media1.tenor.com/m/zDChDUnpKpAAAAAd/yellow-dragon-nailong.gif"
            alt="Yellow Dragon"
            className={`w-full h-full object-contain ${gif === 1 ? "block" : "hidden"} `}
          />

          <img
            src="https://media.tenor.com/Zrr4L_Wd4JkAAAAi/bubu-rub-bubu-love-dudu.gif"
            alt="Yellow Dragon"
            className={`w-full h-full object-contain ${gif === 2 ? "block" : "hidden"} `}
          />

          <img
            src={loading2}
            alt="Yellow Dragon"
            className={`w-full h-full object-contain ${gif === 3 ? "block" : "hidden"} `}
          />
        </div>
        <div className="textboxed pt-2 mb-2 z-10">
          <h1
            className={`text-5xl font-semibold ${gif != 2 ? "block" : "hidden"}`}
          >
            Do You Love Me?
          </h1>
          <h1
            className={`text-5xl font-semibold ${gif === 2 ? "block" : "hidden"}`}
          >
            I Knew It...Selamat Hari Valentine Sayang 🥰
          </h1>
        </div>
      </div>
      <div
        onMouseMove={handleMouseMove}
        className="bottompages relative flex justify-center items-center gap-10 w-full h-1/3"
      >
        <button
          ref={YesRef}
          className="w-[250px] h-[70px] bg-pink-400 hover:bg-pink-500 text-white border-0 rounded-2xl text-2xl font-bold cursor-pointer transition-all duration-300 shadow-lg"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            fontSize: `${size}px`,
          }}
          onClick={() => yesClick()}
        >
          YES
        </button>
        <button
          ref={buttonRef}
          onClick={clickHook}
          style={
            noPosition
              ? {
                  position: "absolute",
                  left: noPosition.x,
                  top: noPosition.y,
                }
              : {}
          }
          className="w-[250px] h-[70px] z-20 bg-rose-200 hover:bg-rose-300 text-rose-700 border-0 rounded-2xl text-2xl font-bold cursor-pointer transition-all duration-300 shadow-md"
        >
          NO
        </button>
      </div>
      {/* <div className="parent">
        <div className="div1"> </div>
        <div className="div2"> </div>
        <div className="div3"> </div>
      </div> */}
    </div>
  );
}

export default App;
