import React, { useEffect, useState } from 'react';
import '../Assets/css/ContactForm.css';
import imagem from '../Assets/img/imagem.png';
import icone from '../Assets/img/icon-mail.png';
import api from '../Utils/api';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    message: ''
  });

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await api.post('/contact/contacts', formData);
          alert('Contact added successfully');
          setFormData({ name: '', email: '', telephone: '', message: '' });
      } catch (error) {
          console.error('Error adding contact:', error);
          alert('Failed to add contact');
      }
  };

  return (
    <section className="contact-section">
      <div className="formulario">
        <div className="header-img">
          <div className="background-green"></div>
          <img className="imgForm" src={imagem} alt="imagem" />
        </div>
        <div className="icon-title">
          <img className="icon-img" src={icone} alt="icon" />
          <h2>Get in <br/>
          <span>touch</span></h2>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" placeholder="type your name here..." value={formData.name}  onChange={handleChange} />

          <div className="email-telephone">
            <div className="email-wrapper">
              <label htmlFor="email">Email*</label>
              <input type="email" id="email" placeholder="example@example.com"  value={formData.email}  onChange={handleChange} />
            </div>
            <div className="telephone-wrapper">
              <label htmlFor="telephone">Telephone*</label>
              <input type="text" id="telephone" placeholder="( ) ___-____"  value={formData.telephone}  onChange={handleChange} />
            </div>
          </div>

          <label htmlFor="message">Message*</label>
          <textarea id="message" placeholder="Type what you want to say to us"  value={formData.message}  onChange={handleChange} ></textarea>

          <button type="submit">Send now</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;