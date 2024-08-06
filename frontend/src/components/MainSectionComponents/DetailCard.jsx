import React from 'react';

function DetailCard({ title, items }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{title}</h2>
        <div className="mt-8 grid gap-6">
          {items.map((item, index) => (
            <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.industry}</p>
              </div>
              <div className="p-6">
                <p>{item.description}</p>
              </div>
              <div className="flex items-center p-6">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
