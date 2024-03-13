import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { PiTelevisionSimpleFill } from "react-icons/pi";


function Preloader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const counter = setInterval(() => {
      if (count < 30) {
        setCount(count + 1);
      }
    }, 40);

    return () => clearInterval(counter);
  }, [count]);

  useEffect(() => {
    gsap.to('.preloader', 2, {
      delay: 3,
      y: "-100%",
      ease: "power1.out"
    });
  }, []);

  return (
    <div className="preloader h-full w-full absolute bg-[#1F1E24] z-50">
      <div className="counter absolute text-white top-[45%] left-[50%] transform translate-x-[-50%] translate-y-[50%] text-4xl font-semibold flex items- gap-2"><PiTelevisionSimpleFill className='text-[#6556CD] h-10 w-10' />
  Mx Player</div>
    </div>
  );
}

export default Preloader;