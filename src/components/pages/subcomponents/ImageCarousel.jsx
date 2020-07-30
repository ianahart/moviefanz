import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.min.css';

import image1 from '../../../images/img_01.jpg';
import image2 from '../../../images/img_02.jpg';
import image3 from '../../../images/img_03.jpg';
import image4 from '../../../images/img_04.jpg';
import image5 from '../../../images/img_05.jpg';
import image6 from '../../../images/img_06.jpg';
import image7 from '../../../images/img_07.jpg';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      currentSlideIndex: 0,
      currentImageCaption: '',
    };
  }
  componentDidMount() {
    this.updateWindowDimensions();
    this.showCurrentImageCaption();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  handleSlideChange = (swiper) => {
    this.setState({
      currentSlideIndex: swiper.activeIndex,
    });
    this.showCurrentImageCaption();
  };

  initCaptions() {
    return [
      { id: 0, text: 'Company gathering 2020' },
      { id: 1, text: 'Company Headquarters located in California' },
      { id: 2, text: 'A Theater where employees go to watch new movies' },
      { id: 3, text: 'Hard at work in the office' },
      { id: 4, text: 'Our very own amphitheater' },
      { id: 5, text: 'Testing the Moviefanz site on different devices' },
      { id: 6, text: 'Brainstorming new marketing ideas' },
      { id: 7, text: '' },
      { id: 8, text: '' },
    ];
  }

  showCurrentImageCaption = () => {
    const captions = this.initCaptions();
    const currentImageCaption = captions.find((caption) => {
      return caption.id === this.state.currentSlideIndex;
    });
    this.setState({
      currentImageCaption: currentImageCaption.text,
    });
  };

  render() {
    const numOfSlidesToShow = this.state.width <= 600 ? 1 : 3;
    const shouldShowBackgroundColor =
      this.state.currentImageCaption === '' ? 'transparent' : 'rgba(0,0,0,0.4)';

    return (
      <div className="pt-5 image-carousel">
        <Swiper
          spaceBetween={50}
          slidesPerView={numOfSlidesToShow}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={this.onSwipe}
          onSlideChange={this.handleSlideChange}
        >
          <SwiperSlide>
            <img src={image1} alt="people"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image2} alt="building"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image3} alt="movie theater"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image4} alt="conference room"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image5} alt="outdoor movie theater"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={image6} alt="ipad" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image7} alt="people working" />
          </SwiperSlide>
          <SwiperSlide>
            <div className="desc">
              <h5>Company Culture</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                beatae quibusdam aperiam assumenda eligendi quidem, perferendis
                quaerat libero incidunt, alias soluta, in ipsam veritatis quae
                quod magni aliquid! Ratione, quam sint tenetur dolore illo hic
                quod voluptates modi consequuntur minus.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="desc">
              <h5>Why We Work at Moviefanz</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                beatae error quidem? Iure natus cupiditate quaerat eius animi,
                ipsam ab!
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
        <div
          className="mt-2"
          style={{
            backgroundColor: `${shouldShowBackgroundColor}`,
            textAlign: 'left',
            width: '50%',
            padding: '1rem',
            letterSpacing: '0.1rem',
          }}
        >
          <h5 className="text-center caption">
            <i className="fab fa-microblog icon"></i>
            {this.state.currentImageCaption}
          </h5>
          {this.state.currentSlideIndex < 6 ? (
            <div className="line"></div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Carousel;
