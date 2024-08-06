import React, { useEffect, useState } from 'react';
import Card from './Card';
import Section from './Section1';
import background_img from '../../Assests/Background.png'

const MainContent = () => {
  const [businesses, setBusinesses] = useState([]);
  const [creators, setCreators] = useState([]);
  const host = process.env.REACT_APP_BACKEND_HOST;

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`${host}/api/form/getBusiness?page=1&limit=3`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setBusinesses(data.forms);
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    const fetchCreators = async () => {
      try {
        const response = await fetch(`${host}/api/form/getCreators?page=1&limit=3`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setCreators(data.forms);
      } catch (error) {
        console.error('Error fetching creator details:', error);
      }
    };

    fetchBusinesses();
    fetchCreators();
  }, [host]);

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-24 bg-slate-200"  style={{backgroundColor:"white" , backgroundImage:`url(${background_img})`}}>
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary-foreground"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>}
              title="Business Form"
              description="Submit your business details to get started on Creatorships."
              buttonText="Submit Business"
              buttonLink="/submit-business"
            />
            <Card
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}
              title="Creator Form"
              description="Submit your creator details to get started on Creatorships."
              buttonText="Submit Creator"
              buttonLink="/submit-creator"
            />
            <Card
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
              title="Partnerships"
              description="View successful partnerships formed on Creatorships."
              buttonText="View Partnerships"
            />
          </div>
        </div>
      </section>
      <Section
        title="Featured Businesses"
        description="Check out some of the businesses that have joined Creatorships."
       // bgClass="bg-muted"
      >
        {businesses.map((business, index) => (
          <Card
            key={index}
            icon={<img className="aspect-square h-6 w-6" alt={business.businessName} src={`https://avatar.iran.liara.run/username?username=${business.businessName}`} />}
            title={business.businessName}
            description={business.description}
            buttonText="View Details"
            buttonLink="/businesses"
          />
        ))}
      </Section>
      <Section
        title="Featured Creators"
        description="Check out some of the creators that have joined Creatorships."
     //  backgroundImage="https://i.ibb.co/CBdFTBj/ff.jpg"
      >
        {creators.map((creator, index) => (
          <Card
            key={creator._id}
            icon={<img className="aspect-square h-6 w-6" alt={creator.fullName} src={`https://avatar.iran.liara.run/username?username=${creator.fullName}`} />}
            title={creator.fullName}
            description={`Partnership Goals: ${creator.partnershipGoals}`}
            buttonText="View Details"
            buttonLink="/creators"
          />
        ))}
      </Section>
      <Section
        title="Successful Partnerships"
        description="Check out some of the successful partnerships formed on Creatorships."
      //  bgClass="bg-muted"
      >
        <Card
          icon={<div className="flex items-center gap-4"><span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12"><span className="flex h-full w-full items-center justify-center rounded-full bg-muted">B</span></span><span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12"><span className="flex h-full w-full items-center justify-center rounded-full bg-muted">C</span></span></div>}
          title="Acme Inc x John Doe"
          description="Acme Inc, a leading technology company, partnered with John Doe, a talented graphic designer, to create a series of visually stunning marketing materials."
          buttonText="View Details"
          buttonLink="#"
        />
        <Card
          icon={<div className="flex items-center gap-4"><span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12"><span className="flex h-full w-full items-center justify-center rounded-full bg-muted">B</span></span><span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12"><span className="flex h-full w-full items-center justify-center rounded-full bg-muted">C</span></span></div>}
          title="Bloom Cosmetics x Jane Smith"
          description="Bloom Cosmetics, a fast-growing beauty brand, partnered with Jane Smith, a skilled content creator, to create engaging content for their audience."
          buttonText="View Details"
          buttonLink="#"
        />
      </Section>
    </main>
  );
};

export default MainContent;
