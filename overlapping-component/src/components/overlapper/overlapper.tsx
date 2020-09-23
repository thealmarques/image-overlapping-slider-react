import React, { useState } from 'react'
import './overlapper.scss';
import baseImage from '../../assets/images/base.jpg';
import topImage from '../../assets/images/top.jpg';

export const Overlapper = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  return (
    <div className="overlapper">
      <div className="overlapper__container" onMouseDown={
        (event: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: HTMLInputElement }) => {
          const targetElement: HTMLElement = event.target;
          if (targetElement.classList.contains('overlapper__container__resizer')) {
            setDragging(true);
          }
        }} onMouseUp={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          setDragging(false);
        }} onMouseMove={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (dragging) {
            // Bar
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
        }} onMouseLeave={() => {
          setDragging(false);
        }}>
        <img className="overlapper__container__base-image" src={baseImage} alt="Base" />
        <img className="overlapper__container__top-image" src={topImage} alt="Base" />
        <span className="overlapper__container__resizer"></span>
      </div>
    </div>
  )
}
