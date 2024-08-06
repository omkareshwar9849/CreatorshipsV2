import React from 'react';

const Section = ({ title, description, children, bgClass,backgroundImage }) => (
  <section className={`w-full py-12 md:py-24 lg:py-24 ${bgClass} flex justify-center`}
  style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
>
    <div className="container space-y-12 px-4 md:px-6" >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl" style={{color:'#EBD96B'}}>{title}</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  </section>
);

export default Section;
