// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>

//         <button class="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">
//           ...
//         </button>
//         <h1 className="text-3xl font-bold underline">Hello world!</h1>
//         <div className="bg-gray-100 flex justify-center items-center h-screen">
//       <div className="bg-white p-8 rounded shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block font-bold text-gray-700 mb-2" htmlFor="username">Username</label>
//             <input className="border border-gray-300 rounded w-full py-2 px-3" type="text" id="username" name="username" required />
//           </div>
//           <div className="mb-6">
//             <label className="block font-bold text-gray-700 mb-2" htmlFor="password">Password</label>
//             <input className="border border-gray-300 rounded w-full py-2 px-3" type="password" id="password" name="password" required />
//           </div>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// }

// export default App;
// import React, { useState } from 'react';

// function SecondPopup({ closePopup }) {
//   return (
//     <div className="modal">
//       <div className="bg-white p-8 rounded shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Second Popup Content</h2>
//         <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full" onClick={closePopup}>
//           Close Second Popup
//         </button>
//       </div>
//     </div>
//   );
// }

// function FirstPopup({ closePopup }) {
//   const [isSecondPopupOpen, setIsSecondPopupOpen] = useState(false);

//   const openSecondPopup = () => {
//     setIsSecondPopupOpen(true);
//   }

//   const closeSecondPopup = () => {
//     setIsSecondPopupOpen(false);
//   }

//   return (
//     <div className="modal">
//       <div className="bg-white p-8 rounded shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">First Popup Content</h2>
//         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={openSecondPopup}>
//           Open Second Popup
//         </button>
//         {isSecondPopupOpen && <SecondPopup closePopup={closeSecondPopup} />}
//         <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-4" onClick={closePopup}>
//           Close First Popup
//         </button>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [isFirstPopupOpen, setIsFirstPopupOpen] = useState(false);

//   const openFirstPopup = () => {
//     setIsFirstPopupOpen(true);
//   }

//   const closeFirstPopup = () => {
//     setIsFirstPopupOpen(false);
//   }

//   return (
//     <div className="bg-gray-100 h-screen flex justify-center items-center">
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openFirstPopup}>
//         Open First Popup
//       </button>

//       {isFirstPopupOpen && <FirstPopup closePopup={closeFirstPopup} />}
//     </div>
//   );
// }

// export default App;
import React, { useState } from "react";

function Popup({ closePopup, zIndex, children }) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      setOffset({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50"
      style={{ zIndex }}
    >
      <div
        className="bg-white p-8 rounded shadow-lg w-96 relative cursor-move"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Popup</h2>
        {children}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full absolute bottom-4 left-1/2 transform -translate-x-1/2"
          onClick={closePopup}
        >
          Close Popup
        </button>
        <div
          className="w-full h-full absolute top-0 left-0"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </div>
    </div>
  );
}

function App() {
  const [popup1Open, setPopup1Open] = useState(false);
  const [popup2Open, setPopup2Open] = useState(false);

  const openPopup1 = () => {
    setPopup1Open(true);
  };

  const closePopup1 = () => {
    setPopup1Open(false);
  };

  const openPopup2 = () => {
    setPopup2Open(true);
  };

  const closePopup2 = () => {
    setPopup2Open(false);
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openPopup1}
      >
        Open Popup 1
      </button>

      {popup1Open && (
        <Popup closePopup={closePopup1} zIndex={1}>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={openPopup2}
          >
            Open Popup 2
          </button>

          {popup2Open && (
            <Popup closePopup={closePopup2} zIndex={2}>
              <p>This is Popup 2 inside Popup 1.</p>
            </Popup>
          )}
        </Popup>
      )}
    </div>
  );
}

export default App;
