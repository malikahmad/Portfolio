// Contact.jsx
import React, { useState, useCallback } from 'react';
import './Contact.css';
import themePattern from '../../assets/theme_pattern.svg';
import mailIcon from '../../assets/mail_icon.svg';
import locationIcon from '../../assets/location_icon.svg';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    const submissionData = {
      ...formData,
      access_key: "25020c48-5438-4036-8101-0a099a3ab6bf",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      if (result.success) {
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <section className="contact" id="contact" aria-label="Contact Me">
      <div className="contact-title">
        <h1>Get in Touch</h1>
        <img src={themePattern} alt="" aria-hidden="true" />
      </div>

      <div className="contact-section">
        <div className="contact-left">
          <h2>Let's Talk</h2>
          <p>I'm currently available for new projects. Feel free to reach out!</p>
          <div className="contact-details">
            <address className="contact-detail">
              <a href="mailto:malikahmad0034@gmail.com" className="contact-link" aria-label="Email me">
                <img src={mailIcon} alt="" aria-hidden="true" />
                <span>malikahmad0034@gmail.com</span>
              </a>
            </address>
            <div className="contact-detail">
              <img src={locationIcon} alt="" aria-hidden="true" />
              <span>Lahore, Pakistan</span>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
                disabled={isSubmitting}
              />
            </div>

            <button type="submit" className="contact-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Now'}
            </button>

            {submitStatus === 'success' && <p className="success-message">Message sent successfully!</p>}
            {submitStatus === 'error' && <p className="error-message">Failed to send message. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
