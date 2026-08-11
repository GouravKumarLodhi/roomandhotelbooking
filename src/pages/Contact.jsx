import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message submitted successfully!");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <section className="contact-page">

        <div className="contact-header">
          <span>GET IN TOUCH</span>

          <h1>
            We’d Love To
            <br />
            Hear From You
          </h1>

          <p>
            Have a question about a room or booking?
            Send us a message.
          </p>
        </div>

        <div className="contact-grid">

          <div className="contact-info">

            <div className="contact-item">
              <span>📍</span>

              <div>
                <h3>Our Location</h3>
                <p>
                  Indore, Madhya Pradesh, India
                </p>
              </div>
            </div>

            <div className="contact-item">
              <span>📞</span>

              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-item">
              <span>✉️</span>

              <div>
                <h3>Email</h3>
                <p>support@staynest.com</p>
              </div>
            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Send Message →
            </button>

          </form>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;