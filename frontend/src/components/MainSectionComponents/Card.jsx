import React from 'react';
import './Card.css'

const Card = ({ icon, title, description, buttonText, buttonLink, onClick }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4" data-v0-t="card" id='card'>
    <div className="flex items-center gap-4">
      <div className="bg-primary rounded-md p-3 flex items-center justify-center" id='card_icon'>
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-muted-foreground">{description}</p>
    <button
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        } else {
          window.location.href = buttonLink;
        }
      }}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" id='card_button'>
      {buttonText}
    </button>
  </div>
);

export default Card;
