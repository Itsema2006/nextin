import { useState } from 'react';
import { Link } from 'react-router-dom';

const PAGE_LINKS = [
  { label: 'Services', href: '#services-section' },
  { label: 'Cases', href: '#tech' },
  { label: 'About us', href: '#about' },
  { label: 'Career', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', href: '#' }
];

const ALL_SERVICES_21 = [
  'Web design', 'Mobile design', 'Website design', 'Website redesign', 
  'Branding & identity', 'Design prototype', 'Front-end development', 
  'Back-end development', 'CMS integration', 'Speed optimization', 
  'Custom web portals', 'UX audit & discovery', 'User research & interviews', 
  'Competitor analysis', 'Usability testing', 'Product strategy', 
  'MVP development', 'Go-to-market design', 'App Store deployment', 
  'Visual identity refresh', 'Design system engineering'
];

export default function Footer() {
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  return (
    <footer className="footer-white">
      <div className="footer-main-container">
        
        {/* Top Section */}
        <div className="footer-top-row">
          
          {/* Column 1: Vertical Page Links */}
          <div className="footer-nav-col">
            <ul className="footer-vertical-links">
              {PAGE_LINKS.map((link, idx) => (
                <li key={idx}>
                  {link.to ? (
                    <Link to={link.to}>{link.label}</Link>
                  ) : (
                    <a href={link.href}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Social Media Grid */}
          <div className="footer-social-col">
            <div className="social-grid">
              
              {/* Behance */}
              <a href="#" className="social-box" aria-label="Behance">
                <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.22 17.53c-1.32 0-2.4-.41-3.21-1.21-.8-.8-1.2-1.85-1.2-3.14 0-1.38.38-2.45 1.13-3.2.76-.76 1.77-1.14 3.03-1.14 1.25 0 2.22.37 2.92 1.1.7.74 1.05 1.77 1.05 3.09v1.23H5.06c.04.75.29 1.33.73 1.75.44.42 1 .63 1.67.63.63 0 1.18-.12 1.63-.38.45-.25.81-.62 1.08-1.12l1.92.83c-.49.91-1.18 1.6-2.07 2.07-.89.47-1.92.7-3.1.7zm-.26-6.6c-.53 0-.96.16-1.28.47-.32.32-.51.74-.56 1.25h3.62c-.02-.51-.18-.93-.48-1.25-.3-.32-.73-.47-1.3-.47zm9.64 6.6c-1.37 0-2.47-.37-3.29-1.11-.82-.74-1.23-1.8-1.23-3.17 0-1.36.42-2.42 1.25-3.17.84-.75 1.95-1.12 3.32-1.12 1.35 0 2.44.37 3.25 1.12.81.75 1.22 1.8 1.22 3.17 0 1.38-.41 2.44-1.22 3.18-.81.74-1.9 1.11-3.25 1.11zm0-6.6c-.6 0-1.07.17-1.4.52-.33.35-.5.84-.5 1.48 0 .63.17 1.12.5 1.47.33.35.8.52 1.4.52.58 0 1.05-.17 1.38-.52.33-.35.5-.84.5-1.47 0-.64-.17-1.13-.5-1.48-.33-.35-.8-.52-1.38-.52zM15 6h5v1.2h-5z" />
                </svg>
              </a>

              {/* Dribbble */}
              <a href="#" className="social-box" aria-label="Dribbble">
                <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm7.747-10.407c-.073-.243-.448-1.4-1.743-2.31 1.206-.948 1.906-2.193 1.986-2.34-.09-.053-.948-.544-2.822-.163-.984-2.124-2.032-3.414-2.112-3.51-.08.096-1.393 1.705-2.613 4.225-2.22-.647-4.802-.638-5.32-.638-.053.076-.176.287-.272.545 1.144.025 3.738.163 6.002.83-1.06 2.394-2.164 4.44-2.336 4.757-.015.016-3.266-.995-5.918-.548.067.247.375 1.196 1.455 2.19 1.769-.323 4.417.447 5.17.68-.396.969-.877 1.988-1.229 2.709-.05.093 1.096.793 2.18.232.327-.678.847-1.717 1.272-2.628 2.062.695 3.864 2.213 3.964 2.302.08-.09 1.213-1.503 1.436-3.834-1.27-.08-2.646.126-3.874.577.404-.982.857-2.032 1.233-2.82.073-.15 1.922.44 3.785.342z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" className="social-box" aria-label="Instagram">
                <svg className="social-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="social-box" aria-label="LinkedIn">
                <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="social-box" aria-label="Facebook">
                <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>

              {/* Twitter/X */}
              <a href="#" className="social-box" aria-label="Twitter/X">
                <svg className="social-icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Column 3: Contact & Location Cards */}
          <div className="footer-contact-col">
            
            {/* Get In Touch Button */}
            <div className="footer-cta-wrapper">
              <a href="mailto:hello@nextin.agency" className="footer-get-in-touch-btn">
                GET IN TOUCH <span className="btn-arrow-right">→</span>
              </a>
            </div>

            {/* Locations Cards Grid */}
            <div className="locations-grid">
              
              {/* Estonia Card */}
              <div className="location-card">
                <div className="location-card-left">
                  {/* Estonia Flag SVG */}
                  <svg className="flag-svg" viewBox="0 0 9 6">
                    <rect width="9" height="2" fill="#0072CE" />
                    <rect y="2" width="9" height="2" fill="#000000" />
                    <rect y="4" width="9" height="2" fill="#FFFFFF" />
                  </svg>
                  <span className="location-name">ESTONIA, TALLINN</span>
                </div>
                <span className="location-arrow">→</span>
              </div>

              {/* Switzerland Card */}
              <div className="location-card">
                <div className="location-card-left">
                  {/* Switzerland Flag SVG */}
                  <svg className="flag-svg" viewBox="0 0 1 1">
                    <rect width="1" height="1" fill="#D52B1E" />
                    <rect x="0.4" y="0.2" width="0.2" height="0.6" fill="#FFFFFF" />
                    <rect x="0.2" y="0.4" width="0.6" height="0.2" fill="#FFFFFF" />
                  </svg>
                  <span className="location-name">SWITZERLAND, LUGANO</span>
                </div>
                <span className="location-arrow">→</span>
              </div>

              {/* USA Card */}
              <div className="location-card full-width-location">
                <div className="location-card-left">
                  {/* USA Flag SVG (Simplified) */}
                  <svg className="flag-svg" viewBox="0 0 19 10">
                    <rect width="19" height="10" fill="#B22234" />
                    <rect y="1.54" width="19" height="0.77" fill="#FFFFFF" />
                    <rect y="3.08" width="19" height="0.77" fill="#FFFFFF" />
                    <rect y="4.62" width="19" height="0.77" fill="#FFFFFF" />
                    <rect y="6.16" width="19" height="0.77" fill="#FFFFFF" />
                    <rect y="7.7" width="19" height="0.77" fill="#FFFFFF" />
                    <rect y="9.24" width="19" height="0.76" fill="#FFFFFF" />
                    <rect width="7.6" height="5.38" fill="#3C3B6E" />
                  </svg>
                  <span className="location-name">USA, DOVER</span>
                </div>
                <span className="location-arrow">→</span>
              </div>

            </div>

          </div>

        </div>

        {/* Middle Section: Policies and Copyright */}
        <div className="footer-middle-row">
          <div className="footer-policies">
            <Link to="/terms-of-use">TERMS OF USE</Link>
            <span className="policy-divider">/</span>
            <Link to="/privacy-policy">PRIVACY POLICY</Link>
            <span className="policy-divider">/</span>
            <Link to="/cookie-policy">COOKIES POLICY</Link>
          </div>
          <div className="footer-copyright">
            NEXTIN &copy; {new Date().getFullYear()}
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="footer-badges-row">
          
          {/* Badge 1: HIPAA */}
          <div className="badge-item">
            <svg className="badge-logo-svg" viewBox="0 0 100 100">
              <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="#000000" strokeWidth="2.5" fill="none" />
              <text x="50" y="42" textAnchor="middle" fontSize="10" fontWeight="700" fill="#000000">COMPLIANCY</text>
              <text x="50" y="54" textAnchor="middle" fontSize="12" fontWeight="800" fill="#000000" letterSpacing="0.1em">HIPAA</text>
              <text x="50" y="68" textAnchor="middle" fontSize="8" fontWeight="600" fill="#888888">MONITORED</text>
            </svg>
          </div>

          {/* Badge 2: NN/g */}
          <div className="badge-item">
            <svg className="badge-logo-svg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="#000000" strokeWidth="2.5" fill="none" />
              <text x="50" y="42" textAnchor="middle" fontSize="14" fontWeight="800" fill="#000000">NN/g</text>
              <line x1="25" y1="48" x2="75" y2="48" stroke="#000000" strokeWidth="1.5" />
              <text x="50" y="64" textAnchor="middle" fontSize="9" fontWeight="700" fill="#000000" letterSpacing="0.05em">UX CERTIFIED</text>
            </svg>
          </div>

          {/* Badge 3: Top Firm */}
          <div className="badge-item">
            <svg className="badge-logo-svg" viewBox="0 0 100 100">
              <path d="M15,10 L85,10 L85,55 C85,75 50,90 50,90 C50,90 15,75 15,55 Z" stroke="#000000" strokeWidth="2.5" fill="none" />
              <text x="50" y="40" textAnchor="middle" fontSize="11" fontWeight="800" fill="#000000" letterSpacing="0.05em">TOP FIRM</text>
              <line x1="25" y1="48" x2="75" y2="48" stroke="#000000" strokeWidth="1.5" />
              <text x="50" y="62" textAnchor="middle" fontSize="12" fontWeight="700" fill="#000000">2026</text>
            </svg>
          </div>

          {/* Badge 4: Webflow Experts */}
          <div className="badge-item">
            <div className="webflow-badge-content">
              <span className="webflow-w-logo">w</span>
              <span className="webflow-expert-txt">webflow <span className="expert-light">experts</span></span>
            </div>
          </div>

          {/* Badge 5: DesignRush */}
          <div className="badge-item">
            <div className="designrush-badge-content">
              <span className="designrush-arrow-box">▲</span>
              <div className="designrush-text-wrapper">
                <span className="dr-val">40 REVIEWS</span>
                <span className="dr-lbl">ON DESIGNRUSH</span>
              </div>
            </div>
          </div>

          {/* Badge 6: Clutch */}
          <div className="badge-item">
            <div className="clutch-badge-content">
              <span className="clutch-title">Clutch</span>
              <div className="stars-wrapper">★★★★★</div>
              <span className="rating-lbl">5.0 RATING</span>
            </div>
          </div>

        </div>

       
        <div className="footer-accordion-row">
          <button 
            className="accordion-toggle-btn"
            onClick={() => setIsServicesExpanded(!isServicesExpanded)}
            aria-expanded={isServicesExpanded}
          >
            <span className="accordion-title">
              All services <span className="services-count">21</span>
            </span>
            <span className={`accordion-arrow-icon ${isServicesExpanded ? 'expanded' : ''}`}>
              ▼
            </span>
          </button>

          <div className={`accordion-panel-content ${isServicesExpanded ? 'open' : ''}`}>
            <div className="services-accordion-grid">
              {ALL_SERVICES_21.map((service, index) => {
                if (service === 'Website design') {
                  return (
                    <Link to="/services/website" key={index} className="accordion-service-link">
                      {service}
                    </Link>
                  );
                }
                return (
                  <a href="#services-section" key={index} className="accordion-service-link">
                    {service}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}