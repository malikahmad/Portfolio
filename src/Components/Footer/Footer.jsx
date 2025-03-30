import React, { useState, useCallback, useMemo } from 'react';
import './Footer.css';
import footerLogo from '../../assets/footer_logo.svg';
import userIcon from '../../assets/user_icon.svg';
import twitterIcon from '../../assets/twitter_icon.svg';
import linkedinIcon from '../../assets/linkedin_icon.svg';
import githubIcon from '../../assets/github_icon.svg';
import Whatapp from '../../assets/Whatapp.svg';
import Facebook from '../../assets/Facebook.svg';
import Insta from '../../assets/Insta.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [error, setError] = useState(null);

  const validateEmail = useCallback((email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  const handleSubscribe = useCallback(async () => {
    if (!validateEmail(email)) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus(null), 3000);
      return;
    }

    setIsSubscribing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus(null), 3000);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setSubscribeStatus('error');
    } finally {
      setIsSubscribing(false);
    }
  }, [email, validateEmail]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePopup = useCallback((message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(''), 5000);
  }, []);

  const socialLinks = useMemo(() => [
    { icon: twitterIcon, alt: 'Twitter', url: 'https://twitter.com', label: 'Visit Twitter profile' },
    { icon: linkedinIcon, alt: 'LinkedIn', url: 'https://linkedin.com', label: 'Visit LinkedIn profile' },
    { icon: githubIcon, alt: 'GitHub', url: 'https://www.linkedin.com/in/malik-ahmad-06abb31a4', label: 'Visit GitHub profile' },
    { icon: Whatapp, alt: 'WhatsApp', url: 'https://Wa.me/+923164902561', label: 'Contact via WhatsApp' },
    { icon: Insta, alt: 'Instagram', url: 'https://www.instagram.com/maik.ahmad.750', label: 'Visit Instagram profile' },
    { icon: Facebook, alt: 'Facebook', url: 'https://www.facebook.com/share/1A3M1Hva98/', label: 'Visit Facebook profile' },
  ], []);

  const footerLinks = useMemo(() => [
    { text: 'Terms of Service', onClick: () => handlePopup('These are the Terms of Service for using our website.') },
    { text: 'Privacy Policy', onClick: () => handlePopup('Our Privacy Policy explains how we handle your data securely.') },
    { text: 'Connect with me', href: '/contact' },
  ], [handlePopup]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !isSubscribing) {
      handleSubscribe();
    }
  }, [handleSubscribe, isSubscribing]);

  const renderContent = useCallback(() => {
    try {
      return (
        <footer className="footer" aria-label="Website Footer" data-testid="footer">
          <div className="footer-top">
            <div className="footer-top-left">
              <img src={footerLogo} alt="Malik Ahmad Logo" data-testid="footer-logo" />
              <p>
                Experienced Frontend Developer | React, JavaScript, UI/UX, Performance Optimization
              </p>
              <nav className="social-links" aria-label="Social Media Links">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={link.label}
                    data-testid={`social-link-${link.alt}`}
                  >
                    <img src={link.icon} alt={link.alt} />
                  </a>
                ))}
              </nav>
            </div>

            <div className="footer-top-right">
              <div className="footer-email-input">
                <img src={userIcon} alt="" aria-hidden="true" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Email address for newsletter subscription"
                  disabled={isSubscribing || subscribeStatus === 'success'}
                  data-testid="email-input"
                />
              </div>
              <button
                className="footer-subscribe"
                onClick={handleSubscribe}
                disabled={!email || isSubscribing || subscribeStatus === 'success'}
                aria-label="Subscribe to newsletter"
                data-testid="subscribe-button"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
              {subscribeStatus === 'success' && (
                <p className="subscribe-message success" role="alert" data-testid="success-message">
                  Subscribed successfully!
                </p>
              )}
              {subscribeStatus === 'error' && (
                <p className="subscribe-message error" role="alert" data-testid="error-message">
                  Please enter a valid email!
                </p>
              )}
            </div>
          </div>

          <hr aria-hidden="true" />

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Malik Ahmad. All rights reserved.</p>
            <nav className="footer-bottom-right" aria-label="Footer Navigation">
              {footerLinks.map((link, index) => (
                link.onClick ? (
                  <button
                    key={index}
                    onClick={link.onClick}
                    className="footer-link"
                    data-testid={`footer-link-${index}`}
                  >
                    {link.text}
                  </button>
                ) : (
                  <a
                    key={index}
                    href={link.href}
                    className="footer-link"
                    data-testid={`footer-link-${index}`}
                  >
                    {link.text}
                  </a>
                )
              ))}
              <button
                className="back-to-top"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                data-testid="back-to-top"
              >
                Back to Top ↑
              </button>
            </nav>
          </div>
          {popupMessage && (
            <div className="popup-message" data-testid="popup-message">{popupMessage}</div>
          )}
        </footer>
      );
    } catch (err) {
      setError(err);
      return <div>Something went wrong. Please try refreshing the page.</div>;
    }
  }, [email, subscribeStatus, isSubscribing, popupMessage, handleSubscribe, handleKeyPress, scrollToTop, socialLinks, footerLinks]);

  if (error) {
    return <div>Something went wrong. Please try refreshing the page.</div>;
  }

  return renderContent();
};

export default Footer;