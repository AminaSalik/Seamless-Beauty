import React, { useState, useEffect, useRef } from 'react';
import "../assets/style/About.css";

const StatCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const countRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setHasStarted(true);
            },
            { threshold: 0.5 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasStarted) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }, [hasStarted, end, duration]);

    return <span ref={countRef}>{count}{suffix}</span>;
};

export default function About() {
    useEffect(() => {
        const observerOptions = { threshold: 0.1 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-20 lg:py-32  feature-reveal-section">
            <div className="liquid-blur"></div>

            <div className="about-v2-container">
                <div className="about-v2-header reveal">
                    <div className="tagline-pill">Est. 2024 — Future of Beauty</div>
                    <h2 className="display-text">
                        Redefining <span className="gradient-text">Elegance</span> <br />
                        Through Digital <span className="text-stroke">Innovation</span>
                    </h2>
                </div>

                <div className="bento-grid">
                    <div className="bento-card vision reveal delay-1">
                        <div className="card-content">
                            <h3>Our Vision</h3>
                            <p>We combine AI-driven scheduling with human artistic touch.</p>
                            <div className="stat-number">
                                <StatCounter end={100} suffix="%" />
                                <span>Precision</span>
                            </div>
                        </div>
                    </div>

                    <div className="bento-card-group">
                        <div className="bento-card small reveal delay-2">
                            <div className="stat-icon">✦</div>
                            <div className="stat-info">
                                <h4><StatCounter end={15} suffix="K+" /></h4>
                                <p>Clients</p>
                            </div>
                        </div>

                        <div className="bento-card small reveal delay-3">
                            <div className="stat-icon">◈</div>
                            <div className="stat-info">
                                <h4><StatCounter end={50} suffix="+" /></h4>
                                <p>Artists</p>
                            </div>
                        </div>
                    </div>

                    <div className="bento-card experience reveal delay-4">
                        <div className="card-overlay-text">GLOW</div>
                        <div className="exp-content">
                            <span className="exp-label">Experience</span>
                            <div className="exp-value"><StatCounter end={12} suffix="+" /></div>
                            <p>Years of industry mastery</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}