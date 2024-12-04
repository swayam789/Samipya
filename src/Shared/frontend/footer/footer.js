import React, { useEffect } from 'react';
import { FaMapMarkerAlt,FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    useEffect(() => {
        // Initialize particles.js
        if (window.particlesJS) {
            window.particlesJS('particles-js', {
                particles: {
                    number: { value: 100, density: { enable: true, value_area: 1000 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: {
                        value: 0.8,
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
                    },
                    size: {
                        value: 2,
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
                    },
                    lineLinked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                    }
                },
                interactivity: {
                    detectOn: "canvas",
                    events: {
                        onHover: { enable: true, mode: "repulse" },
                        onClick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }
    }, []);
    return (
        <footer className="footer">
        <div className="particles-bg" id="particles-js"></div>
        <div className="containera">
            <div className="footer-grid">
                <div className="footer-section">
                    <h3>About Samipya</h3>
                    <h4>Find local stores selling what you need in seconds.</h4>
                    <div className="social-links">
                        <a href="https://facebook.com/samipya" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://twitter.com/samipya" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                        <a href="https://instagram.com/samipya" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://linkedin.com/company/samipya" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/about_us">About Us</Link></li>
                        <li><Link to="/contact_us">Contact</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/Admin">Developer</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <ul className="contact-info1">
                        <li><FaMapMarkerAlt /> Bharatpur, Chitwan, Nepal</li>
                        <li><FaPhone /> +977 9821894320</li>
                        <li><FaEnvelope /> info.samipyaa@gmail.com</li>
                    </ul>
                </div>
            </div>
            
        </div>
        <div className="footer-bottom">
                <p>&copy; 2024 Samipya. All rights reserved.</p>
            </div>
    </footer>
    );
};

export default Footer;