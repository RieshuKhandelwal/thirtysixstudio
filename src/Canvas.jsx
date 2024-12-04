import React, { useEffect,useState, useRef } from 'react'
import canvasImages from './canvasImages'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


function Canvas({dets}) {
    const {startIndex,numImages,duration,size,top,left,zIndex} = dets;
    const [index, setindex] = useState({value:startIndex});
    const canvasRef = useRef(null);

    useGSAP(() => {
        gsap.to(index, {
            value: startIndex + numImages-1, 
            duration: duration,        
            repeat: -1,
            ease: 'linear', 
            onUpdate: () => {
                setindex({value: Math.round(index.value)});   
            }
        });
    });

    useEffect(() => {
        const sale = window.devicePixelRatio;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = canvasImages[index.value];
        image.onload = () => {
            canvas.width = canvas.offsetWidth * sale;
            canvas.height = canvas.offsetHeight * sale;
            canvas.style.width = canvas.offsetWidth + 'px';
            canvas.style.height = canvas.offsetHeight + 'px';
            
            context.scale(sale, sale);
            
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            context.drawImage(image, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        };
    }, [index]);
  return (
    <canvas data-scroll data-scroll-speed={Math.random().toFixed(1)} ref={canvasRef} id='canvas' className='absolute' style={{width:`${size*1.2}px`,height:`${size*1.2}px`, top:`${top}%`,left:`${left}%`,zIndex:`${zIndex}`}}></canvas>
  )
}

export default Canvas
