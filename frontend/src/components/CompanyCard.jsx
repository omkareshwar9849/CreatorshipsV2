import React from 'react';

const CompanyCard = ({ company }) => {
    const handleContactClick = () => {
        window.location.href = company.website;
    };

    return (
        <div key={company.id} className="border bg-card text-card-foreground shadow-sm w-full p-5 my-5" style={{ border: 'none', background: 'black', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}>
            <div style={{ border: 'solid 3px #EBD96B' }}>
                <div className="flex flex-col space-y-1.5 p-6">
                    <div className="flex items-center gap-4">
                        <span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12">
                            <img className="aspect-square h-full w-full" alt={company.name} src={company.small_logo_thumb_url} />
                        </span>
                        <div>
                            <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight truncate max-w-full" style={{ color: "#EBD96B" }}>{company.name}</h3>
                            <p className="text-sm text-muted-foreground">{company.all_locations}</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid gap-1" style={{ gridTemplateColumns: "auto auto" }}>
                        <Detail title="One Liner" detail={company.one_liner} />
                        <Detail title="Industry" detail={company.industry} />
                        <Detail title="Tags" detail={company.tags.join(', ')} />
                        <Detail title="Launch Date" detail={new Date(company.launched_at * 1000).toLocaleDateString()} />
                    </div>
                    <div>
                        <strong className='text-[#EBD96B] mt-2'>Long Description: </strong>
                        <p className='text-gray-400'>{company.long_description.slice(0, 150)}...</p>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6">
                    <button
                        onClick={handleContactClick}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        style={{ backgroundColor: '#EBD96B', color: 'black' }}
                    >
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
};

const Detail = ({ title, detail }) => (
    <div >
        <strong className='text-[#EBD96B]'>{title}:</strong> <p className='text-gray-400'>{detail}</p>
    </div>
);

export default CompanyCard;
