import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES_DATA = {
  'DESIGN': {
    items: ['Web design', 'Mobile design', 'Website design', 'Website redesign', 'Branding & identity', 'Design prototype'],
    image: '/design_showcase.png'
  },
  'DEVELOPMENT': {
    items: ['React & Next.js apps', 'Single page applications', 'Webflow / WordPress CMS', 'Performance optimization', 'Custom web portals'],
    image: '/development_showcase.png'
  },
  'RESEARCH': {
    items: ['UX audit & discovery', 'User research & interviews', 'Competitor analysis', 'Usability testing', 'Product strategy'],
    image: '/strategy_showcase.png'
  },
  'LAUNCH': {
    items: ['MVP development', 'Go-to-market design', 'Landing page optimization', 'App Store deployment'],
    image: '/design_showcase.png'
  },
  'EVOLVE': {
    items: ['Feature expansion', 'Analytics integration', 'Speed optimization', 'Conversion rate (CRO)'],
    image: '/development_showcase.png'
  },
  'REBRAND': {
    items: ['Visual identity refresh', 'Logo design & guidelines', 'UI kit & design systems'],
    image: '/strategy_showcase.png'
  },
  'EXTEND': {
    items: ['Dedicated team extensions', 'Staff augmentation', 'Maintenance & support'],
    image: '/design_showcase.png'
  }
};

export default function HeaderMegaMenu() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('DESIGN');
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const activeCategoryData = CATEGORIES_DATA[activeCategory] || CATEGORIES_DATA['DESIGN'];

  const toggleServicesMenu = (e) => {
    e.preventDefault();
    setIsServicesOpen(!isServicesOpen);
  };

  const handleCategoryHover = (cat) => {
    setActiveCategory(cat);
  };

  return (
    <>
      <header className="site-header-white">
        <div className="header-container-white">
          {/* Logo */}
          <Link to="/" className="logo-white" onClick={() => setIsServicesOpen(false)}>
            <span className="logo-star-icon">✦</span>
            <span className="logo-text-white">nextin</span>
          </Link>

          {/* Mobile toggle */}
          <button 
            className={`mobile-nav-toggle-white ${mobileNavActive ? 'active' : ''}`}
            onClick={() => setMobileNavActive(!mobileNavActive)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation Links */}
          <nav className={`main-nav-white ${mobileNavActive ? 'active' : ''}`}>
            <ul>
              <li>
                <a 
                  href="#" 
                  onClick={toggleServicesMenu} 
                  className={`nav-link-with-arrow ${isServicesOpen ? 'active' : ''}`}
                >
                  SERVICES {isServicesOpen ? '▲' : '▼'}
                </a>
              </li>
              <li>
                <a href="#" className="nav-link-with-arrow">
                  INDUSTRIES ▼
                </a>
              </li>
              <li><a href="/#tech" onClick={() => setMobileNavActive(false)}>CASES</a></li>
              <li>
                <a href="#" className="nav-link-with-arrow">
                  COMPANY ▼
                </a>
              </li>
              <li><a href="/#about" onClick={() => setMobileNavActive(false)}>INSIGHTS</a></li>
              <li><Link to="/contact" onClick={() => setMobileNavActive(false)}>CONTACTS</Link></li>
            </ul>
            <Link to="/contact" className="header-cta-btn-white" onClick={() => setMobileNavActive(false)}>
              GET IN TOUCH
            </Link>
          </nav>
        </div>

        {/* Full-width Services Mega-Menu Dropdown */}
        <div className={`services-mega-dropdown ${isServicesOpen ? 'open' : ''}`}>
          <div className="dropdown-container">
            
            {/* Left Sidebar Column */}
            <div className="dropdown-sidebar">
              <div className="sidebar-group">
                {['DESIGN', 'DEVELOPMENT', 'RESEARCH'].map((cat) => (
                  <button
                    key={cat}
                    onMouseEnter={() => handleCategoryHover(cat)}
                    onClick={() => setActiveCategory(cat)}
                    className={`sidebar-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                  >
                    <span>{cat}</span>
                    <span className="cat-arrow-right">→</span>
                  </button>
                ))}
              </div>
              
              <div className="sidebar-divider"></div>
              
              <div className="sidebar-group">
                {['LAUNCH', 'EVOLVE', 'REBRAND', 'EXTEND'].map((cat) => (
                  <button
                    key={cat}
                    onMouseEnter={() => handleCategoryHover(cat)}
                    onClick={() => setActiveCategory(cat)}
                    className={`sidebar-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                  >
                    <span>{cat}</span>
                    <span className="cat-arrow-right">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle Services List Column */}
            <div className="dropdown-middle">
              <div className="middle-list-wrapper">
                {activeCategoryData.items.map((subService, idx) => {
                  if (subService === 'Website design') {
                    return (
                      <Link 
                        to="/services/website" 
                        key={idx} 
                        className="middle-list-item"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        {subService}
                      </Link>
                    );
                  }
                  return (
                    <a 
                      href="/#services-section" 
                      key={idx} 
                      className="middle-list-item"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {subService}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right Illustration Column */}
            <div className="dropdown-right">
              <div className="showcase-image-wrapper">
                <img 
                  src={activeCategoryData.image} 
                  alt={`${activeCategory} Showcase`} 
                  className="showcase-image" 
                />
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Dropdown Overlay (close menu when clicking outside) */}
      {isServicesOpen && (
        <div className="dropdown-overlay-bg" onClick={() => setIsServicesOpen(false)}></div>
      )}
    </>
  );
}
