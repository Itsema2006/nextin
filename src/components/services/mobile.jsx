import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './mobile.css';

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
      }, 25);

      return () => clearInterval(interval);
    }, 450);

    return () => clearTimeout(delayTimeout);
  }, [text]);

  return (
    <h1 className={className}>
      {displayedText}
      {!isComplete && <span className="m-typing-cursor">|</span>}
    </h1>
  );
}

export default function MobileService() {
  useEffect(() => {
    document.title = 'Mobile App Design & Development | NextIn';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const pinRef = useRef(null);
  const { scrollYProgress: pinProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  });

  const springProgress = useSpring(pinProgress, {
    stiffness: 55,
    damping: 9,
    mass: 0.9,
  });

  const coverY = useTransform(springProgress, [0, 1], ['100%', '0%'], { clamp: false });
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500, 850], [1, 1, 0]);
  const heroScale = useTransform(scrollY, [0, 500, 850], [1, 1, 0.96]);
  const heroY = useTransform(scrollY, [0, 850], [0, 200]);

  const [openAccordion, setOpenAccordion] = useState(null);

  const accordionData = [
    {
      id: 'ux-audits',
      title: 'UX AUDITS',
      content: 'We audit mobile interfaces specifically for thumb-zone accessibility, gesture navigation efficiency, simple onboarding flows, and logical mobile interactions to maximize user retention.'
    },
    {
      id: 'design-thinking',
      title: 'DESIGN THINKING',
      content: 'Our mobile design thinking process addresses platform-specific contexts. We define user constraints on the go, brainstorm touch-first solutions, and prototype gestures to ensure native-feeling app flows.'
    },
    {
      id: 'wireframing',
      title: 'WIREFRAMING',
      content: 'We create mobile screen maps and low-fidelity wireframes that outline screen-to-screen transitions, tab bar navigation structures, and interactive gesture triggers across iOS and Android.'
    },
    {
      id: 'aesthetics',
      title: 'AESTHETICS',
      content: 'We design premium mobile aesthetics utilizing platform-native design languages (Apple Human Interface Guidelines & Google Material Design). We specialize in custom dark modes, tactile button feel, and micro-interactions.'
    },
    {
      id: 'methodologies',
      title: 'METHODOLOGIES',
      content: 'Our mobile development process uses Agile sprints for continuous feature testing and deployment. We guide your app through sandbox testing, beta distribution (TestFlight/Google Play Console), and App Store submission cycles.'
    }
  ];

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
      className="mobile-service-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 1. PIN CONTAINER: hero pinned + rounded cover sliding over it */}
      <div ref={pinRef} className="m-hero-pin-container">
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="m-dark-wrap"
        >
          <div className="m-section-container">
            <div className="m-split-hero-container">

              {/* Left Column (Sticky Mockup Card with Custom 3D Geometric Wireframe) */}
              <div className="m-left-sticky-col">
                <div className="m-wireframe-container">
                  <svg className="m-hero-wireframe-svg" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Perspective axis lines */}
                    <line x1="250" y1="50" x2="250" y2="450" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
                    <line x1="50" y1="150" x2="450" y2="350" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
                    <line x1="450" y1="150" x2="50" y2="350" stroke="currentColor" strokeWidth="1" strokeOpacity="0.1" />
                    
                    {/* The 3D geometric shape */}
                    <path d="M250 80 L390 160 L390 320 L250 400 L110 320 L110 160 Z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                    <path d="M250 140 L350 200 L350 300 L250 360 L150 300 L150 200 Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                    
                    {/* Connectors */}
                    <line x1="250" y1="80" x2="250" y2="140" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                    <line x1="390" y1="160" x2="350" y2="200" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                    <line x1="390" y1="320" x2="350" y2="300" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                    <line x1="250" y1="400" x2="250" y2="360" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                    <line x1="110" y1="320" x2="150" y2="300" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
                    <line x1="110" y1="160" x2="150" y2="200" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />

                    {/* Inner vanishing/axis lines */}
                    <line x1="250" y1="140" x2="250" y2="360" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
                    <line x1="150" y1="200" x2="350" y2="300" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
                    <line x1="350" y1="200" x2="150" y2="300" stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" />
                    
                    {/* Orbit rings */}
                    <circle cx="250" cy="240" r="160" stroke="currentColor" strokeWidth="1" strokeOpacity="0.08" strokeDasharray="3 3" />
                    <circle cx="250" cy="240" r="190" stroke="currentColor" strokeWidth="1" strokeOpacity="0.04" />
                  </svg>
                </div>
              </div>

              <div className="m-right-scroll-col">
                <div className="m-hero-top">
                  <span className="m-hero-tag">MOBILE APP DEVELOPMENT</span>

                  <TypingTitle
                    text="Mobile app development that drives growth & user engagement"
                    className="m-hero-title-main"
                  />

                  <div className="m-hero-actions-row">
                    <Link to="/contact" className="m-btn-orange">
                      Let's talk
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a href="#tech" className="m-btn-charcoal">
                      View our cases
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="m-hero-right-content">
                  <p className="m-hero-intro-text">
                    We build native and cross-platform mobile apps with intuitive UX, smooth performance, and scalable architecture — ensuring your product delights users on iOS and Android.
                  </p>

                  <div className="m-investors-tagline">
                    DESIGNING PRODUCTS BACKED BY TOP-TIER INVESTORS
                  </div>

                  <div className="m-investors-row">
                    <div className="m-investor-item m-logo-techstars">
                      techstars<span>_</span>
                    </div>
                    <div className="m-investor-item m-logo-yc">
                      <div className="m-yc-box">Y</div> Combinator
                    </div>
                    <div className="m-investor-item m-logo-ah">
                      <span>a16z</span> andreessen horowitz
                    </div>
                    <div className="m-investor-item m-logo-andmore">
                      AND MORE
                    </div>
                  </div>
                </div>

                <div className="m-stats-right-content">
                  <span className="m-stats-tagline">STUDIO IN NUMBERS</span>

                  <div className="m-stats-grid">
                    <div className="m-stat-cell">
                      <div className="m-stat-number">500M+</div>
                      <div className="m-stat-label">investments raised by our clients</div>
                    </div>
                    <div className="m-stat-cell">
                      <div className="m-stat-number">x2</div>
                      <div className="m-stat-label">avg projects per client — most come back</div>
                    </div>
                    <div className="m-stat-cell">
                      <div className="m-stat-number">5.0</div>
                      <div className="m-stat-label">on clutch — 40+ reviews</div>
                    </div>
                    <div className="m-stat-cell">
                      <div className="m-stat-number">35%</div>
                      <div className="m-stat-label">conversion lift — klickex case</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>

        {/* Rounded cover panel — slides up over the hero as you scroll */}
        <motion.div className="m-hero-reveal-cover" style={{ y: coverY }} aria-hidden="true">
          <div className="m-curved-divider" style={{ backgroundColor: 'transparent' }}>
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path fill="#ffffff" d="M0,120 L0,0 C0,40 40,100 100,100 L500,100 C580,100 620,20 670,20 C690,20 705,40 705,80 L705,120 L735,120 L735,80 C735,40 740,20 770,20 C820,20 860,100 940,100 L1340,100 C1400,100 1440,40 1440,0 L1440,120 Z" />
            </svg>
          </div>
          <div className="m-cover-body" />
        </motion.div>
      </div>

      {/* 2. LIGHT SECTIONS — begin exactly where the cover left off */}
      <div className="m-light-sections-wrapper">
        <div className="m-light-wrap">
          <div className="m-section-container">

            {/* Challenges Block */}
            <motion.section className="m-challenges-row" variants={itemVariants}>
              <div className="m-challenges-left">
                <span className="m-challenges-tag">CHALLENGES</span>
                <h2 className="m-challenges-title">
                  We build mobile apps that solve problems, not create them
                </h2>
              </div>

              <div className="m-challenges-sub-col">
                <p className="m-challenges-question">
                  Is your mobile app losing users to clunky navigation and poor performance?
                </p>
                <p className="m-challenges-desc">
                  Slow load times, confusing gestures, and inconsistent UI across platforms can drive users away. We create seamless, user-centric mobile experiences with intuitive navigation, platform-native patterns, and accessibility best practices to keep users engaged and coming back.
                </p>
              </div>
            </motion.section>

            {/* Redesigned Process Section: Your Approach & Work Specifics Accordion Grid */}
            <motion.section className="m-details-grid" variants={itemVariants}>
              
              {/* Left Column: Title & Description */}
              <div className="m-details-left">
                <h2 className="m-details-title">
                  <span className="m-title-bold">Your</span> <span className="m-title-light">Approach</span>
                  <br />
                  <span className="m-title-bold">and</span> <span className="m-title-light">Work Specifics</span>
                </h2>
                
                <p className="m-details-desc">
                  Mobile app design and development involves planning (requirement gathering, platform scoping), design (wireframing, mobile UI styling, responsive prototypes), and development (native Swift/Kotlin or cross-platform Flutter/React Native coding). It requires tools like Figma for mockups, and testing on physical devices for performance, responsiveness, and OS guidelines. Post-launch, regular updates, bug fixes, and SDK migrations ensure a secure, high-performing app.
                </p>

                <a href="/#tech" className="m-view-works-btn">
                  <span>VIEW WORKS</span>
                  <div className="m-circle-arrow-right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>

              {/* Right Column: Interactive Accordion List */}
              <div className="m-details-right">
                <div className="m-accordion-list">
                  {accordionData.map((item) => {
                    const isOpen = openAccordion === item.id;
                    return (
                      <div key={item.id} className={`m-accordion-item ${isOpen ? 'is-open' : ''}`}>
                        <button 
                          className="m-accordion-trigger"
                          onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                          aria-expanded={isOpen}
                        >
                          <span className="m-accordion-title">{item.title}</span>
                          <div className="m-accordion-icon-circle">
                            <span className="m-accordion-icon-plus"></span>
                          </div>
                        </button>

                        <motion.div 
                          initial={false}
                          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="m-accordion-body">
                            <p>{item.content}</p>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.section>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
