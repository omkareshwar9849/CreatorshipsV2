import React from 'react';
import Section from './MainSectionComponents/Section';
import MainContent from './MainSectionComponents/MainContent';


function Main() {
  return (
    <main className="flex-1">
      <section 
      className="w-full py-12 md:pb-16 lg:pb-20 xl:pb-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]" style={{ backgroundColor: '#F4F6F5', padding: '20px', borderRadius:'15px' }}>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                      Connecting  Creators with Businesses
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Creatorships is a platform that facilitates equity-based partnerships between creators and
                    businesses, helping both sides unlock new growth opportunities.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a href="/submit-business">
                    <button
                        className=" mx-2  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
                        style={{ backgroundColor: '#EBD96B', color: 'black' }}
                    >
                        Join as a Business
                    </button>
                  </a>
                  
                  <a
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    href="/submit-creator"
                  >
                    Join as a Creator
                  </a>
                </div>
              </div>
              <img
                src="https://i.ibb.co/D8SKC11/portrait-fitness-influencer-23-2151564797.jpg"
                width="550"
                height="310"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      {/* <Section
        title="Connecting Creators and Businesses"
        backgroundImage=""
        description="Creatorships is a platform that helps businesses and creators form equity-based partnerships. Submit your details to get started."
        buttons={[
          { text: 'Join as a Business', primary: true, onClick:() => window.location.href = '/submit-business'},
          { text: 'Join as a Creator', primary: false, onClick:() => window.location.href = '/submit-creator' },
        ]}
      /> */}
        <MainContent />
      <Section
        title="Boutique Outreach"
        description="Creatorships is initially focused on personalized outreach to businesses and creators to facilitate partnerships. We operate as a boutique service to make the best matches."
        buttons={[
          { text: 'Learn More', primary: false, onClick:() => window.location.href = '/about' },
        ]}
      />
    </main>
  );
}

export default Main;
