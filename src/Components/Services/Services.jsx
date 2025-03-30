import React, { useState, useMemo, useEffect } from 'react';
import './Services.css';
import themePattern from '../../assets/theme_pattern.svg';
import servicesData from '../../assets/services_data';
import arrowIcon from '../../assets/arrow_icon.svg';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Get unique categories
  const categories = useMemo(() => {
    return servicesData && Array.isArray(servicesData)
      ? ['All', ...new Set(servicesData.map(service => service.category))]
      : ['All'];
  }, []); // Empty dependency since servicesData is static

  // Filter services based on selected category
  const filteredServices = useMemo(() => {
    return selectedCategory === 'All'
      ? servicesData
      : servicesData.filter(service => service.category === selectedCategory);
  }, [selectedCategory]);

  // Simulate loading effect
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  if (isLoading) {
    return <div className="services-loading">Loading services...</div>;
  }

  if (!servicesData || !Array.isArray(servicesData)) {
    return <div className="services-error">Error: Unable to load services</div>;
  }

  return (
    <section className="services" aria-label="Our Services">
      {/* Title Section */}
      <div className="services-title">
        <h1>My Services</h1>
        <img src={themePattern} alt="" aria-hidden="true" />
      </div>

      {/* Filter Buttons */}
      <div className="services-filter">
        {categories.map(category => (
          <button
            key={category}
            aria-selected={selectedCategory === category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="services-container">
        {filteredServices.map(service => (
          <article key={service.s_no} className="services-format" tabIndex={0}>
            <h3>{service.s_no}</h3>
            <h2>{service.s_name}</h2>
            {service.s_desc && <p>{service.s_desc}</p>}
            <button className="services-readmore">
              <span>Read More</span>
              <img src={arrowIcon} alt="" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;