import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './website.css';

// Typewriter Title Helper
function TypingTitle({ text, className }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        index++;
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 25); // Typing speed

      return () => clearInterval(interval);
    }, 450); // Small initial delay

    return () => clearTimeout(delayTimeout);
  }, [text]);

  return (
    <h1 className={className}>
      {displayedText}
      {!isComplete && <span className="w-typing-cursor">|</span>}
    </h1>
  );
}

export default function WebsiteService() {
  useEffect(() => {
    // Set document title and scroll to top on mount
    document.title = 'Website Design & Development | NextIn';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Framer Motion Animation Configs
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      className="website-service-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ========================================================
         1. DARK SECTION (Sticky Hero with single image and scrolling copy)
         ======================================================== */}
      <div className="w-dark-wrap">
        <div className="w-section-container">
          
          <div className="w-split-hero-container">
            
            {/* Left Column (Sticky Mockup Card) */}
            <div className="w-left-sticky-col">
              <div className="w-dashboard-mockup-card">
                <img 
                  src="/dashboard_preview.jpg" 
                  alt="Web App Dashboard Mockup" 
                  className="w-dashboard-image"
                />
              </div>
            </div>

            {/* Right Column (Scrolling Text content) */}
            <div className="w-right-scroll-col">
              
              {/* Hero Top Headers */}
              <div className="w-hero-top">
                <span className="w-hero-tag">WEB APP DESIGN</span>
                
                {/* Typing title animation */}
                <TypingTitle 
                  text="Web app design that drives growth & user engagement" 
                  className="w-hero-title-main"
                />
                
                <div className="w-hero-actions-row">
                  <Link to="/contact" className="w-btn-orange">
                    Let's talk
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a href="#tech" className="w-btn-charcoal">
                    View our cases
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Intro Text & Investors */}
              <div className="w-hero-right-content">
                <p className="w-hero-intro-text">
                  We create intuitive, user-centric designs that simplify workflows, enhance usability, and boost conversions — ensuring your web app is both functional and future-proof.
                </p>
                
                <div className="w-investors-tagline">
                  DESIGNING PRODUCTS BACKED BY TOP-TIER INVESTORS
                </div>
                
                <div className="w-investors-row">
                  <div className="w-investor-item w-logo-techstars">
                    techstars<span>_</span>
                  </div>
                  <div className="w-investor-item w-logo-yc">
                    <div className="w-yc-box">Y</div> Combinator
                  </div>
                  <div className="w-investor-item w-logo-ah">
                    <span>a16z</span> andreessen horowitz
                  </div>
                  <div className="w-investor-item w-logo-andmore">
                    AND MORE
                  </div>
                </div>
              </div>

              {/* Numbers / Stats Grid */}
              <div className="w-stats-right-content">
                <span className="w-stats-tagline">STUDIO IN NUMBERS</span>
                
                <div className="w-stats-grid">
                  <div className="w-stat-cell">
                    <div className="w-stat-number">500M+</div>
                    <div className="w-stat-label">investments raised by our clients</div>
                  </div>
                  <div className="w-stat-cell">
                    <div className="w-stat-number">x2</div>
                    <div className="w-stat-label">avg projects per client — most come back</div>
                  </div>
                  <div className="w-stat-cell">
                    <div className="w-stat-number">5.0</div>
                    <div className="w-stat-label">on clutch — 40+ reviews</div>
                  </div>
                  <div className="w-stat-cell">
                    <div className="w-stat-number">35%</div>
                    <div className="w-stat-label">conversion lift — klickex case</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ========================================================
         2. TRANSITION WAVE SVG (Rounded Apple cleft cover style)
         ======================================================== */}
      <div className="w-curved-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,120 L0,0 C0,40 40,100 100,100 L500,100 C580,100 620,20 670,20 C690,20 705,40 705,80 L705,120 L735,120 L735,80 C735,40 740,20 770,20 C820,20 860,100 940,100 L1340,100 C1400,100 1440,40 1440,0 L1440,120 Z" />
        </svg>
      </div>

      {/* ========================================================
         3. LIGHT SECTION (Challenges & Unified Process / Methodologies)
         ======================================================== */}
      <div className="w-light-wrap">
        <div className="w-section-container">
          
          {/* Challenges Block */}
          <motion.section className="w-challenges-row" variants={itemVariants}>
            <div className="w-challenges-left">
              <span className="w-challenges-tag">CHALLENGES</span>
              <h2 className="w-challenges-title">
                We design web apps that solve problems, not create them
              </h2>
            </div>
            
            <div className="w-challenges-sub-col">
              <p className="w-challenges-question">
                Is your web app frustrating users with poor navigation and low engagement?
              </p>
              <p className="w-challenges-desc">
                A confusing interface, slow load times, and lack of intuitive design can drive users away. We create seamless, user-centric experiences with clear navigation, smart UI patterns, and accessibility best practices to keep users engaged and encourage retention.
              </p>
            </div>
          </motion.section>

          {/* Unified Process Block (UX Audits, Design Thinking, Wireframing, Methodologies) */}
          <motion.section className="w-process-section" variants={itemVariants}>
            <h2 className="w-process-title-main">Our Framework & Methodologies</h2>
            
            {/* UX Audits */}
            <div className="w-process-subsection-header" style={{ marginBottom: '24px' }}>
              <span className="w-challenges-tag">UX AUDITS</span>
            </div>
            <div className="w-l-ux-grid">
              <div className="w-l-ux-card">
                <span className="w-l-audit-num">01</span>
                <h3 className="w-l-audit-title">1. Define Goals and Analyze Data</h3>
                <p className="w-l-audit-desc">
                  Identify business objectives and review analytics to uncover user behavior patterns.
                </p>
              </div>
              <div className="w-l-ux-card">
                <span className="w-l-audit-num">02</span>
                <h3 className="w-l-audit-title">2. Evaluate User Experience</h3>
                <p className="w-l-audit-desc">
                  Assess navigation, usability, and task completion efficiency across key user flows.
                </p>
              </div>
              <div className="w-l-ux-card">
                <span className="w-l-audit-num">03</span>
                <h3 className="w-l-audit-title">3. Analyze Visual and Technical Design</h3>
                <p className="w-l-audit-desc">
                  Check consistency, responsiveness, accessibility, and performance metrics.
                </p>
              </div>
              <div className="w-l-ux-card">
                <span className="w-l-audit-num">04</span>
                <h3 className="w-l-audit-title">4. Prioritize Recommendations</h3>
                <p className="w-l-audit-desc">
                  Highlight critical issues, propose solutions, and create a roadmap for improvements.
                </p>
              </div>
            </div>

            {/* Design Thinking */}
            <div className="w-process-subsection-header" style={{ marginBottom: '24px' }}>
              <span className="w-challenges-tag">DESIGN THINKING</span>
            </div>
            <div className="w-l-dt-grid">
              <div className="w-l-dt-card">
                <div className="w-l-dt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 className="w-l-dt-title">Define the Problem</h3>
                <p className="w-l-dt-desc">
                  Clearly articulate the key challenges and objectives the website must address.
                </p>
              </div>
              <div className="w-l-dt-card">
                <div className="w-l-dt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.364l-.707.707M21 12h-1M4 12H3m3.364-6.636l-.707-.707M12 21v-1m-3 0h6m-3-11a4 4 0 00-4 4c0 2.5 2 3.5 2.5 5h3c.5-1.5 2.5-2.5 2.5-5a4 4 0 00-4-4z" />
                  </svg>
                </div>
                <h3 className="w-l-dt-title">Ideate Solutions</h3>
                <p className="w-l-dt-desc">
                  Brainstorm creative ideas to solve user problems and improve the website experience.
                </p>
              </div>
              <div className="w-l-dt-card">
                <div className="w-l-dt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="w-l-dt-title">Test and Iterate</h3>
                <p className="w-l-dt-desc">
                  Gather user feedback, evaluate usability, and refine the website iteratively.
                </p>
              </div>
            </div>

            {/* Wireframing */}
            <div className="w-l-wireframing-card">
              <div className="w-l-wireframing-content">
                <span className="w-l-wireframing-tag">wireframing</span>
                <p className="w-l-wireframing-title">
                  Wireframing is a critical step in the website design process, focusing on creating a visual blueprint of the site's structure and layout.
                </p>
              </div>
            </div>

            {/* Methodologies */}
            <div className="w-process-subsection-header" style={{ marginBottom: '24px' }}>
              <span className="w-challenges-tag">METHODOLOGIES</span>
            </div>
            <div className="w-l-methodology-grid">
              <div className="w-l-methodology-card">
                <span className="w-l-methodology-badge agile">Agile</span>
                <h3 className="w-l-methodology-title">Agile Development</h3>
                <p className="w-l-methodology-desc">
                  Methodologies in website design and development guide the process of creating functional, user-centric websites. Agile development emphasizes iterative cycles, collaboration, and adaptability to changing requirements, making it ideal for dynamic projects.
                </p>
              </div>
              <div className="w-l-methodology-card">
                <span className="w-l-methodology-badge waterfall">Waterfall</span>
                <h3 className="w-l-methodology-title">Waterfall Model</h3>
                <p className="w-l-methodology-desc">
                  The Waterfall model, on the other hand, follows a linear progression, ensuring each phase is completed before moving to the next, which suits projects with well-defined requirements.
                </p>
              </div>
            </div>

          </motion.section>

        </div>
      </div>
    </motion.div>
  );
}
