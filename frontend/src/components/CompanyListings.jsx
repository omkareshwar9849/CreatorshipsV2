import React, { useEffect, useState, useRef } from 'react';
import CompanyCard from './CompanyCard';

const CompanyListings = () => {
    const [facets, setFacets] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [selectedFacet, setSelectedFacet] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [visibleFacets, setVisibleFacets] = useState(10);
    const [visibleRegions, setVisibleRegions] = useState(10);
    const [loadedCompanies, setLoadedCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 10;
    const observerRef = useRef();

    useEffect(() => {
        const fetchFacets = async () => {
            try {
                const response = await fetch("https://45bwzj1sgc-dsn.algolia.net/1/indexes/YCCompany_production/facets/tags/query?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%3B%20JS%20Helper%20(3.16.1)&x-algolia-application-id=45BWZJ1SGC&x-algolia-api-key=MjBjYjRiMzY0NzdhZWY0NjExY2NhZjYxMGIxYjc2MTAwNWFkNTkwNTc4NjgxYjU0YzFhYTY2ZGQ5OGY5NDMxZnJlc3RyaWN0SW5kaWNlcz0lNUIlMjJZQ0NvbXBhbnlfcHJvZHVjdGlvbiUyMiUyQyUyMllDQ29tcGFueV9CeV9MYXVuY2hfRGF0ZV9wcm9kdWN0aW9uJTIyJTVEJnRhZ0ZpbHRlcnM9JTVCJTIyeWNkY19wdWJsaWMlMjIlNUQmYW5hbHl0aWNzVGFncz0lNUIlMjJ5Y2RjJTIyJTVE", {
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/x-www-form-urlencoded",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        params: "facetQuery=&facets=%5B%22app_answers%22%2C%22app_video_public%22%2C%22batch%22%2C%22demo_day_video_public%22%2C%22highlight_black%22%2C%22highlight_latinx%22%2C%22highlight_women%22%2C%22industries%22%2C%22isHiring%22%2C%22nonprofit%22%2C%22question_answers%22%2C%22regions%22%2C%22subindustry%22%2C%22tags%22%2C%22top_company%22%5D&hitsPerPage=1000&maxFacetHits=100&maxValuesPerFacet=1000&page=0&query=&tagFilters="
                    })
                });
                const data = await response.json();
                if (data.facetHits) {
                    setFacets(data.facetHits);
                }
            } catch (error) {
                console.error("Error fetching facets:", error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await fetch("https://45bwzj1sgc-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%3B%20JS%20Helper%20(3.16.1)&x-algolia-application-id=45BWZJ1SGC&x-algolia-api-key=MjBjYjRiMzY0NzdhZWY0NjExY2NhZjYxMGIxYjc2MTAwNWFkNTkwNTc4NjgxYjU0YzFhYTY2ZGQ5OGY5NDMxZnJlc3RyaWN0SW5kaWNlcz0lNUIlMjJZQ0NvbXBhbnlfcHJvZHVjdGlvbiUyMiUyQyUyMllDQ29tcGFueV9CeV9MYXVuY2hfRGF0ZV9wcm9kdWN0aW9uJTIyJTVEJnRhZ0ZpbHRlcnM9JTVCJTIyeWNkY19wdWJsaWMlMjIlNUQmYW5hbHl0aWNzVGFncz0lNUIlMjJ5Y2RjJTIyJTVE", {
                    headers: {
                        "accept": "application/json",
                        "content-type": "application/x-www-form-urlencoded",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        requests: [{
                            indexName: "YCCompany_production",
                            params: "facets=%5B%22app_answers%22%2C%22app_video_public%22%2C%22batch%22%2C%22demo_day_video_public%22%2C%22highlight_black%22%2C%22highlight_latinx%22%2C%22highlight_women%22%2C%22industries%22%2C%22isHiring%22%2C%22nonprofit%22%2C%22question_answers%22%2C%22regions%22%2C%22subindustry%22%2C%22tags%22%2C%22top_company%22%5D&hitsPerPage=1000&maxValuesPerFacet=1000&page=0&query=&tagFilters="
                        }]
                    })
                });
                const data = await response.json();
                // const data = require('./data.json')
                if (data.results && data.results[0] && data.results[0].hits) {
                    setCompanies(data.results[0].hits);
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        };

        fetchFacets();
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (companies.length) {
            const intersectionObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            });

            if (observerRef.current) {
                intersectionObserver.observe(observerRef.current);
            }

            return () => {
                if (observerRef.current) {
                    intersectionObserver.unobserve(observerRef.current);
                }
            };
        }
    }, [companies]);

    useEffect(() => {
        const loadMoreCompanies = () => {
            const startIndex = (currentPage - 1) * companiesPerPage;
            const newCompanies = companies.slice(startIndex, startIndex + companiesPerPage);
            setLoadedCompanies((prevCompanies) => [...prevCompanies, ...newCompanies]);
        };

        loadMoreCompanies();
    }, [currentPage, companies]);

    const handleFacetChange = (facet) => {
        setSelectedFacet(selectedFacet === facet ? null : facet);
    };

    const handleRegionChange = (region) => {
        setSelectedRegion(selectedRegion === region ? null : region);
    };

    const showMoreFacets = () => {
        setVisibleFacets(visibleFacets + 10);
    };

    const showMoreRegions = () => {
        setVisibleRegions(visibleRegions + 10);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSortOrder('default');
        setSelectedFacet(null);
        setSelectedRegion(null);
    };

    const filteredCompanies = companies
        .filter(company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedFacet === null || company.tags.includes(selectedFacet)) &&
            (selectedRegion === null || company.regions.includes(selectedRegion))
        );

    const sortedCompanies = [...filteredCompanies].sort((a, b) => {
        if (sortOrder === 'dateDesc') {
            return new Date(b.launched_at * 1000) - new Date(a.launched_at * 1000);
        }
        return 0;
    });

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen p-4">
            <div className="md:w-1/4 bg-white p-4 shadow-lg mb-4 md:mb-0 rounded-lg scrollable-container" style={{ backgroundColor: '#F4F6F5', maxHeight: '80vh', overflowY: 'auto' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>

                    <button
                         onClick={clearFilters}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        style={{ backgroundColor: '#EBD96B', color: 'black' }}
                    >
                        Clear Filters
                    </button>
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by company name"
                    className="mb-4 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Sort By</h3>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="default">Default</option>
                        <option value="dateDesc">Date Descending</option>
                    </select>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap">
                        <button
                            onClick={() => handleFacetChange(null)}
                            className={`mr-2 mb-2 px-4 py-2 rounded-full border focus:outline-none ${selectedFacet === null ? 'bg-[#EBD96B] font-semibold' : 'bg-gray-200 text-gray-700'}`}
                        >
                            All Tags
                        </button>
                        {facets.slice(0, visibleFacets).map((facet) => (
                            <button
                                key={facet.value}
                                onClick={() => handleFacetChange(facet.value)}
                                className={`mr-2 mb-2 px-4 py-2 rounded-full border focus:outline-none ${selectedFacet === facet.value ? 'bg-[#EBD96B] font-semibold' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {facet.value} ({facet.count})
                            </button>
                        ))}
                        {facets.length > visibleFacets && (
                            <button
                                onClick={showMoreFacets}
                                className="px-4 py-2 rounded-full border focus:outline-none bg-gray-200 text-gray-700"
                            >
                                Show more
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Regions</h3>
                    <div className="flex flex-wrap">
                        <button
                            onClick={() => handleRegionChange(null)}
                            className={`mr-2 mb-2 px-4 py-2 rounded-full border focus:outline-none ${selectedRegion === null ? 'bg-[#EBD96B] font-semibold' : 'bg-gray-200 text-gray-700'}`}
                        >
                            All Regions
                        </button>
                        {companies.length > 0 && companies.reduce((uniqueRegions, company) => {
                            company.regions.forEach(region => {
                                if (!uniqueRegions.includes(region)) {
                                    uniqueRegions.push(region);
                                }
                            });
                            return uniqueRegions;
                        }, []).slice(0, visibleRegions).map((region, index) => (
                            <button
                                key={index}
                                onClick={() => handleRegionChange(region)}
                                className={`mr-2 mb-2 px-4 py-2 rounded-full border focus:outline-none ${selectedRegion === region ? 'bg-[#EBD96B] font-semibold' : 'bg-gray-200 text-gray-700'}`}
                            >
                                {region}
                            </button>
                        ))}
                        {visibleRegions < companies.reduce((uniqueRegions, company) => {
                            company.regions.forEach(region => {
                                if (!uniqueRegions.includes(region)) {
                                    uniqueRegions.push(region);
                                }
                            });
                            return uniqueRegions;
                        }, []).length && (
                                <button
                                    onClick={showMoreRegions}
                                    className="px-4 py-2 rounded-full border focus:outline-none bg-gray-200 text-gray-700"
                                >
                                    Show more
                                </button>
                            )}
                    </div>
                </div>
            </div>
            <div className="md:w-3/4 md:ml-4 bg-white p-4 shadow-lg rounded-lg scrollable-container" style={{ backgroundColor: '#F4F6F5', maxHeight: '80vh', overflowY: 'auto' }}>
    <h2 className="text-2xl font-semibold text-gray-800">Businesses</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedCompanies.map(company => (
            <CompanyCard key={company.id} company={company} />
        ))}
    </div>
    <div ref={observerRef}></div>
</div>

        </div>
    );
};

export default CompanyListings;
