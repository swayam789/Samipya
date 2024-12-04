import React, { useEffect } from 'react';
import './Career.css';
import { FaRocket, FaUsers, FaLightbulb, FaHeart, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import Footer from "../footer/footer";

const Career = () => {
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

    const benefits = [
        {
            id: 1,
            icon: <FaRocket />,
            title: "Growth Opportunities",
            description: "Accelerate your career with continuous learning and development programs."
        },
        {
            id: 2,
            icon: <FaUsers />,
            title: "Collaborative Culture",
            description: "Work with passionate individuals in an inclusive and supportive environment."
        },
        {
            id: 3,
            icon: <FaLightbulb />,
            title: "Innovation First",
            description: "Be part of a team that's reshaping the future of local commerce."
        },
        {
            id: 4,
            icon: <FaHeart />,
            title: "Great Benefits",
            description: "Competitive salary, health insurance, and flexible work arrangements."
        }
    ];

    const positions = [
        {
            id: 1,
            title: "Full Stack Developer",
            location: "Kathmandu, Nepal",
            type: "Full Time",
            description: "We're looking for an experienced Full Stack Developer to join our engineering team..."
        },
        {
            id: 2,
            title: "UI/UX Designer",
            location: "Kathmandu, Nepal",
            type: "Full Time",
            description: "Join our design team to create beautiful and intuitive user experiences..."
        },
        {
            id: 3,
            title: "Marketing Manager",
            location: "Kathmandu, Nepal",
            type: "Full Time",
            description: "Lead our marketing initiatives and help grow our user base..."
        }
    ];

    return (
        <div className="career-page">
            <div id="particles-js" className="particles-bg"></div>
            <section className="career-hero">
                <div className="hero-content">
                    <h1>Join Our Team</h1>
                    <p>Help us revolutionize local shopping experiences</p>
                </div>
            </section>

            <section className="why-join-us">
                <div className="containera">
                    <h2>Why Join Samipya?</h2><br/>
                    <div className="benefits-grid">
                        {benefits.map(benefit => (
                            <div key={benefit.id} className="benefit-card">
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="open-positions">
                <div className="containera">
                    <h2>Open Positions</h2>
                    <div className="positions-grid">
                        {positions.map(position => (
                            <div key={position.id} className="position-card">
                                <h3>{position.title}</h3>
                                <p className="location">
                                    <FaMapMarkerAlt /> {position.location}
                                </p>
                                <p className="type">
                                    <FaClock /> {position.type}
                                </p>
                                <p className="description">{position.description}</p>
                                <button className="apply-btn">Apply Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

       <Footer/>
        </div>
    );
};

export default Career;