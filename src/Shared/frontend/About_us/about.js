import React from 'react';
import './about.css';
import Footer from '../footer/footer';

const AboutB = () => {
        return (<div className='aboutr'>
            <section className="about-hero">
            <div className="container1">
                <h1>About Samipya</h1>
                <p>From Pin to Pinnacle - Connecting Local Shops with Local Shoppers</p>
            </div>
        </section>
        <div className='about-containers'>
     

<section className="our-story">
    <div className="container1">
        <div className="story-content">
            <h2>Our Story</h2>
            <p>Samipya was born from a simple observation: while e-commerce has made shopping convenient, it has also disconnected us from our local community. We believed there had to be a better way to combine the convenience of online shopping with the benefits of supporting local businesses.</p>
            <p>Founded in Nepal, Samipya aims to bridge the gap between local shops and digital convenience, making it easier for people to discover and shop from stores in their neighborhood.</p>
        </div>
        <div className="story-image">
            <img src="../public/images/about-story.jpg" alt="Samipya Story" />
        </div>
    </div>
</section>

<section className="mission-vision">
    <div className="container1">
        <div className="mission-box">
            <i className="fas fa-bullseye"></i>
            <h3>Our Mission</h3>
            <p>To empower local businesses and provide shoppers with a seamless way to discover and buy products from nearby stores, fostering stronger local economies.</p>
        </div>
        <div className="vision-box">
            <i className="fas fa-eye"></i>
            <h3>Our Vision</h3>
            <p>To create a world where local commerce thrives in the digital age, where every neighborhood shop has the tools to compete in the modern marketplace.</p>
        </div>
    </div>
</section>

<section className="values-section">
    <div className="container1">
        <h2>Our Values</h2>
        <div className="values-grid">
            <div className="value-card">
                <i className="fas fa-handshake"></i>
                <h3>Community First</h3>
                <p>Supporting and strengthening local communities through commerce</p>
            </div>
            <div className="value-card">
                <i className="fas fa-lightbulb"></i>
                <h3>Innovation</h3>
                <p>Continuously improving our platform to better serve our users</p>
            </div>
            <div className="value-card">
                <i className="fas fa-shield-alt"></i>
                <h3>Trust</h3>
                <p>Building reliable connections between shops and shoppers</p>
            </div>
            <div className="value-card">
                <i className="fas fa-heart"></i>
                <h3>Passion</h3>
                <p>Dedicated to making local shopping better for everyone</p>
            </div>
        </div>
    </div>
</section>

<section className="team-section">
    <div className="container1">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
            <div className="team-member">
                <div className="member-image">
                    <img src="../public/images/team-member1.jpg" alt="Team Member" />
                </div>
                <h3>Angad Thapa &nbsp;&nbsp;&nbsp;&nbsp; Bipesh Koirala &nbsp;&nbsp;&nbsp;&nbsp; Swayam Lama</h3>
            </div>
        </div>
    </div>
</section>

        
        </div><Footer />
        </div>
    );
};

export default AboutB;