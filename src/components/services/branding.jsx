import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './branding.css';

function TypingTitle({ text, className }) {
  return <h1 className={className}>{text}</h1>;
}

const CHALLENGES = [
  {
    question: 'Is your branding inconsistent across platforms?',
    answer:
      'A clear and consistent brand image is essential for building trust and credibility. Our branding and identity services help you create a cohesive visual identity that enhances recognition and leaves a lasting impression.',
  },
  {
    question: 'Does your brand lack differentiation?',
    answer:
      'If your branding looks too similar to competitors, it can be hard to stand out. We create unique visuals that leave a lasting impression and set your business apart.',
  },
  {
    question: 'Are you preparing for growth or market expansion?',
    answer:
      'Rebranding is a key step when entering new markets or scaling your business. Our startup branding agency guides you through the process, ensuring your brand adapts smoothly and effectively.',
  },
];

const BENEFITS = [
  { num: '01', title: 'Enhanced recognition', desc: 'A clear and cohesive brand identity helps improve recognition by 23% across platforms.' },
  { num: '02', title: 'Improved customer loyalty', desc: 'A strong visual branding strategy helps build emotional connections with your audience.' },
  { num: '03', title: 'Stronger differentiation', desc: 'A strong brand identity is the key to standing out in the market and setting your business apart.' },
  { num: '04', title: 'Stronger market positioning', desc: 'A well-crafted brand presence helps position your company as an industry leader, attracting more customers.' },
  { num: '05', title: 'Consistent brand messaging', desc: 'Consistent branding creates a professional image, helping your audience recognize and connect with your brand.' },
  { num: '06', title: 'Increased brand equity', desc: 'A strong brand identity enhances perceived value, making it easier to attract investors, customers, and partnerships.' },
];

const PROCESS_STEPS = [
  {
    num: '01',
    label: 'Stakeholder interview',
    title: 'Aligning on business context and brand goals',
    desc: 'Our brand design service begins by understanding your business model, product roadmap, and brand challenges directly from your team.',
    steps: ['Internal team interviews', 'Brand perception gaps', 'Business and marketing goals', 'Key audience insights'],
    deliverables: ['Stakeholder brief', 'Goal alignment summary'],
  },
  {
    num: '02',
    label: 'Research & analysis',
    title: 'Uncovering opportunities through data and context',
    desc: 'We audit your current brand, study your competitors, and identify user expectations, shaping a brand strategy grounded in insight.',
    steps: ['Company identity design audit', 'Competitor analysis', 'User behaviour and trends', 'Market positioning snapshot'],
    deliverables: ['Research report', 'Visual audit', 'Competitor benchmarks'],
  },
  {
    num: '03',
    label: 'Moodboard',
    title: 'Defining the right image and branding direction',
    desc: 'Before designing anything final, we explore visual directions that align with your positioning, audience psychology, and product category.',
    steps: ['Visual tone exploration', 'Audience-appropriate styles', 'Market-differentiated aesthetics', 'Early colour and typography mapping'],
    deliverables: ['Visual moodboard', 'Art direction summary'],
  },
  {
    num: '04',
    label: 'Logo & visual identity',
    title: 'Designing an identity and branding system',
    desc: 'We create the building blocks of your brand, designed not just to look good, but to work across formats, channels, and internal teams.',
    steps: ['Logo and wordmark', 'Typography and colour system', 'Iconography and graphic language', 'Brand story alignment'],
    deliverables: ['Logo kit', 'Colour palettes', 'Font styles', 'Icon set'],
  },
  {
    num: '05',
    label: 'Brand assets',
    title: 'Creating templates and tools your team can use',
    desc: 'From pitch decks to social posts, we create flexible, ready-to-use image and branding assets — so your identity can scale across content and campaigns.',
    steps: ['Social media visuals', 'Deck and presentation templates', 'Campaign and ad layouts', 'Basic motion or animation assets'],
    deliverables: ['Asset pack', 'Template files', 'Animation snippets'],
  },
  {
    num: '06',
    label: 'Brand guidelines & delivery',
    title: 'Documenting and delivering everything for long-term use',
    desc: 'We provide full documentation, organized files, and training support for your team to enable them to apply the brand without hand-holding.',
    steps: ['Brand usage rules and examples', 'File organization and export', 'Team hand-off session', 'Rollout support'],
    deliverables: ['Brand guidelines', 'Complete logo and asset library', 'Usage documentation'],
  },
];

const FEATURED_CASES = [
  {
    tag: '#branding',
    title: 'MIRA Systems – branding and identity for intelligent systems with presence',
    client: 'MIRA Systems',
    region: 'UK',
    result: 'Distinctive positioning in AI space — achieved through branding and identity services',
    image: '/dashboard_preview.jpg',
  },
  {
    tag: '#branding',
    title: 'Scrambly – branding for a rewarded discovery platform for games and apps',
    client: 'Scrambly',
    region: 'Italy',
    result: 'Clearer brand positioning through branding and identity services',
    image: '/avatar-ash.jpg',
  },
];

export default function BrandingService() {
  useEffect(() => {
    document.title = 'Branding & Identity Services | NextIn';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const pinRef = useRef(null);
  const { scrollYProgress: pinProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  });

  const springProgress = useSpring(pinProgress, { stiffness: 55, damping: 9, mass: 0.9 });
  const coverY = useTransform(springProgress, [0, 1], ['100%', '0%'], { clamp: false });
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500, 850], [1, 1, 0]);
  const heroScale = useTransform(scrollY, [0, 500, 850], [1, 1, 0.96]);
  const heroY = useTransform(scrollY, [0, 850], [0, 200]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div className="branding-service-page" initial="hidden" animate="visible">
      {/* Hero pin + scroll reveal */}
      <div ref={pinRef} className="b-hero-pin-container">
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="b-dark-wrap">
          <Link to="/contact" className="b-reference-contact">Get in touch <span>→</span></Link>
          <div className="b-section-container">
            <div className="b-split-hero-container">

              <div className="b-left-sticky-col">
                <div className="b-showcase-collage">
                  <div className="b-collage-tile b-tile-guidelines">
                    <span className="b-tile-label">Brand Guidelines</span>
                    <div className="b-color-swatches">
                      <span /><span /><span /><span />
                    </div>
                  </div>
                  <div className="b-collage-tile b-tile-card">
                    <span className="b-card-brand">NextIn</span>
                    <span className="b-card-tag">Premium</span>
                  </div>
                  <div className="b-collage-tile b-tile-phone">
                    <img src="/dashboard_preview.jpg" alt="Brand app mockup" />
                  </div>
                  <div className="b-collage-tile b-tile-logo">
                    <span className="b-logo-mark">✦</span>
                  </div>
                  <div className="b-collage-tile b-tile-banner">
                    ALL BRANDING SERVICES ON YOUR PHONE.
                  </div>
                </div>
              </div>

              <div className="b-right-scroll-col">
                <div className="b-hero-top">
                  <span className="b-hero-tag">BRANDING AND IDENTITY AGENCY</span>
                  <TypingTitle
                    text="How our brand identity design agency builds clarity, structure, and long-term value"
                    className="b-hero-title-main"
                  />
                  <div className="b-hero-actions-row">
                    <Link to="/contact" className="b-btn-orange">
                      Let's talk
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                    <a href="#tech" className="b-btn-charcoal">
                      View our cases
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>

                <div className="b-hero-right-content">
                  <p className="b-hero-intro-text">
                    As a leading branding and identity agency, we craft distinctive visual narratives that resonate with your audience, ensuring your brand stands out in a competitive market.
                  </p>
                  <div className="b-investors-tagline">DESIGNING PRODUCTS BACKED BY TOP-TIER INVESTORS</div>
                  <div className="b-investors-row">
                    <div className="b-investor-item b-logo-techstars">techstars<span>_</span></div>
                    <div className="b-investor-item b-logo-yc"><div className="b-yc-box">Y</div> Combinator</div>
                    <div className="b-investor-item b-logo-ah"><span>a16z</span> andreessen horowitz</div>
                    <div className="b-investor-item b-logo-andmore">AND MORE</div>
                  </div>
                </div>

                <div className="b-stats-right-content">
                  <span className="b-stats-tagline">STUDIO IN NUMBERS</span>
                  <div className="b-stats-grid">
                    <div className="b-stat-cell"><div className="b-stat-number">500M+</div><div className="b-stat-label">investments raised by our clients</div></div>
                    <div className="b-stat-cell"><div className="b-stat-number">x2</div><div className="b-stat-label">avg projects per client — most come back</div></div>
                    <div className="b-stat-cell"><div className="b-stat-number">5.0</div><div className="b-stat-label">on clutch — 40+ reviews</div></div>
                    <div className="b-stat-cell"><div className="b-stat-number">35%</div><div className="b-stat-label">conversion lift — klickex case</div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        <motion.div className="b-hero-reveal-cover" style={{ y: coverY }} aria-hidden="true">
          <div className="b-curved-divider" style={{ backgroundColor: 'transparent' }}>
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path fill="#ffffff" d="M0,120 L0,0 C0,40 40,100 100,100 L500,100 C580,100 620,20 670,20 C690,20 705,40 705,80 L705,120 L735,120 L735,80 C735,40 740,20 770,20 C820,20 860,100 940,100 L1340,100 C1400,100 1440,40 1440,0 L1440,120 Z" />
            </svg>
          </div>
          <div className="b-cover-body" />
        </motion.div>
      </div>

      {/* Light sections */}
      <div className="b-light-sections-wrapper">
        <div className="b-light-wrap">
          <div className="b-section-container">

            {/* Challenges header */}
            <motion.section className="b-challenges-header" variants={itemVariants}>
              <span className="b-challenges-tag">CHALLENGES</span>
              <h2 className="b-challenges-title">
                You're here because your brand needs a strong identity, right?
              </h2>
            </motion.section>

            {/* Challenge rows */}
            <motion.section className="b-challenge-rows" variants={itemVariants}>
              {CHALLENGES.map((item, i) => (
                <div key={i} className="b-challenge-row">
                  <p className="b-challenge-question">{item.question}</p>
                  <p className="b-challenge-answer">{item.answer}</p>
                </div>
              ))}
            </motion.section>

          </div>
        </div>

        {/* Dark benefits section */}
        <section className="b-benefits-section">
          <div className="b-benefits-notch" aria-hidden="true" />
          <div className="b-section-container">
            <div className="b-benefits-header">
              <div>
                <span className="b-benefits-tag">HOW OUR BRANDING IDENTITY SERVICES CAN HELP</span>
                <h2 className="b-benefits-title">Discover the benefits of branding and how it can support your goals</h2>
              </div>
              <Link to="/contact" className="b-btn-white-outline">Get in touch →</Link>
            </div>
            <div className="b-benefits-grid">
              {BENEFITS.map((b) => (
                <div key={b.num} className="b-benefit-cell">
                  <span className="b-benefit-num">{b.num}</span>
                  <h3 className="b-benefit-title">{b.title}</h3>
                  <p className="b-benefit-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process section */}
        <section className="b-process-wrap">
          <div className="b-process-notch" aria-hidden="true" />
          <div className="b-section-container">
            <div className="b-process-intro">
              <span className="b-process-tag">INSIDE OUR COMPANY BRANDING SERVICES</span>
              <h2 className="b-process-intro-title">How our brand identity design agency builds clarity, structure, and long-term value</h2>
            </div>

            <div className="b-process-steps">
              {PROCESS_STEPS.map((step) => (
                <div key={step.num} className="b-process-step">
                  <div className="b-process-step-left">
                    <span className="b-process-step-label">{step.label}</span>
                    <span className="b-process-step-num">{step.num}</span>
                  </div>
                  <div className="b-process-step-right">
                    <h3 className="b-process-step-title">{step.title}</h3>
                    <p className="b-process-step-desc">{step.desc}</p>
                    <div className="b-key-steps">
                      <span className="b-key-steps-label">Key steps:</span>
                      <ul>
                        {step.steps.map((s) => (
                          <li key={s}><span className="b-step-star">*</span>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="b-deliverables">
                      <span className="b-deliverables-label">Deliverables</span>
                      <div className="b-deliverable-tags">
                        {step.deliverables.map((d) => (
                          <span key={d} className="b-deliverable-tag">{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="b-cta-section">
          <div className="b-cta-illustration" aria-hidden="true">
            <svg viewBox="0 0 120 120" fill="none"><circle cx="60" cy="60" r="50" stroke="#0d0d0d" strokeWidth="1.5" opacity="0.15"/><path d="M40 75 L60 45 L80 75" stroke="#FF5500" strokeWidth="2" fill="none"/><circle cx="60" cy="55" r="8" fill="#FF5500" opacity="0.8"/></svg>
          </div>
          <h2 className="b-cta-title">Looking to establish a powerful brand identity?</h2>
          <Link to="/contact" className="b-btn-orange b-cta-btn">Let's connect →</Link>
        </section>

        {/* Featured cases */}
        <section className="b-cases-section">
          <div className="b-section-container">
            <div className="b-cases-header">
              <div>
                <span className="b-cases-tag">FEATURED CASES</span>
                <h2 className="b-cases-title">Discover how we're driving change through innovative projects, strong partnerships, and measurable outcomes.</h2>
              </div>
              <Link to="/contact" className="b-btn-dark-pill">Get in touch →</Link>
            </div>

            {FEATURED_CASES.map((c, i) => (
              <div key={i} className="b-case-row">
                <div className="b-case-media">
                  <img src={c.image} alt={c.client} />
                </div>
                <div className="b-case-content">
                  <span className="b-case-tag">{c.tag}</span>
                  <h3 className="b-case-title">{c.title}</h3>
                  <div className="b-case-meta">
                    <span className="b-case-pill">{c.client}</span>
                    <span className="b-case-pill">{c.region}</span>
                  </div>
                  <p className="b-case-result"><strong>Results</strong> — {c.result}</p>
                  <a href="#tech" className="b-case-explore">Explore →</a>
                </div>
              </div>
            ))}

            <div className="b-cases-footer">
              <a href="#tech" className="b-explore-all">Explore All Cases →</a>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
