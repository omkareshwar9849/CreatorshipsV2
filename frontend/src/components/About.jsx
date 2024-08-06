import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-4 md:pb-24 lg:pb-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{color:'#EBD96B'}}>Unlock New Growth Opportunities</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Creatorships provides a boutique matching process, automated outreach tools, and equity-based deal
                  facilitation to help creators and businesses find the perfect partnership.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="https://i.ibb.co/XxhXx5y/modern-equipped-computer-lab-23-2149241213.jpg"
                width="550"
                height="310"
                alt="Side modren equipped computer lab"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold" style={{color:'#EBD96B'}}>Boutique Matching</h3>
                      <p className="text-muted-foreground">
                        Our team of experts carefully curates the best creator-business partnerships based on your
                        unique needs and goals.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold" style={{color:'#EBD96B'}}>Automated Outreach</h3>
                      <p className="text-muted-foreground">
                        Leverage our automated outreach tools to efficiently connect with potential partners and
                        streamline the collaboration process.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold" style={{color:'#EBD96B'}}>Equity-based Deals</h3>
                      <p className="text-muted-foreground">
                        We facilitate equity-based partnerships, aligning incentives and ensuring both sides benefit
                        from the growth of the collaboration.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg px-3 py-1 text-sm">Monetization Model</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{color:'#EBD96B'}}>Aligning Incentives for Growth</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Creatorships takes a percentage of the equity for facilitating the connection between creators and
                  businesses, ensuring that all parties are incentivized to drive the partnership's success.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">

            <img
                src="https://i.ibb.co/8mBJkpK/business-concept.jpg"
                width="550"
                height="310"
                alt="side business concept"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full "
              />

              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold" style={{color:'#EBD96B'}}>Transparent Fees</h3>
                      <p className="text-muted-foreground">
                        Our fee structure is clearly communicated upfront, so you know exactly what to expect when
                        partnering with Creatorships.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold" style={{color:'#EBD96B'}}>Equity-based Model</h3>
                      <p className="text-muted-foreground">
                        By taking a percentage of the equity, we ensure that our interests are aligned with yours,
                        incentivizing us to facilitate successful partnerships.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold" style={{color:'#EBD96B'}}>No Upfront Costs</h3>
                      <p className="text-muted-foreground">
                        You only pay a fee when a successful partnership is established, ensuring that Creatorships is a
                        risk-free investment for your business.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
             
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted border-t" style={{backgroundColor:'#EBD96B'}}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid items-center justify-center gap-4 text-center lg:gap-10">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl" style={{color:'black'}}>Trusted by Leading Brands</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Creatorships has helped some of the biggest names in the industry unlock new growth opportunities
                  through creator-business partnerships.
                </p>
              </div>
              <div className="grid w-full grid-cols-2 lg:grid-cols-5 items-center justify-center gap-8 lg:gap-12">
                <img
                  src="https://i.ibb.co/tXWxZv6/logo-mockup-panel.jpg"
                  width="140"
                  height="70"
                  alt="Logo"
                  className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                />
                <img
                  src="https://i.ibb.co/6RHBjcK/colorful-bird-illustration-gradient-343694-1741.jpg"
                  width="140"
                  height="70"
                  alt="Logo"
                  className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                />
                <img
                  src="https://i.ibb.co/9qbv15C/dark-fashion-logo-mock-up-1097-15.jpg"
                  width="140"
                  height="70"
                  alt="Logo"
                  className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                />
                <img
                  src="https://i.ibb.co/nnTDHzN/gradient-versus-logo-template-23-2151514114.jpg"
                  width="140"
                  height="70"
                  alt="Logo"
                  className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                />
                <img
                  src="https://i.ibb.co/60GtJdw/vector-goat-e-sport-logo-779267-1976.jpg"
                  width="140"
                  height="70"
                  alt="Logo"
                  className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
                />
              </div>
              <div className="flex justify-center space-x-4" style={{ marginTop:'20vh'}}>
                <a
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  href="/signin"
                >
                  Get Started
                </a>
                <a
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  href="/about"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
