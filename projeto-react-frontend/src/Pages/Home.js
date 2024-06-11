import React from 'react';
import Header from '../Components/Header';
import OrganizeJobs from '../Components/OrganizeJobs';
import ToDoList from '../Components/ToDoList';
import Cards from '../Components/Cards';
import GoodThings from '../Components/GoodThings';
import ContactForm from '../Components/ContactForm';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <OrganizeJobs />
      <ToDoList />
      <Cards />
      <GoodThings />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;