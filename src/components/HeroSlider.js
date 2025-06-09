import React, { useState, useEffect, useRef } from 'react';

const heroSlides = [
  {
    image: 'https://source.unsplash.com/1600x700/?heart,health',
    title: 'Your Heart Health Companion',
    description: 'Empowering you with tools, tips, and technology to protect your heart.',
  },
  {
    image: 'https://source.unsplash.com/1600x700/?doctor,care',
    title: 'Monitor Your Heart Risks',
    description: 'Stay ahead with personalized risk prediction and prevention.',
  },
  {
    image: 'https://source.unsplash.com/1600x700/?fitness,wellness',
    title: 'Live a Heart-Healthy Life',
    description: 'Practical tips and lifestyle changes for a stronger heart.',
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const length = heroSlides.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((current + 1) % length);
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [current, length]);

  return (
    <section className="hero-slider">
      {heroSlides.map(({ image, title, description }, index) => (
        <div
          key={index}
          className={`slide ${index === current ? 'active' : ''}`}
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            position: index === current ? 'relative' : 'absolute',
          }}
        >
          {index === current && (
            <div className="slide-content">
              <h1>{title}</h1>
              <p>{description}</p>
              {/* Removed the button here */}
            </div>
          )}
        </div>
      ))}
      <style>{`
        .hero-slider {
          position: relative;
          height: 70vh;
          max-height: 700px;
          overflow: hidden;
          color: white;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          background-color: #000;
          margin-top: 40px;
        }
        .slide {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
        }
        .slide-content {
          background: rgba(0, 0, 50, 0.5);
          padding: 30px;
          border-radius: 10px;
          max-width: 600px;
        }
        .slide-content h1 {
          font-size: 2.8rem;
          margin-bottom: 1rem;
        }
        .slide-content p {
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 768px) {
          .slide-content h1 {
            font-size: 1.8rem;
          }
          .slide-content p {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSlider;
