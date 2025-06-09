import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import HeroSlider from './HeroSlider';

const Home = () => {
  const sectionsRef = useRef([]);
  const [visibleSections, setVisibleSections] = useState({});

  // Existing IntersectionObserver useEffect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [target.id]: true }));
            observer.unobserve(target);
          }
        });
      }, 
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // NEW: Scroll smoothly to section on page load if URL has a hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Timeout ensures DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      {/* Single Hero Section */}
      <section
        className={`hero ${visibleSections.hero ? 'animate' : ''}`}
        id="hero"
        ref={el => (sectionsRef.current[0] = el)}
      >
        <h1>Your Heart Health Companion</h1>
        <p>Empowering you with tools, tips, and technology to protect your heart.</p>
        <div className="hero-buttons">
          <button onClick={() => window.location.href = "/predict"}>
            Start Risk Prediction
          </button>
        </div>
      </section>

      {/* Your new slider below the hero */}
      <HeroSlider />

      {/* Other sections */}
      {[
        { id: "risk", title: "Risks", alt: true, content: [
          "Heart disease remains one of the leading causes of death globally. Identifying the risks early can lead to better prevention and care. From lifestyle choices to genetic predispositions, it’s important to stay informed."
        ],
        tips: [
          "High blood pressure, also called hypertension, damages arteries over time.",
          "High cholesterol levels can cause buildup of plaque in blood vessels.",
          "Smoking greatly increases your chance of heart attacks and stroke.",
          "Obesity contributes to a host of cardiovascular complications.",
          "Uncontrolled diabetes can damage nerves and blood vessels of the heart.",
          "Prolonged stress affects your heart rate and blood pressure.",
          "A sedentary lifestyle weakens your heart muscle over time.",
          "Family history plays a significant role in your overall heart risk."
        ]},
        { id: "prevention", title: "Prevention", alt: false, content: [
          "Preventing heart disease begins with smart, consistent lifestyle decisions. From dietary choices to stress management, small changes can make a big impact."
        ],
        tips: [
          "Choose a heart-healthy diet rich in vegetables, fruits, and whole grains.",
          "Exercise regularly — even brisk walking for 30 minutes can help.",
          "Monitor your cholesterol and blood pressure through regular checkups.",
          "Manage stress through activities like yoga, journaling, or deep breathing.",
          "Get 7–8 hours of quality sleep each night to allow heart recovery.",
          "Stay away from trans fats and highly processed foods.",
          "Reduce salt and sugar intake — especially from packaged snacks.",
          "Quit smoking and limit alcohol intake to protect your heart health."
        ]},
        { id: "predict", title: "Predict", alt: true, content: [
          "Predicting heart disease risk helps in early detection and better planning. Our simple, intuitive tool uses your personal information to estimate your risk profile in just a few steps."
        ],
        tips: [
          "Enter your age, gender, blood pressure, and cholesterol levels.",
          "Get immediate insights based on global risk assessment models.",
          "Visual indicators help understand your risk spectrum.",
          "Learn which health metrics contribute most to your score.",
          "No login required — data stays only with you.",
          "Repeat assessments anytime to track your improvement.",
          "Use your results to plan checkups or health goals.",
          "Supports preventive care conversations with your doctor."
        ]},
        { id: "learn", title: "Learn", alt: false, content: [
          "Education is a powerful tool. The more you understand about how your heart works and what affects it, the better choices you'll make. Stay informed with trusted facts and real-life stories."
        ],
        tips: [
          "Explore beginner guides on cholesterol, blood pressure, and BMI.",
          "Learn the signs of heart attack and when to seek help.",
          "Watch simplified videos from medical professionals.",
          "Stay updated with news on heart health innovations.",
          "Browse curated resources for every age group.",
          "Read about lifestyle habits from heart survivors.",
          "Discover new tools for managing stress and anxiety.",
          "Build your heart knowledge — one tip at a time."
        ]},
        { id: "about", title: "About", alt: true, content: [
          "We believe everyone should have access to simple, actionable information about their heart health. Our mission is to combine technology, compassion, and education in one seamless experience."
        ],
        tips: [
          "Designed for anyone — no prior medical knowledge needed.",
          "Developed with input from health experts and tech specialists.",
          "Built to prioritize accessibility, privacy, and ease of use.",
          "Includes powerful tools for both awareness and prevention.",
          "Provides a personalized experience with every use.",
          "Committed to promoting healthier lifestyles worldwide.",
          "Created with love, data, and a heart for health.",
          "Because knowledge is the first step to prevention."
        ]}
      ].map(({ id, title, alt, content, tips }, index) => (
        <section
          key={id}
          id={id}
          className={`section ${alt ? 'alt' : ''} ${visibleSections[id] ? 'animate' : ''}`}
          ref={el => (sectionsRef.current[index + 1] = el)}
        >
          <h2>{title}</h2>
          {content.map((para, i) => <p key={i}>{para}</p>)}

          {/* Add button only for Predict section */}
          {id === "predict" && (
            <button
              className="predict-button"
              onClick={() => window.location.href = "/predict"}
            >
              Predict
            </button>
          )}

          <ul className="tips">
            {tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default Home;
