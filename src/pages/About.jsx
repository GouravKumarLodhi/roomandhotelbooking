import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">

        <div className="about-hero">
          <span>ABOUT STAYNEST</span>

          <h1>
            Making Student Living
            <br />
            Simple & Comfortable
          </h1>

          <p>
            StayNest helps students discover comfortable,
            affordable and secure PGs and hostels near
            their college.
          </p>
        </div>

        <div className="about-grid">

          <div className="about-box">
            <span>01</span>
            <h2>Easy Discovery</h2>
            <p>
              Search and explore rooms by city, price,
              room type and availability.
            </p>
          </div>

          <div className="about-box">
            <span>02</span>
            <h2>Transparent Pricing</h2>
            <p>
              View monthly rent and room details before
              making a booking.
            </p>
          </div>

          <div className="about-box">
            <span>03</span>
            <h2>Simple Booking</h2>
            <p>
              Select your preferred room and manage your
              booking from one place.
            </p>
          </div>

        </div>

        <div className="about-story">

          <div>
            <span>OUR MISSION</span>

            <h2>
              A better way to find
              your student home.
            </h2>
          </div>

          <p>
            Finding a good PG or hostel can be difficult
            for students moving to a new city. StayNest
            brings room discovery, availability and
            booking into one simple platform.
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default About;