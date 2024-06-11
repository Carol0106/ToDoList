import React from 'react';
import Slider from 'react-slick';
import '../Assets/css/GoodThings.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../Assets/img/bitmap.png';
import img2 from '../Assets/img/Image.png';
import img3 from '../Assets/img/Image3.png';

const GoodThings = () => {
  const settings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <section className="good-things-section container">
      <h2>good things</h2>
      <Slider {...settings} className="good-things-slider">
        <div className="good-thing">
          <div className='slide-header'>
            <img src={img1} alt='imagem' className="img-fluid seta"></img>
          </div>
          <div className='slide-body'>
            <a className='func' href=''>function</a>
            <p>Organize your daily job enhance your life performance.</p>
          </div>
          <div className='slide-footer'> 
            <a className='rmore' href=''>read more</a>
          </div>
        </div>
        <div className="good-thing">
          <div className='slide-header'>
            <img src={img2} alt='imagem' className="img-fluid seta"></img>
          </div>
          <div className='slide-body'>
            <a className='func' href=''>function</a>
            <p>Mark one activity as done makes your brain understands the power of doing.</p>
          </div>
          <div className='slide-footer'> 
            <a className='rmore' href=''>read more</a>
          </div>
        </div>
        <div className="good-thing">
          <div className='slide-header'>
            <img src={img3} alt='imagem' className="img-fluid seta"></img>
          </div>
          <div className='slide-body'> 
            <a className='func' href=''>function</a>
            <p>Careful with missunderstanding the difference between a list of things and a list of desires.</p>
          </div>
          <div className='slide-footer'> 
            <a className='rmore' href=''>read more</a>
          </div>
        </div> 
      </Slider>
    </section>
  ); 
};

export default GoodThings;