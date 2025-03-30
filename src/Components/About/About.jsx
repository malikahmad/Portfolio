import React, { useEffect, useState } from "react";
import "./About.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import profileImg from "../../assets/profile_img.png";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  const skills = [
    { name: "HTML & CSS", level: "100%", desc: "Expert in responsive design" },
    { name: "JavaScript", level: "65%", desc: "Advanced scripting skills" },
    { name: "React JS", level: "60%", desc: "Building dynamic UIs" },
    { name: "Node JS", level: "50%", desc: "Server-side rendering expertise" },
  ];

  const handleSkillClick = (skill) => {
    setTooltip(skill);
  };

  return (
    <div className={`about ${isVisible ? "show" : ""}`} id="about">
      <div className="about-title">
        <h1>About Me</h1>
        <img src={theme_pattern} alt="Decorative theme pattern" />
      </div>

      <div className="about-section">
        <div className="about-left">
          <img src={profileImg} alt="Malik Ahmad Profile" />
        </div>

        <div className="about-right">
          <div className="about-para">
            <p>
              I am an experienced Frontend Developer with over a decade of
              professional expertise in the field.
            </p>
            <p>
              My passion for frontend development is reflected in my extensive
              experience and dedication.
            </p>
          </div>

          <div className="about-skills">
            {skills.map((skill, index) => (
              <div
                className="about-skill"
                key={index}
                style={{ "--skill-level": skill.level }}
                onClick={() => handleSkillClick(skill)}
              >
                <p>{skill.name}</p>
                <hr />
                {tooltip === skill && (
                  <span className="tooltip">{skill.desc}</span>
                )}
              </div>
            ))}
          </div>

          <div className="about-achievements">
            {[
              { count: "2+", label: "YEARS OF EXPERIENCE" },
              { count: "50+", label: "PROJECTS COMPLETED" },
              { count: "30+", label: "HAPPY CLIENTS" },
            ].map((item, index) => (
              <div
                className="about-achievement"
                key={index}
                onClick={() => alert(`${item.label}: ${item.count}`)}
              >
                <h1>{item.count}</h1>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;