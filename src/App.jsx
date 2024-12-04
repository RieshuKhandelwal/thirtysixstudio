import React, { useEffect, useState, useRef } from 'react'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import { Circ, Expo } from "gsap/all";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => { 
    const locomotiveScroll = new LocomotiveScroll();
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          // Set initial position of growing span to click position
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          // Change body background first
          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
            immediateRender: true // Force immediate render
          });

          // Then animate growing span
          gsap.to(growingSpan.current, {
            backgroundColor: "#fd2c2a",
            scale: 1000,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          // Reset back to black
          gsap.to("body", {
            color: "#fff", 
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
            immediateRender: true
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
    <span ref={growingSpan} className="growing rounded-full inline-block fixed top-[-20px] left-[-20px] w-5 h-5 z-[999]"></span>
    <div className="one w-full relative min-h-screen text-white font-['gilroy']">
      {showCanvas && data[0].map((item,idx)=> (
        <Canvas dets={item} key={idx}/>
      ))}
      <div className='w-full h-screen relative z-[1]'>
        <nav className='w-full px-20 py-8 flex justify-between items-center z-[50]'>
        <div className='brand text-2xl font-bold'>thirtysixstudio</div>
          <div className='links flex gap-12'>
            {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase()}`}
                className='text-lg hover:text-gray-400 transition-colors duration-300'
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
        <div className='w-full px-[15%] py-5 flex justify-between'>
          <div className='w-[50%]'>
            <h3 className='text-3xl font-semibold'>At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.</h3>
            <p className='text-sm mt-4'>We're a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.</p>
            <p className='text-sm mt-4'>Scroll</p>
          </div>
          <div className='w-[30%]'>

          </div>
        </div>
        <div className='w-full absolute left-6 bottom-0'>
          <h1 ref={headingRef} className='text-[11rem] leading-none cursor-pointer'>Thirtysixstudios</h1>
        </div>
      </div>
    </div>
    <div className="two w-full relative min-h-screen text-white pt-32 px-10 font-['gilroy'] z-[2]">
      {showCanvas && data[1].map((item,idx)=> (
          <Canvas dets={item} key={idx}/>
      ))}
      <h1 className="text-6xl tracking-tighter">about the brand</h1>
      <p className="text-2xl leading-[1.3] w-[80%] mt-10 font-light">
        we are a team of designers, developers, and strategists who are
        passionate about creating digital experiences that are both beautiful
        and functional, we are a team of designers, developers, and
        strategists who are passionate about creating digital experiences that
        are both beautiful and functional.
      </p>

      <img
        className="w-[80%] mt-10"
        src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
        alt=""
      />
      
    </div>
  
  </>
)}

export default App
