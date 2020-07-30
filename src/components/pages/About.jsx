import React from 'react';

import StoryContent from '../pages/subcomponents/StoryContent';
import ImageCarousel from '../pages/subcomponents/ImageCarousel';

import '../../css/About.css';
const About = () => {
  return (
    <div className="about">
      <header>
        <h1>About Moviefanz</h1>
        <div className="line"></div>
      </header>
      <StoryContent />
      <ImageCarousel />
      <section id="contact">
        <div className="social-icons">
          <button href="#">
            <i className="fab fa-facebook fa-3x icon"></i>
          </button>
          <button href="#">
            <i className="fab fa-twitter fa-3x icon"></i>
          </button>
          <button href="#">
            <i className="fab fa-google-plus-square fa-3x icon"></i>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
