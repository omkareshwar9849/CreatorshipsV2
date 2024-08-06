import React from 'react';
import './Card.css'

const Card = ({company}) => (
  <div key={company.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4" data-v0-t="card" id='card'>
    <div className="flex items-center gap-4">
      <div className="bg-primary rounded-md p-3 flex items-center justify-center" id='card_icon'>
      <img src={company.small_logo_thumb_url} alt={company.name} className="w-12 h-12 mr-4 rounded-full shadow-lg" />
      </div>
      <h3 className="text-xl font-semibold">{company.name}</h3>
    </div>
    <p className="text-muted-foreground">{company.long_description}</p>
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" id='card_button'>
      Contact
    </button>
  </div>
);

export default Card;
