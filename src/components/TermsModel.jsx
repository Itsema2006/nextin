import { useEffect } from 'react';

export default function TermsModal({ isOpen, onClose }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay" onClick={onClose}>
      <div className="terms-modal-wrapper" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="terms-modal-header">
          <h2>Terms & Conditions</h2>
          <button className="terms-modal-close" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="terms-modal-body">
          <p className="terms-effective-date"><strong>Effective Date:</strong> April 3, 2026</p>
          <p className="terms-intro-paragraph">
            These Terms & Conditions govern your use of NextIn (Next Innovations) website, service information, blog resources, and integrated App Store-related pathways.
          </p>

          <hr className="terms-divider" />

          <div className="terms-section">
            <h3>1. Acceptance of Terms</h3>
            <p>By accessing or using this website, you agree to these Terms. If you disagree, you should stop using the site.</p>
          </div>

          <div className="terms-section">
            <h3>2. Permitted Use</h3>
            <p>You may use this site for lawful information, communication, and business inquiry purposes. You must not misuse site functionality, interfere with operations, or attempt unauthorized access.</p>
          </div>

          <div className="terms-section">
            <h3>3. Service and Content Availability</h3>
            <p>We may update, modify, suspend, or remove website content, service pages, or integrations at any time without prior notice.</p>
          </div>

          <div className="terms-section">
            <h3>4. App Store Integrations and Third-Party Tools</h3>
            <p>Where links or features connect to third-party app stores, APIs, libraries, payment processors, or embedded platforms, your use is subject to those third-party terms and policies.</p>
          </div>

          <div className="terms-section">
            <h3>5. Blog and Informational Disclaimer</h3>
            <p>Blog articles and technical posts are provided for general informational purposes only. They do not constitute legal, financial, compliance, or professional advice.</p>
          </div>

          <div className="terms-section">
            <h3>6. Intellectual Property Rights</h3>
            <p>All website design, branding, text, visuals, code snippets, and original content are owned or licensed by NextIn (Next Innovations), unless explicitly stated otherwise.</p>
          </div>

          <div className="terms-section">
            <h3>7. User Submissions</h3>
            <p>When you submit forms, messages, or feedback, you confirm that information is accurate and lawful, and that you have rights to provide such content.</p>
          </div>

          <div className="terms-section">
            <h3>8. External Links</h3>
            <p>Links to external resources are provided for convenience. We are not responsible for third-party content, service reliability, or legal compliance.</p>
          </div>

          <div className="terms-section">
            <h3>9. Limitation of Liability</h3>
            <p>To the maximum extent permitted by law, NextIn (Next Innovations) is not liable for indirect, incidental, special, consequential, or reliance-based losses resulting from use of this site or third-party integrations.</p>
          </div>

          <div className="terms-section">
            <h3>10. Indemnity</h3>
            <p>You agree to indemnify and hold harmless NextIn (Next Innovations) from claims arising from your misuse of the website, policy violations, or unlawful activity.</p>
          </div>

          <div className="terms-section">
            <h3>11. Governing Law and Jurisdiction</h3>
            <p>These Terms are governed by the laws of India. Disputes are subject to applicable Indian jurisdiction.</p>
          </div>

          <div className="terms-section">
            <h3>12. Updates to Terms</h3>
            <p>We may revise these Terms periodically. Revisions take effect once published on this page.</p>
          </div>

          <div className="terms-section">
            <h3>13. Contact</h3>
            <p>
              For legal questions about these Terms, please use our Contact page or reach out to us directly at{' '}
              <a href="mailto:hello@nextin.agency" className="terms-email-link">
                hello@nextin.agency
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="terms-modal-footer">
          <button className="terms-modal-accept-btn" onClick={onClose}>
            Close & Accept
          </button>
        </div>

      </div>
    </div>
  );
}
