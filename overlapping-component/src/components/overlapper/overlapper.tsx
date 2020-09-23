import React, { useState } from 'react'
import './overlapper.scss';
import baseImage from '../../assets/images/base.jpg';
import topImage from '../../assets/images/top.jpg';

export const Overlapper = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: HTMLInputElement }) => {
    const targetElement: HTMLElement = event.target;
    if (targetElement.classList.contains('overlapper__container__resizer')) {
      setDragging(true);
    }
  }
  
  const onMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (dragging) {
      const resizer: HTMLElement | null = document.querySelector('.overlapper__container__resizer');
      const topImage: HTMLElement | null = document.querySelector('.overlapper__container__top-image');
      if (resizer && topImage) {
        const distance = event.clientX - resizer.getBoundingClientRect().x;
        topImage.style.clipPath = `inset(0 0 0 ${resizer.offsetLeft + distance}px)`;

        if (resizer.parentElement && resizer.offsetLeft + distance < resizer.parentElement.clientWidth) {
          resizer.style.left = `${resizer.offsetLeft + distance}px`;
        } else if (resizer.offsetLeft < 4) {
          resizer.style.left = `0px`;
        }
      }
    }
  }

  const onRelease = () => {
    setDragging(false);
  }

  return (
    <div className="overlapper">
      <div className="overlapper__container" onMouseDown={onClick} onMouseUp={onRelease} onMouseMove={onMove} onMouseLeave={onRelease}>
        <img draggable={false} className="overlapper__container__base-image" src={baseImage} alt="Base" />
        <img draggable={false} className="overlapper__container__top-image" src={topImage} alt="Base" />
        <div className="overlapper__container__resizer"></div>
      </div>
    </div>
  )
}
