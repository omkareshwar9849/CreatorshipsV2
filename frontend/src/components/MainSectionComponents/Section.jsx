import React, { forwardRef } from 'react';

const Section = forwardRef(({ title, description, buttons = [], children, backgroundImage }, ref) => (
  <section
    className="py-12 md:py-24"
    ref={ref}
  >
    <div className="container mx-auto max-w-7xl px-4 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl" style={{color:'#EBD96B'}}>
          {title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          {description}
        </p>
        <div className="mt-8 flex justify-center gap-4" >
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                button.primary
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8'
                  : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8'
              }`}
              style={{backgroundColor:'#EBD96B'}}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
      {children && <div className="mt-12">{children}</div>}
    </div>
  </section>
));

export default Section;
