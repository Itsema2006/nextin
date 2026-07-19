import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import './Contact.css';
import saasVideo from '../assets/tinyvid_optimized_1_c3e89d72e9ca2837d9e85643956c8544.mp4';
import healthcareVideo from '../assets/tinyvid_optimized_2_original-7d5a927fb8e1aed94b2f0dadb537fe63.mp4';
import edtechVideo from '../assets/tinyvid_optimized_5_original-c138f335ff5d89bfd76a54cb9b1b76f4.mp4';
import fintechVideo from '../assets/tinyvid_optimized_3_original-73b35d49f86d187eea5f51868f628bd4.mp4';


// Reusable Tilt Card Sub-component for 3D Hover Tilt Effects
function TiltCard({ children, className }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { stiffness: 120, damping: 18 };
  const springX = useSpring(rotateX, springConfig);
  const springY = useSpring(rotateY, springConfig);
  
  const translateZ = useMotionValue(0);
  const springZ = useSpring(translateZ, springConfig);
  
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rX = ((mouseY / height) - 0.5) * -12;
    const rY = ((mouseX / width) - 0.5) * 12;
    
    rotateX.set(rX);
    rotateY.set(rY);
    translateZ.set(10);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    translateZ.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
      }}
      className={`tilt-card-container ${className}`}
    >
      <div style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}

function TypingHeading({ text, className }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    // Small delay to ensure the section slide reveal is visible before typing starts
    const delayTimeout = setTimeout(() => {
      let index = 0;
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
    }, 350);

    return () => clearTimeout(delayTimeout);
  }, [isInView, text]);

  return (
    <h2 ref={elementRef} className={className} aria-label={text}>
      <span aria-hidden="true">
        {displayedText}
        {!isComplete && (
          <span 
            className="typing-cursor"
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1.05em',
              backgroundColor: 'currentColor',
              marginLeft: '4px',
              verticalAlign: 'middle',
              animation: 'blink 0.8s step-end infinite'
            }}
          />
        )}
      </span>
    </h2>
  );
}

const worldMapDots = [
  // North America
  { cx: 120, cy: 100 }, { cx: 140, cy: 100 }, { cx: 160, cy: 100 }, { cx: 180, cy: 100 }, { cx: 200, cy: 100 },
  { cx: 110, cy: 120 }, { cx: 130, cy: 120 }, { cx: 150, cy: 120 }, { cx: 170, cy: 120 }, { cx: 190, cy: 120 }, { cx: 210, cy: 120 },
  { cx: 100, cy: 140 }, { cx: 120, cy: 140 }, { cx: 140, cy: 140 }, { cx: 160, cy: 140 }, { cx: 180, cy: 140 }, { cx: 200, cy: 140 }, { cx: 220, cy: 140 },
  { cx: 130, cy: 160 }, { cx: 150, cy: 160 }, { cx: 170, cy: 160 }, { cx: 190, cy: 160 }, { cx: 210, cy: 160 },
  { cx: 160, cy: 180 }, { cx: 180, cy: 180 }, { cx: 200, cy: 180 },
  { cx: 200, cy: 200 },
  // South America
  { cx: 210, cy: 220 }, { cx: 230, cy: 220 }, { cx: 250, cy: 220 },
  { cx: 220, cy: 240 }, { cx: 240, cy: 240 }, { cx: 260, cy: 240 },
  { cx: 230, cy: 260 }, { cx: 250, cy: 260 }, { cx: 270, cy: 260 },
  { cx: 240, cy: 280 }, { cx: 260, cy: 280 },
  { cx: 250, cy: 300 }, { cx: 270, cy: 300 },
  { cx: 260, cy: 320 },
  { cx: 265, cy: 340 },
  // Europe
  { cx: 400, cy: 80 }, { cx: 420, cy: 80 }, { cx: 440, cy: 80 }, { cx: 460, cy: 80 },
  { cx: 390, cy: 100 }, { cx: 410, cy: 100 }, { cx: 430, cy: 100 }, { cx: 450, cy: 100 }, { cx: 470, cy: 100 },
  { cx: 380, cy: 120 }, { cx: 400, cy: 120 }, { cx: 420, cy: 120 }, { cx: 440, cy: 120 }, { cx: 460, cy: 120 }, { cx: 480, cy: 120 },
  { cx: 410, cy: 140 }, { cx: 430, cy: 140 }, { cx: 450, cy: 140 }, { cx: 470, cy: 140 },
  // Africa
  { cx: 390, cy: 180 }, { cx: 410, cy: 180 }, { cx: 430, cy: 180 }, { cx: 450, cy: 180 },
  { cx: 400, cy: 200 }, { cx: 420, cy: 200 }, { cx: 440, cy: 200 }, { cx: 460, cy: 200 },
  { cx: 420, cy: 220 }, { cx: 440, cy: 220 },
  { cx: 430, cy: 240 }, { cx: 450, cy: 240 },
  { cx: 440, cy: 260 },
  { cx: 445, cy: 280 },
  // Asia
  { cx: 500, cy: 80 }, { cx: 520, cy: 80 }, { cx: 540, cy: 80 }, { cx: 560, cy: 80 }, { cx: 580, cy: 80 }, { cx: 600, cy: 80 }, { cx: 620, cy: 80 }, { cx: 640, cy: 80 },
  { cx: 490, cy: 100 }, { cx: 510, cy: 100 }, { cx: 530, cy: 100 }, { cx: 550, cy: 100 }, { cx: 570, cy: 100 }, { cx: 590, cy: 100 }, { cx: 610, cy: 100 }, { cx: 630, cy: 100 }, { cx: 650, cy: 100 }, { cx: 670, cy: 100 },
  { cx: 480, cy: 120 }, { cx: 500, cy: 120 }, { cx: 520, cy: 120 }, { cx: 540, cy: 120 }, { cx: 560, cy: 120 }, { cx: 580, cy: 120 }, { cx: 600, cy: 120 }, { cx: 610, cy: 120 }, { cx: 630, cy: 120 }, { cx: 650, cy: 120 }, { cx: 670, cy: 120 }, { cx: 690, cy: 120 },
  { cx: 490, cy: 140 }, { cx: 510, cy: 140 }, { cx: 530, cy: 140 }, { cx: 550, cy: 140 }, { cx: 570, cy: 140 }, { cx: 590, cy: 140 }, { cx: 610, cy: 140 }, { cx: 630, cy: 140 }, { cx: 650, cy: 140 }, { cx: 670, cy: 140 },
  { cx: 500, cy: 160 }, { cx: 520, cy: 160 }, { cx: 540, cy: 160 }, { cx: 560, cy: 160 }, { cx: 580, cy: 160 }, { cx: 600, cy: 160 }, { cx: 620, cy: 160 }, { cx: 640, cy: 160 },
  { cx: 530, cy: 180 }, { cx: 550, cy: 180 }, { cx: 570, cy: 180 }, { cx: 590, cy: 180 }, { cx: 610, cy: 180 }, { cx: 630, cy: 180 },
  { cx: 560, cy: 200 }, { cx: 580, cy: 200 }, { cx: 600, cy: 200 }, { cx: 620, cy: 200 },
  { cx: 590, cy: 220 }, { cx: 610, cy: 220 },
  // Australia
  { cx: 660, cy: 260 }, { cx: 680, cy: 260 }, { cx: 700, cy: 260 },
  { cx: 650, cy: 280 }, { cx: 670, cy: 280 }, { cx: 690, cy: 280 }, { cx: 710, cy: 280 },
  { cx: 660, cy: 300 }, { cx: 680, cy: 300 }, { cx: 700, cy: 300 }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: '$10-$20K',
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [focusedFields, setFocusedFields] = useState({});
  const [invalidFields, setInvalidFields] = useState({});
  
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 120, damping: 18 };
  const blobX = useSpring(mouseX, springConfig);
  const blobY = useSpring(mouseY, springConfig);

  // Background Particles Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.15,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
        
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    drawParticles();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleFocus = (fieldName) => {
    setFocusedFields((prev) => ({ ...prev, [fieldName]: true }));
    setInvalidFields((prev) => ({ ...prev, [fieldName]: false }));
  };

  const handleBlur = (fieldName, e) => {
    setFocusedFields((prev) => ({ ...prev, [fieldName]: false }));
    
    if (e.target.required && !e.target.value) {
      setInvalidFields((prev) => ({ ...prev, [fieldName]: true }));
    } else if (e.target.type === 'email' && e.target.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(e.target.value)) {
        setInvalidFields((prev) => ({ ...prev, [fieldName]: true }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBudgetSelect = (budgetRange) => {
    setFormData((prev) => ({ ...prev, budget: budgetRange }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let hasError = false;
    const errors = {};
    
    if (!formData.name) {
      errors.name = true;
      hasError = true;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = true;
      hasError = true;
    }
    
    if (hasError) {
      setInvalidFields(errors);
      return;
    }

    setSubmitStatus('loading');
    
    setTimeout(() => {
      setSubmitStatus('success');
    }, 1800);
  };

  const resetFormState = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      budget: '$10-$20K',
    });
    setSelectedFile(null);
    setSubmitStatus('idle');
  };

  /* ------------------------------------------------------------------
     PINNED HERO -> SLIDING COVER SCROLL EFFECT
     - pinRef wraps the hero and stays extra-tall (200vh)
     - the hero itself is CSS `position: sticky; top: 0; height: 100vh`
       so it stays glued to the viewport while we scroll through the
       pin container's extra height
     - `coverY` drives a rounded, sticky "cover" panel from fully
       offscreen (100%) to fully covering the viewport (0%) as scroll
       progresses through the pin container
     - once the pin container ends, the real next section begins right
       where the cover left off, so the handoff looks seamless
  ------------------------------------------------------------------ */
  const pinRef = useRef(null);
  const { scrollYProgress: pinProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end start'],
  });

  // Overcollapse: route raw scroll progress through a loose, underdamped
  // spring so the cover overshoots its target and settles back, instead of
  // tracking the scrollbar 1:1. `clamp: false` on the transforms lets the
  // overshoot actually travel past 0%/1 before it springs back.
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

  // Expertise Tab Selector Data
  const expertiseData = {
    saas: {
      video: saasVideo,
      subheading: 'Scalable platforms for growth-focused teams',
      challenges: [
        'High churn from poor and fragmented UX',
        'Scaling product features without compromising speed',
        'Converting freemium users into paying subscribers'
      ],
      solutions: [
        'Streamlined flows to improve activation and retention',
        'Modular UX and design systems to scale features faster',
        'Clean billing and plan management UX to improve conversion'
      ]
    },
    healthcare: {
      video: healthcareVideo,
      subheading: 'HIPAA-compliant, patient-first health platforms',
      challenges: [
        'Rigid compliance and security requirements',
        'Complex medical dashboards and data overload',
        'Low patient engagement and adoption rates'
      ],
      solutions: [
        'Secure, compliant data architectures and encryption',
        'Simplified, patient-friendly diagnostic displays',
        'Empathetic onboarding flows and reminders'
      ]
    },
    edtech: {
      video: edtechVideo,
      subheading: 'Engaging learning hubs for global education',
      challenges: [
        'Drop-off in self-paced learning courses',
        'Cluttered curriculum navigation and resource sharing',
        'Lack of gamified feedback loops for students'
      ],
      solutions: [
        'Interactive, reward-based progress systems',
        'Clean, multi-tier curriculum visual paths',
        'Engaging quiz modules and live tutor chat integrations'
      ]
    },
    fintech: {
      video: fintechVideo,
      subheading: 'High-frequency trading and secure banking interfaces',
      challenges: [
        'High latency in charting and transactional updates',
        'Friction in KYC verification and onboarding',
        'Trust deficits during checkout and payment transfers'
      ],
      solutions: [
        'Real-time web socket dashboard updates',
        'Automated OCR and step-by-step verification flows',
        'Transparent fee indicators and secure gateway badges'
      ]
    }
  };
  const [activeTab, setActiveTab] = useState('saas');

  // Testimonials 3D Grid tilt motion values
  const gridRotateX = useMotionValue(60);
  const gridRotateY = useMotionValue(0);
  const springGridX = useSpring(gridRotateX, springConfig);
  const springGridY = useSpring(gridRotateY, springConfig);

  const handleTestimonialMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const rX = 60 + ((mouseY / rect.height) - 0.5) * -12;
    const rY = ((mouseX / rect.width) - 0.5) * 12;
    gridRotateX.set(rX);
    gridRotateY.set(rY);
  };

  const handleTestimonialMouseLeave = () => {
    gridRotateX.set(60);
    gridRotateY.set(0);
  };

  // Framer Motion Animation Variants
  const pageReveal = {
    hidden: { opacity: 0, backgroundColor: '#000000' },
    visible: { 
      opacity: 1, 
      backgroundColor: '#050505',
      transition: { duration: 0.8, ease: 'easeOut' } 
    }
  };

  const heroLineReveal = {
    hidden: { opacity: 0, y: 55, filter: 'blur(8px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.14,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: 80, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.12
      }
    }
  };

  const itemStagger = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageReveal}
      className="contact-page"
    >
      {/* Dynamic Background Layout Components */}
      <div className="noise-overlay"></div>
      <div className="gradient-mesh-bg">
        <div className="mesh-blob mesh-blob-1"></div>
        <div className="mesh-blob mesh-blob-2"></div>
        <div className="mesh-blob mesh-blob-3"></div>
      </div>
      <motion.div 
        style={{
          left: blobX,
          top: blobY,
        }}
        className="cursor-glow-blob"
      />
      <canvas ref={canvasRef} className="particles-canvas" />

      {/* 1. PIN CONTAINER: hero pinned + rounded cover sliding over it */}
      <div ref={pinRef} className="hero-pin-container">
        <motion.section 
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="contact-hero-section"
        >
          <motion.div 
            custom={0}
            variants={heroLineReveal}
            initial="hidden"
            animate="visible"
            className="contact-hero-tagline"
          >
            WE TURN BOLD IDEAS INTO SUCCESSFUL PRODUCTS
          </motion.div>
          
          <h1 className="contact-hero-title">
            <motion.span style={{ display: 'block' }} custom={1} variants={heroLineReveal} initial="hidden" animate="visible">
              Got an idea?
            </motion.span>
            <motion.span style={{ display: 'block', color: '#FF5500' }} custom={2} variants={heroLineReveal} initial="hidden" animate="visible">
              Let’s talk!
            </motion.span>
          </h1>

          <motion.div 
            variants={sectionReveal}
            initial="hidden"
            animate="visible"
            className="contact-grid"
          >
            {/* Left Column: Form Wrapper */}
            <motion.div variants={itemStagger} className="contact-form-wrapper">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="success-notification"
                    style={{
                      padding: '50px 40px',
                      borderRadius: '24px',
                      backgroundColor: 'rgba(17, 17, 17, 0.55)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: '20px',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 85, 0, 0.1)',
                      border: '1px solid rgba(255, 85, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FF5500',
                      marginBottom: '10px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 style={{ color: '#ffffff', fontSize: '26px', fontFamily: 'var(--heading)', fontWeight: '700' }}>
                      Proposal Received
                    </h3>
                    <p style={{ color: 'rgba(237, 237, 237, 0.6)', fontSize: '15px', lineHeight: '1.6', maxWidth: '440px' }}>
                      Your project brief has successfully landed in our inbox. Our design & tech leads will review it and follow up within the next 24 hours.
                    </p>
                    <button 
                      type="button" 
                      onClick={resetFormState}
                      className="budget-btn"
                      style={{ marginTop: '20px', minWidth: '150px' }}
                    >
                      SEND ANOTHER BRIEF
                    </button>
                  </motion.div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    {/* Name */}
                    <div className={`form-group ${focusedFields.name ? 'focused' : ''} ${invalidFields.name ? 'invalid-shake' : ''}`}>
                      <label htmlFor="name" className="form-label">YOUR NAME</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="ENTER YOUR NAME *"
                        value={formData.name}
                        onFocus={() => handleFocus('name')}
                        onBlur={(e) => handleBlur('name', e)}
                        onChange={handleInputChange}
                        required
                        autoComplete="name"
                        className="form-input"
                      />
                      <div className="form-input-glow" />
                      <div className="form-error">Please enter your name.</div>
                    </div>

                    {/* Email */}
                    <div className={`form-group ${focusedFields.email ? 'focused' : ''} ${invalidFields.email ? 'invalid-shake' : ''}`}>
                      <label htmlFor="email" className="form-label">YOUR EMAIL</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="ENTER YOUR EMAIL *"
                        value={formData.email}
                        onFocus={() => handleFocus('email')}
                        onBlur={(e) => handleBlur('email', e)}
                        onChange={handleInputChange}
                        required
                        autoComplete="email"
                        className="form-input"
                      />
                      <div className="form-input-glow" />
                      <div className="form-error">Please enter a valid email address.</div>
                    </div>

                    {/* Message */}
                    <div className={`form-group ${focusedFields.message ? 'focused' : ''}`}>
                      <label htmlFor="message" className="form-label">MESSAGE</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="TELL US ABOUT YOUR PROJECT"
                        value={formData.message}
                        onFocus={() => handleFocus('message')}
                        onBlur={(e) => handleBlur('message', e)}
                        onChange={handleInputChange}
                        className="form-textarea"
                      />
                      <div className="form-input-glow" />
                    </div>

                    {/* File Upload Attachment */}
                    <div className="file-attach-container">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <button type="button" onClick={triggerFileSelect} className="file-attach-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                        ATTACH FILE
                      </button>
                      {selectedFile && (
                        <span className="selected-file-name">
                          {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                        </span>
                      )}
                    </div>

                    {/* Budget Ranges */}
                    <div className="budget-section">
                      <label className="form-label" style={{ position: 'relative', top: '0', display: 'block', marginBottom: '10px' }}>
                        YOUR BUDGET FOR THIS PROJECT?
                      </label>
                      <div className="budget-grid">
                        {['UP TO $10K', '$10-$20K', '$20-$50K', '$50-$100K', '>$100K'].map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() => handleBudgetSelect(range)}
                            className={`budget-btn ${formData.budget === range ? 'active' : ''}`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Morphs */}
                    <div className="form-submit-container">
                      <button 
                        type="submit" 
                        disabled={submitStatus === 'loading'}
                        className="contact-submit-btn"
                        style={{
                          minWidth: submitStatus === 'loading' ? '180px' : '250px',
                          backgroundColor: submitStatus === 'loading' ? '#111111' : '#ffffff',
                          color: submitStatus === 'loading' ? '#ffffff' : '#000000',
                          border: submitStatus === 'loading' ? '1px solid rgba(255,255,255,0.08)' : 'none'
                        }}
                      >
                        {submitStatus === 'loading' ? (
                          <>
                            TRANSMITTING
                            <span style={{ display: 'inline-flex', gap: '3px', marginLeft: '5px' }}>
                              <span style={{ animation: 'pulse 1s infinite' }}>.</span>
                              <span style={{ animation: 'pulse 1s infinite 0.2s' }}>.</span>
                              <span style={{ animation: 'pulse 1s infinite 0.4s' }}>.</span>
                            </span>
                          </>
                        ) : (
                          <>
                            GET IN TOUCH
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Column: Contact Info Sidebar */}
            <motion.div variants={itemStagger} className="contact-sidebar">
              {/* Project Discuss Card */}
              <div className="info-card-group">
                <h3>Have a project to discuss?</h3>
                <TiltCard>
                  <div className="contact-profile-card">
                    <img 
                      src="/avatar-kseniia.jpg" 
                      alt="Kseniia Shalia" 
                      className="profile-avatar" 
                    />
                    <div className="profile-info">
                      <span className="profile-name">Kseniia Shalia</span>
                      <span className="profile-role">Account Executive</span>
                      <a href="mailto:hello@nextin.agency" className="profile-email-link">
                        hello@nextin.agency
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                    </div>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="profile-linkedin-icon"
                      aria-label="LinkedIn Profile"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </TiltCard>
              </div>

              {/* Partnership Card */}
              <div className="info-card-group">
                <h3>Have a partnership in mind?</h3>
                <TiltCard>
                  <div className="contact-profile-card">
                    <img 
                      src="/avatar-craig.jpg" 
                      alt="Craig Stone" 
                      className="profile-avatar" 
                    />
                    <div className="profile-info">
                      <span className="profile-name">Craig Stone</span>
                      <span className="profile-role">Co-Founder & CPO</span>
                      <a href="mailto:partner@nextin.agency" className="profile-email-link">
                        partner@nextin.agency
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                    </div>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="profile-linkedin-icon"
                      aria-label="LinkedIn Profile"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </TiltCard>
              </div>

              {/* Career Card */}
              <div className="info-card-group">
                <h3>Want to join the team?</h3>
                <TiltCard>
                  <div className="contact-profile-card">
                    <img 
                      src="/avatar-ash.jpg" 
                      alt="Ash Bryant" 
                      className="profile-avatar" 
                    />
                    <div className="profile-info">
                      <span className="profile-name">Ash Bryant</span>
                      <span className="profile-role">Design Director</span>
                      <a href="mailto:careers@nextin.agency" className="profile-email-link">
                        careers@nextin.agency
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                    </div>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="profile-linkedin-icon"
                      aria-label="LinkedIn Profile"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </TiltCard>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Rounded cover panel — slides up over the hero as you scroll */}
        <motion.div className="hero-reveal-cover" style={{ y: coverY }} aria-hidden="true">
          <div className="curved-divider" style={{ backgroundColor: 'transparent' }}>
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path fill="#ffffff" d="M0,120 L0,0 C0,40 40,100 100,100 L500,100 C580,100 620,20 670,20 C690,20 705,40 705,80 L705,120 L735,120 L735,80 C735,40 740,20 770,20 C820,20 860,100 940,100 L1340,100 C1400,100 1440,40 1440,0 L1440,120 Z" />
            </svg>
          </div>
          <div className="cover-body" />
        </motion.div>
      </div>

      {/* 2. LIGHT SECTIONS — begin exactly where the cover left off */}
      <div className="light-sections-wrapper">
        {/* 3. LIGHT SECTION - WORLDWIDE */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={sectionReveal}
          className="worldwide-section"
        >
          <div className="worldwide-container">
            <div className="section-intro-light">
              <motion.div variants={itemStagger} className="tagline-light">WORLDWIDE, WHERE YOU NEED US</motion.div>
              <TypingHeading 
                text="Collaborating across borders to deliver seamless solutions — wherever you are" 
                className="title-dark" 
              />
              <motion.p variants={itemStagger} className="desc-dark">
                You'll collaborate with project leads based near your region in the USA, and Switzerland, while your design & development team works across senior hubs in Europe. This setup gives you the proximity and trust of a local partner with the efficiency and speed of a global team.
              </motion.p>
            </div>

            <div className="worldwide-grid">
              {/* Locations Details */}
              <motion.div variants={itemStagger} className="locations-list">
                <div className="location-group">
                  <h3 className="location-group-title">North America & Switzerland</h3>
                  <div className="location-items">
                    <div className="location-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Client-facing strategy, consulting & communication
                    </div>
                    <div className="location-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Discovery phase, scoping & high-level architecture
                    </div>
                  </div>
                </div>

                <div className="location-group">
                  <h3 className="location-group-title">European Hubs</h3>
                  <div className="location-items">
                    <div className="location-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Senior engineering team & software developers
                    </div>
                    <div className="location-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      High-end UI/UX, 3D modelling & motion designers
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Dotted World Map */}
              <motion.div variants={itemStagger} className="map-canvas-container">
                <svg className="world-map-svg" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dotted grid continents */}
                  {worldMapDots.map((dot, idx) => (
                    <circle 
                      key={idx} 
                      className="map-dot" 
                      cx={dot.cx} 
                      cy={dot.cy} 
                      r="2.5" 
                      opacity={dot.cy > 250 ? 0.35 : 1}
                    />
                  ))}

                  {/* USA Hub Pin */}
                  <circle className="map-pin-glow" cx="210" cy="160" r="15" />
                  <circle className="map-pin" cx="210" cy="160" r="6" />

                  {/* Switzerland Pin */}
                  <circle className="map-pin-glow" cx="445" cy="135" r="15" />
                  <circle className="map-pin" cx="445" cy="135" r="6" />

                  {/* Europe Hub Pin */}
                  <circle className="map-pin-glow" cx="480" cy="150" r="15" />
                  <circle className="map-pin" cx="480" cy="150" r="6" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* 3.5 AREAS OF EXPERTISE SECTION */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={sectionReveal}
          className="expertise-section"
        >
          <div className="expertise-container">
            {/* Header info */}
            <div className="expertise-header">
              <span className="expertise-tagline">KEY INDUSTRIES</span>
              <h2 className="expertise-title">Our areas of expertise</h2>
            </div>

            {/* Tab buttons */}
            <div className="expertise-tabs">
              {Object.keys(expertiseData).map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`expertise-tab-btn ${activeTab === tabKey ? 'active' : ''}`}
                >
                  {tabKey}
                </button>
              ))}
            </div>

            {/* Content grid */}
            <div className="expertise-grid">
              {/* Left Column: Ambient Video Loop */}
              <div className="expertise-video-container">
                <video 
                  key={activeTab} // Resets/reloads video loop if needed, keeps it highly interactive!
                  className="expertise-video" 
                  src={expertiseData[activeTab].video} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                />
              </div>

              {/* Right Column: Challenges vs Solutions */}
              <div className="expertise-details">
                <h3 className="expertise-subheading">
                  {expertiseData[activeTab].subheading}
                </h3>
                
                <div className="expertise-columns">
                  <div>
                    <h4 className="expertise-column-title">CHALLENGES:</h4>
                    <ul className="expertise-points-list">
                      {expertiseData[activeTab].challenges.map((challenge, idx) => (
                        <li key={idx} className="expertise-point">{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="expertise-column-title">HOW WE SOLVE THEM:</h4>
                    <ul className="expertise-points-list">
                      {expertiseData[activeTab].solutions.map((solution, idx) => (
                        <li key={idx} className="expertise-point">{solution}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="expertise-explore-btn">
                  Explore
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6H13M13 6L8 1M13 6L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. LIGHT GREY SECTION - TESTIMONIALS */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={sectionReveal}
          onMouseMove={handleTestimonialMouseMove}
          onMouseLeave={handleTestimonialMouseLeave}
          className="testimonials-section"
        >
          <motion.div 
            style={{
              rotateX: springGridX,
              rotateY: springGridY,
              transformStyle: 'preserve-3d',
            }}
            className="testimonials-3d-grid"
          />
          <div className="testimonials-3d-grid-mask" />
          <div className="testimonials-container">
            <div className="testimonials-header-row">
              <div className="testimonials-intro">
                <motion.div variants={itemStagger} className="tagline-light">WHAT OUR CLIENTS SAY</motion.div>
                <motion.h2 variants={itemStagger} className="title-dark">5.0 is our average on clutch & designrush</motion.h2>
              </div>
              
              <motion.div variants={itemStagger} className="rating-badges">
                <div className="rating-badge-card">
                  <div className="rating-badge-logo">
                    <span className="clutch-c-icon">Clutch</span>
                  </div>
                  <div className="rating-stars-row">
                    <div className="rating-stars">★★★★★</div>
                    <span className="rating-value">5.0</span>
                  </div>
                </div>

                <div className="rating-badge-card">
                  <div className="rating-badge-logo">
                    <span className="designrush-text-icon">
                      DesignRush <span className="designrush-flame">✦</span>
                    </span>
                  </div>
                  <div className="rating-stars-row">
                    <div className="rating-stars">★★★★★</div>
                    <span className="rating-value">4.9</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="testimonials-grid">
              <motion.div variants={itemStagger} className="testimonial-card video-testimonial">
                <div className="testimonial-profile">
                  <img src="/avatar-craig.jpg" alt="Craig Tortolani" className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">Craig Tortolani</div>
                    <div className="testimonial-role">CPO at Dekryption Labs</div>
                  </div>
                </div>
                <div className="video-thumbnail-wrapper">
                  <img 
                    src="/avatar-craig.jpg" 
                    alt="Video feedback screenshot" 
                    className="video-thumbnail" 
                    style={{ filter: 'grayscale(15%) contrast(105%)' }}
                  />
                  <div className="video-play-btn">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemStagger} className="testimonial-card">
                <div className="testimonial-profile">
                  <img src="/avatar-ash.jpg" alt="Ash Bryant" className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">Ash Bryant</div>
                    <div className="testimonial-role">Founder of Hormn</div>
                  </div>
                </div>
                <p className="testimonial-quote">
                  "The design team is truly world-class, excelling in both user interface design and creating solutions optimized for conversion."
                  <span className="quote-decor">”</span>
                </p>
              </motion.div>

              <motion.div variants={itemStagger} className="testimonial-card video-testimonial">
                <div className="testimonial-profile">
                  <div className="testimonial-avatar" style={{ 
                    backgroundColor: '#5B8CFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: '700'
                  }}>
                    K
                  </div>
                  <div>
                    <div className="testimonial-name">KlickEx Team</div>
                    <div className="testimonial-role">Financial Services Partner</div>
                  </div>
                </div>
                <div className="video-thumbnail-wrapper">
                  <img 
                    src="/avatar-kseniia.jpg" 
                    alt="Video feedback screenshot" 
                    className="video-thumbnail"
                    style={{ filter: 'grayscale(100%) brightness(75%)' }}
                  />
                  <div className="video-play-btn">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemStagger} className="testimonial-card">
                <div className="testimonial-profile">
                  <div className="testimonial-avatar" style={{ 
                    backgroundColor: '#8B5CF6', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '18px',
                    fontWeight: '700'
                  }}>
                    G
                  </div>
                  <div>
                    <div className="testimonial-name">George Fry</div>
                    <div className="testimonial-role">Founder at Neap</div>
                  </div>
                </div>
                <p className="testimonial-quote">
                  "Their engineering precision is top-notch. Our application loading speed improved by 60% after their LCP optimization round."
                  <span className="quote-decor">”</span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}