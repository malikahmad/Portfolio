import React, { useState, useMemo } from 'react';
import './MyWork.css';
import themePattern from '../../assets/theme_pattern.svg';
import myworkData from '../../assets/mywork_data';
import arrowIcon from '../../assets/arrow_icon.svg';

const MyWork = () => {
  const [visibleItems, setVisibleItems] = useState(6); // Initial number of items to show

  // Get visible work items
  const visibleWork = useMemo(() => myworkData.slice(0, visibleItems), [visibleItems]);

  const handleShowMore = () => {
    setVisibleItems(prev => Math.min(prev + 6, myworkData.length));
  };

  if (!myworkData.length) {
    return <div className="mywork-error">Error: Unable to load work data</div>;
  }

  return (
    <section className="mywork" aria-label="My Latest Work">
      {/* Title Section */}
      <div className="mywork-title">
        <h1>My Latest Work</h1>
        <img src={themePattern} alt="" aria-hidden="true" />
      </div>

      {/* Work Grid */}
      <div className="mywork-container">
        {visibleWork.map((work) => (
          <figure key={work.id} className="mywork-item">
            <img 
              src={work.w_img} 
              alt={work.w_name} 
              loading="lazy"
            />
            <figcaption>{work.w_name}</figcaption>
          </figure>
        ))}
      </div>

      {/* Show More Button */}
      {visibleItems < myworkData.length && (
        <button 
          className="mywork-showmore"
          onClick={handleShowMore}
          aria-label="Show more projects"
        >
          <span>Show More</span>
          <img src={arrowIcon} alt="" aria-hidden="true" />
        </button>
      )}
    </section>
  );
};

export default MyWork;
