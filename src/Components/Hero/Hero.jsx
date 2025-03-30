import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import "./Hero.css";
import profileImg from "../../assets/profile_img.png";
import resumePdf from "../../assets/Malik_Ahmad_Resume.pdf"; // Import your resume file

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  const handleConnectClick = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleResumeClick = () => {
    window.open(resumePdf, "_blank"); // Opens the resume in a new tab
  };

  return (
    <div className="hero" id="hero">
      {/* Profile Image */}
      <motion.img
        src={profileImg}
        alt="Profile of Malik Ahmad"
        className="hero-img"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Hero Text */}
      <h1>
        <span>Malik Ahmad</span> <br />
        Frontend Developer | Turning Ideas into Interactive Experiences
      </h1>
      <p>
        Passionate frontend developer from Lahore, Pakistan, specializing in 
        building interactive and user-friendly web applications.
      </p>

      {/* Action Buttons */}
      <div className="hero-action">
        <motion.button
          className="hero-connect"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConnectClick}
        >
          Connect with me
        </motion.button>
        <motion.button
          className="hero-resume"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleResumeClick}
        >
          My Resume
        </motion.button>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Connect with Me</h2>
            <p>malikahmad0034@gmail.com</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
