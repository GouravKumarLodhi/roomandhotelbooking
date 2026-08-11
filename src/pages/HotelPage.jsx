import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import sampleRooms from "../data/rooms.json";
import "./HotelPage.css";

const cities = [
  "Indore",
  "Bhopal",
  "Delhi",
  "Mumbai",
  "Pune",
  "Bangalore",
  "Hyderabad",
  "Jaipur",
  "Ahmedabad",
  "Kolkata",
];

const fallbackImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
  "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800",
];

function HotelPage() {
  const [city, setCity] = useState("Indore");
  const [filteredRooms, setFilteredRooms] = useState(sampleRooms);

  useEffect(() => {
    filterRooms(city);
  }, [city]);

  const filterRooms = (selectedCity) => {
    const filtered = sampleRooms.filter((room) =>
      room.city?.toLowerCase().includes(selectedCity.toLowerCase())
    );
    setFilteredRooms(filtered);
  };

  const hasResults = filteredRooms.length > 0;

  return (
    <>
      <Navbar />

      <div className="hotel-page">
        <section className="hotel-hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <span className="hero-small">FIND YOUR PERFECT STAY</span>
              <h1>
                Hotels & Rooms
                <br />
                <span>For Your Comfort</span>
              </h1>
              <p>Find hotels and rooms in your favourite city.</p>
              <div className="hotel-search">
                <div className="search-field">
                  <label>Location</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    {cities.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={() => filterRooms(city)}>
                  Search Rooms
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="hotel-section">
          <div className="section-header">
            <div>
              <span>EXPLORE</span>
              <h2>Rooms in {city}</h2>
            </div>
            <p>{filteredRooms.length} rooms found</p>
          </div>

          {hasResults ? (
            <div className="hotel-grid">
              {filteredRooms.map((room) => {
                const imageUrl =
                  room.thumbnail || room.image || room.images?.[0] ||
                  fallbackImages[room.id % fallbackImages.length];
                const title = room.title || room.name || "Stay";
                const locationText =
                  room.location || room.city || room.category ||
                  room.brand || "India";
                const priceText = room.price
                  ? `₹${room.price}`
                  : room.rent
                  ? `₹${room.rent}`
                  : "N/A";
                const amenities =
                  room.amenities ||
                  [room.brand, room.category, room.stock ? `Stock ${room.stock}` : null, room.rating ? `Rating ${room.rating}` : null].filter(Boolean);

                return (
                  <div className="hotel-card" key={room.id}>
                    <div className="hotel-image">
                      <img src={imageUrl} alt={title} />
                      <div className="rating">⭐ {room.rating || "N/A"}</div>
                      <button className="heart-btn">♡</button>
                    </div>
                    <div className="hotel-content">
                      <div className="hotel-type">{room.category?.toUpperCase() || "HOTEL"}</div>
                      <h3>{title}</h3>
                      <p className="location">📍 {locationText}</p>
                      {room.description && <p className="address">{room.description}</p>}
                      {amenities.length > 0 && (
                        <div className="amenities">
                          {amenities.slice(0, 4).map((amenity, i) => (
                            <span key={i}>{formatAmenity(amenity)}</span>
                          ))}
                        </div>
                      )}
                      <div className="card-bottom">
                        <div>
                          <span className="starting">Price</span>
                          <strong>{priceText}</strong>
                        </div>
                        <Link to={`/rooms/${room.id}`} className="details-btn">
                          →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-box">
              <h3>No rooms found</h3>
              <p>Try another city.</p>
            </div>
          )}
        </section>

        <section className="hotel-section">
          <div className="section-header">
            <div>
              <span>ROOMS</span>
              <h2>Available Rooms</h2>
            </div>
            <p>{sampleRooms.length} rooms ready to book</p>
          </div>

          <div className="hotel-grid">
            {sampleRooms.map((room) => (
              <div className="hotel-card" key={room.id}>
                <div className="hotel-image">
                  <img src={room.image} alt={room.title} />
                  <div className="rating">⭐ 4.6</div>
                  <button className="heart-btn">♡</button>
                </div>
                <div className="hotel-content">
                  <div className="hotel-type">{room.roomType.toUpperCase()}</div>
                  <h3>{room.title}</h3>
                  <p className="location">📍 {room.city}</p>
                  <p className="address">{room.description}</p>
                  <div className="amenities">
                    {room.amenities.map((amenity, i) => (
                      <span key={i}>{amenity}</span>
                    ))}
                  </div>
                  <div className="card-bottom">
                    <div>
                      <span className="starting">Rent</span>
                      <strong>₹{room.rent}</strong>
                    </div>
                    <Link to={`/rooms/${room.id}`} className="details-btn">
                      →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

function formatAmenity(value) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default HotelPage;
