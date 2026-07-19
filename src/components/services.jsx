import { useState } from 'react';
import Service3DShowcase from './Service3DShowcase';

const SERVICES_DATA = [
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    subtitle: 'Immersive Interfaces & Product Design',
    description: 'We craft human-centric digital interfaces that tell your brand\'s story. By merging visual elegance with intuitive user experiences, we build products that users love and return to.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M6 21h12" />
        <path d="M12 17v4" />
        <circle cx="12" cy="10" r="3" strokeDasharray="3 3" />
        <path d="M8 10h8" />
      </svg>
    ),
    deliverables: [
      'User Research & Persona Mapping',
      'High-Fidelity Prototyping',
      'Design System Engineering',
      'Usability Testing & Audits',
      'SaaS & Product Dashboard Design'
    ],
    technologies: ['Figma', 'Framer', 'Adobe CC', 'Principle', 'Spline'],
    metrics: {
      value: '140%',
      label: 'Average Engagement Increase'
    }
  },
  {
    id: 'web-dev',
    title: 'Next-Gen Web Dev',
    subtitle: 'Blazing Fast & Dynamic Implementations',
    description: 'We bring designs to life with clean, performant, and scale-ready code. Utilizing modern web architectures, we build responsive applications optimized for speed and engagement.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
    deliverables: [
      'React & Next.js Single Page Apps',
      'Interactive Motion & Scroll Animations',
      'Tailwind CSS & Vanilla CSS Styling',
      'API Integrations & Serverless Setup',
      'LCP & Core Web Vitals Optimization'
    ],
    technologies: ['React', 'Vite', 'Next.js', 'Web APIs', 'GSAP / Motion'],
    metrics: {
      value: '99.9%',
      label: 'Performance / Lighthouse Scores'
    }
  },
  {
    id: 'branding',
    title: 'Brand Strategy',
    subtitle: 'Cohesive Visual Identity & Voice',
    description: 'We construct iconic visual identities that resonate across all digital touchpoints. From logo design to copywriting, we define your voice and establish a memorable market presence.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="6" />
      </svg>
    ),
    deliverables: [
      'Brand Audit & Market Positioning',
      'Logo Systems & Typography',
      'Brand Voice & Content Strategy',
      'Marketing Guidelines & Assets',
      'Collateral & Stationary Design'
    ],
    technologies: ['Illustrator', 'Indesign', 'Figma', 'Keynote', 'Brandbook'],
    metrics: {
      value: '2.5x',
      label: 'Increase in Brand Recognition'
    }
  },
  {
    id: 'motion-3d',
    title: '3D & Motion Design',
    subtitle: 'Dynamic Animations & Spatial Asset Creation',
    description: 'We elevate digital spaces with custom 3D models and interactive motion graphics. Engage users at first sight with micro-interactions, custom animations, and spatial illustrations.',
    icon: (
      <svg className="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
        <path d="M12 21V11" />
        <path d="m21 8-9 5-9-5" />
        <path d="M12 11 3 6" />
        <path d="m12 11 9-5" />
      </svg>
    ),
    deliverables: [
      'Interactive 3D Website Elements',
      'Lottie & Vector Micro-animations',
      '3D Product Explainer Videos',
      'Hero Illustration Assets',
      'Scroll-Driven Camera Motion'
    ],
    technologies: ['Cinema 4D', 'Spline', 'After Effects', 'Lottie', 'Three.js'],
    metrics: {
      value: '3.8s',
      label: 'Longer Average Session Duration'
    }
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState('ui-ux');
  const activeService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <section id="services-section" className="services-section">
      <div className="section-header">
        <span className="section-tagline">OUR EXPERTISE</span>
        <h2 className="section-title">Services that power next-gen products</h2>
        <p className="section-desc">
          We blend state-of-the-art technology with visual excellence to create premium digital solutions.
        </p>
      </div>

      <div className="services-container">
        {/* Navigation Tabs (Left Sidebar on Desktop, Top Selector on Mobile) */}
        <div className="services-tabs">
          {SERVICES_DATA.map((service) => {
            const isActive = service.id === activeTab;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`service-tab-btn ${isActive ? 'active' : ''}`}
                aria-selected={isActive}
                role="tab"
              >
                <div className="tab-icon-wrapper">{service.icon}</div>
                <div className="tab-btn-text">
                  <span className="tab-btn-title">{service.title}</span>
                  <span className="tab-btn-subtitle">{service.subtitle}</span>
                </div>
                <div className="tab-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Details Pane (Right on Desktop, Bottom on Mobile) */}
        <div className="services-detail-pane">
          <div className="detail-glow-blob"></div>
          
          <div className="detail-content-wrapper">
            <div className="detail-header">
              <span className="detail-tag">{activeService.title}</span>
              <h3 className="detail-title">{activeService.subtitle}</h3>
              <p className="detail-desc">{activeService.description}</p>
            </div>

            <div className="detail-grid">
              <div className="detail-deliverables">
                <h4>WHAT WE DELIVER</h4>
                <ul>
                  {activeService.deliverables.map((item, index) => (
                    <li key={index}>
                      <svg className="bullet-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-sidebar">
                <Service3DShowcase activeTab={activeTab} />
                
                <div className="detail-stat-card">
                  <span className="stat-value">{activeService.metrics.value}</span>
                  <span className="stat-label">{activeService.metrics.label}</span>
                </div>

                <div className="detail-tech-stack">
                  <h4>TECHNOLOGIES & TOOLS</h4>
                  <div className="tech-chips">
                    {activeService.technologies.map((tech, index) => (
                      <span key={index} className="tech-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
