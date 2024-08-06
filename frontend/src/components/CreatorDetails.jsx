import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const CreatorDetails = () => {
  const [creators, setCreators] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const host = process.env.REACT_APP_BACKEND_HOST;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signin');
    } else {
      fetchCreators(1);
    }
    // eslint-disable-next-line
  }, []);

  const fetchCreators = (pageNumber = 1) => {
    fetch(`${host}/api/form/getCreators?page=${pageNumber}&limit=4`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    })
      .then(response => response.json())
      .then(data => {
        if (pageNumber === 1) {
          setCreators(data.forms);
        } else {
          setCreators(prevCreators => [...prevCreators, ...data.forms]);
        }
        setPage(pageNumber);
        setHasMore(pageNumber < data.totalPages);
      })
      .catch(error => console.error('Error fetching creator details:', error));
  };

  const fetchMoreData = () => {
    fetchCreators(page + 1);
  };

  const handleContactClick = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className="w-full pb-12 md:pb-24 lg:pb-32">
      <div className="container max-w-6xl px-4 md:px-6 mx-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">Creator Details</h2>
            <p className="mt-2 text-muted-foreground text-center" style={{marginBottom:'20px'}}>
              Review the submitted creator information for the Creatorships platform.
            </p>
          </div>
          <InfiniteScroll
            dataLength={creators.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center', marginTop:'20px' }}>No more creators to display</p>}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {creators.map((creator, index) => (
                <CreatorCard
                  key={index}
                  imgSrc={`https://avatar.iran.liara.run/username?username=${creator.fullName}`}
                  altText={creator.fullName}
                  fullName={creator.fullName}
                  phoneNumber={creator.phoneNumber}
                  location={creator.location}
                  portfolioURL={creator.portfolioURL}
                  socialMediaHandles={creator.socialMediaHandles}
                  skills={creator.skills}
                  previousWorkExperience={creator.previousWorkExperience}
                  preferredIndustries={creator.preferredIndustries}
                  partnershipGoals={creator.partnershipGoals}
                  equityDesired={creator.equityDesired}
                  email={creator.email}
                  onContactClick={() => handleContactClick(creator.email)}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </section>
  );
};

const CreatorCard = ({ imgSrc, altText, fullName, phoneNumber, location, portfolioURL, socialMediaHandles, skills, previousWorkExperience, preferredIndustries, partnershipGoals, equityDesired, email, onContactClick }) => (
  <div className=" border bg-card text-card-foreground shadow-sm w-full" style={{ border:'none',background:'black', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', transition: 'box-shadow 0.3s ease, transform 0.3s ease'}}>
    <div  style={{border: 'solid 3px #EBD96B', margin:'30px'}}>
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="flex items-center gap-4">
        <span className="relative flex shrink-0 overflow-hidden rounded-full w-12 h-12">
          <img className="aspect-square h-full w-full" alt={altText} src={imgSrc} />
        </span>
        <div>
          <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight truncate max-w-full" style={{color:"#EBD96B"}}>{fullName}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </div>
    <div className="p-6">
      <div className="grid gap-2"  style={{gridTemplateColumns:"auto auto"}}>
        <Detail title="Phone Number" detail={phoneNumber} />
        <Detail title="Location" detail={location} />
        <Detail title="Portfolio URL" detail={portfolioURL} />
        <Detail title="Social Media Handles" detail={socialMediaHandles} />
        <Detail title="Skills" detail={skills} />
        <Detail title="Previous Work Experience" detail={previousWorkExperience} />
        <Detail title="Preferred Industries" detail={preferredIndustries} />
        <Detail title="Partnership Goals" detail={partnershipGoals} />
        <Detail title="Equity Desired" detail={equityDesired} />
        <Detail title="Email" detail={email} />
      </div>
    </div>
    <div className="flex items-center justify-center p-6" >
      <button
        onClick={onContactClick}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        style={{backgroundColor:'#EBD96B', color: 'black'}}
     >
        Contact
      </button>
    </div>
    </div>
  </div>
);

const Detail = ({ title, detail }) => (
  <div className="grid gap-1">
    <div className="text-sm font-medium" style={{color:'white'}}>{title}</div>
    <p className="text-sm" style={{color:'white'}}>{detail}</p>
  </div>
);

export default CreatorDetails;
