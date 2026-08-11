import { useEffect, useState } from "react";
import roomsData from "../data/rooms.json";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [city, setCity] = useState("All Cities");
  const [search, setSearch] = useState("");
  const [expandedCity, setExpandedCity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRooms(roomsData);
    setLoading(false);
  }, []);

  const normalizeText = (value) =>
    String(value || "").trim().toLowerCase();

  const availableRooms = rooms.filter(
    (room) => normalizeText(room.status) === "available"
  );

  const filteredRooms = availableRooms.filter((room) => {
    const cityMatch =
      city === "All Cities" ||
      normalizeText(room.city) === normalizeText(city);

    const searchMatch =
      room.title?.toLowerCase().includes(search.toLowerCase()) ||
      normalizeText(room.city).includes(search.toLowerCase());

    return cityMatch && searchMatch;
  });

  const cityRooms = expandedCity
    ? availableRooms.filter(
        (room) => normalizeText(room.city) === normalizeText(expandedCity)
      )
    : [];

  const handleCityCardClick = (cityName) => {
    setCity(cityName);
    setExpandedCity((current) =>
      current === cityName ? null : cityName
    );
  };

  const cityStats = Object.values(
    availableRooms.reduce((acc, room) => {
      const cityKey = room.city || "Unknown";
      if (!acc[cityKey]) {
        acc[cityKey] = {
          city: cityKey,
          total: 0,
          pgCount: 0,
          hostelCount: 0,
        };
      }

      acc[cityKey].total += 1;

      const type = room.roomType?.toLowerCase() || "";
      if (type.includes("pg")) {
        acc[cityKey].pgCount += 1;
      }
      if (type.includes("hostel")) {
        acc[cityKey].hostelCount += 1;
      }

      return acc;
    }, {})
  ).sort((a, b) => b.total - a.total);

  const cityQuickStats = ["Indore", "Bhopal"].map(
    (cityName) => {
      const stat = cityStats.find(
        (entry) => normalizeText(entry.city) === normalizeText(cityName)
      );
      return {
        city: cityName,
        total: stat?.total ?? 0,
        pgCount: stat?.pgCount ?? 0,
        hostelCount: stat?.hostelCount ?? 0,
      };
    }
  );

  const selectedCityLabel =
    city === "All Cities" ? "all cities" : city;

  return (
    <>
      <Navbar />

      <section className="rooms-page">

        <div className="rooms-header">
          <span>FIND YOUR STAY</span>

          <h1>
            Available PG & Hostel Rooms
          </h1>

          <p>
            Find comfortable and affordable rooms
            across major Indian cities.
          </p>

          <div className="room-summary">
            <strong>{filteredRooms.length}</strong> available room
            {filteredRooms.length !== 1 ? "s" : ""} in {selectedCityLabel}
          </div>
        </div>

        <div className="room-filters">

          <input
            type="text"
            placeholder="Search city or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={city}
            onChange={(e) => {
              const selected = e.target.value;
              setCity(selected);
              setExpandedCity(
                selected === "All Cities" ? null : selected
              );
            }}
          >
            <option>All Cities</option>
            <option>Indore</option>
            <option>Bhopal</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Jaipur</option>
            <option>Ahmedabad</option>
            <option>Chennai</option>
          </select>

        </div>

        <div className="city-cards">
          {cityQuickStats.map((stat) => (
            <button
              key={stat.city}
              className={`city-card ${expandedCity === stat.city ? "active" : ""}`}
              onClick={() => handleCityCardClick(stat.city)}
            >
              <h3>{stat.city}</h3>
              <p>
                <strong>{stat.total}</strong> available room
                {stat.total !== 1 ? "s" : ""}
              </p>
              <p>PGs: {stat.pgCount}</p>
              <p>Hostels: {stat.hostelCount}</p>
            </button>
          ))}
        </div>

        {expandedCity && (
          <div className="city-details">
            <div className="city-details-header">
              <h2>{expandedCity} room details</h2>
              <p>
                Showing {Math.min(
                  expandedCity === "Indore"
                    ? 6
                    : expandedCity === "Bhopal"
                    ? 12
                    : cityRooms.length,
                  cityRooms.length
                )} of {cityRooms.length} available rooms
              </p>
            </div>

            {cityRooms.length > 0 ? (
              <div className="city-details-grid">
                {cityRooms
                  .slice(
                    0,
                    expandedCity === "Indore"
                      ? 6
                      : expandedCity === "Bhopal"
                      ? 12
                      : cityRooms.length
                  )
                  .map((room) => (
                    <div
                      className="city-detail-card"
                      key={room.id}
                    >
                      <h4>{room.title}</h4>
                          <div className="detail-item">
                        <strong>Type:</strong> {room.roomType || "N/A"}
                      </div>
                      <div className="detail-item">
                        <strong>Sharing:</strong> {room.capacity || "N/A"}
                      </div>
                      {room.area && (
                        <div className="detail-item">
                          <strong>Area:</strong> {room.area}
                        </div>
                      )}
                      <div className="detail-item">
                        <strong>Rent:</strong> ₹{room.rent || "N/A"}/month
                      </div>
                      <div className="detail-item">
                        <strong>Status:</strong> {room.status || "N/A"}
                      </div>
                      <div className="detail-item">
                        <strong>Location:</strong> {room.city || "N/A"}
                      </div>
                      {room.description && (
                        <div className="detail-item">
                          <strong>Description:</strong> {room.description}
                        </div>
                      )}
                      {room.amenities?.length > 0 && (
                        <div className="detail-item">
                          <strong>Amenities:</strong> {room.amenities.join(", ")}
                        </div>
                      )}
                      <Link
                        to={`/rooms/${room.id}`}
                        className="room-link"
                      >
                        View details →
                      </Link>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>
                  No available rooms are currently listed for {expandedCity}.
                </p>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="loading">
            Loading rooms...
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="empty-state">
            <h2>No rooms found</h2>
            <p>
              Try another city or search term.
            </p>
          </div>
        ) : (
          <div className="rooms-grid">

            {filteredRooms.map((room) => (
              <div
                className="room-card"
                key={room.id}
              >

                <div className="room-image">

                  {room.image ? (
                    <img
                      src={room.image}
                      alt={room.title}
                    />
                  ) : (
                    <span>🏠</span>
                  )}

                  <span
                    className={
                      room.status === "Available"
                        ? "available-badge"
                        : "full-badge"
                    }
                  >
                    {room.status}
                  </span>

                </div>

                <div className="room-content">

                  <span className="room-city">
                    📍 {room.city}
                  </span>

                  <h3>{room.title}</h3>

                  <div className="room-summary-info">
                    <span className="room-summary-item">
                      <strong>Type:</strong> {room.roomType || "N/A"}
                    </span>
                    <span className="room-summary-item">
                      <strong>Sharing:</strong> {room.capacity || "N/A"}
                    </span>
                    {room.area && (
                      <span className="room-summary-item">
                        <strong>Area:</strong> {room.area}
                      </span>
                    )}
                    <span className="room-summary-item">
                      <strong>Status:</strong> {room.status}
                    </span>
                  </div>

                  <div className="room-bottom">

                    <div>
                      <strong>
                        ₹{room.rent}
                      </strong>

                      <span>/month</span>
                    </div>

                    <Link
                      to={`/rooms/${room.id}`}
                      className="view-room"
                    >
                      View →
                    </Link>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      <Footer />
    </>
  );
}

export default Rooms;