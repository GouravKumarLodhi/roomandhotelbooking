import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}

        <section className="hero">
          <div className="hero-content">
            <span className="hero-badge">
              🏠 Student Living Made Easy
            </span>

            <h1>
              Find Your Perfect
              <br />
              <span>PG & Hostel</span>
            </h1>

            <p>
              Comfortable rooms, affordable prices and a
              secure place to stay. Everything you need in
              one place.
            </p>

            <div className="hero-buttons">
              <Link to="/rooms" className="primary-btn">
                Explore Rooms →
              </Link>

              <Link to="/signup" className="secondary-btn">
                Get Started
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-room-image">
              🛏️
            </div>

            <div className="hero-room-info">
              <div>
                <h3>Premium Rooms</h3>
                <p>Fully furnished</p>
              </div>

              <strong>₹6,000/mo</strong>
            </div>
          </div>
        </section>

        {/* Stats */}

        <section className="stats">
          <div>
            <h2>50+</h2>
            <p>Available Rooms</p>
          </div>

          <div>
            <h2>120+</h2>
            <p>Happy Students</p>
          </div>

          <div>
            <h2>15+</h2>
            <p>Facilities</p>
          </div>

          <div>
            <h2>4.8/5</h2>
            <p>Student Rating</p>
          </div>
        </section>

        {/* Features */}

        <section className="section">
          <div className="section-heading">
            <span>WHY STAYNEST?</span>

            <h2>
              Everything You Need
              <br />
              For A Comfortable Stay
            </h2>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🛏️</div>

              <h3>Comfortable Rooms</h3>

              <p>
                Fully furnished rooms designed for
                comfortable student living.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>

              <h3>Safe & Secure</h3>

              <p>
                CCTV surveillance and secure premises for
                your peace of mind.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📶</div>

              <h3>High Speed WiFi</h3>

              <p>
                Stay connected with fast internet for
                study and entertainment.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>

              <h3>Affordable Pricing</h3>

              <p>
                Quality accommodation at student-friendly
                prices.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="cta">
          <h2>Ready to Find Your New Home?</h2>

          <p>
            Explore our rooms and find the perfect place
            for your college life.
          </p>

          <Link to="/rooms" className="primary-btn">
            Browse Rooms →
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;