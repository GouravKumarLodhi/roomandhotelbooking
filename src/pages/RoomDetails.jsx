import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import sampleRooms from "../data/rooms.json";

function RoomDetails() {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const localRoom = sampleRooms.find((item) => String(item.id) === String(id));
    if (localRoom) {
      setRoom(localRoom);
    } else {
      setError("Room not found locally.");
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!room) {
    return (
      <>
        <Navbar />
        <section className="empty-state">
          <h2>Room not found</h2>
          {error && <p>{error}</p>}
          <Link to="/rooms" className="back-link">
            ← Back to Rooms
          </Link>
        </section>
        <Footer />
      </>
    );
  }

  const imageUrl = room.image || room.thumbnail || room.images?.[0];
  const locationLabel = room.city || room.location || room.category || "India";
  const roomTypeLabel = room.roomType || room.category || "Hotel";
  const priceValue = room.rent || room.price || 0;
  const amenities = room.amenities?.length > 0
    ? room.amenities
    : [room.brand, room.category, room.stock ? `Stock: ${room.stock}` : null, room.rating ? `Rating: ${room.rating}` : null].filter(Boolean);

  return (
    <>
      <Navbar />

      <section className="room-details">
        <Link to="/rooms" className="back-link">
          ← Back to Rooms
        </Link>

        <div className="details-grid">
          <div className="details-image">
            {imageUrl ? (
              <img src={imageUrl} alt={room.title || room.name || "Room"} />
            ) : (
              <span>🏠</span>
            )}
          </div>

          <div className="details-content">
            <span className="room-city">📍 {locationLabel}</span>
            <h1>{room.title || room.name}</h1>
            <p className="details-description">{room.description}</p>

            <div className="price">
              ₹{priceValue}
              <span>/month</span>
            </div>

            <div className="details-info">
              <div>
                <strong>Room Type</strong>
                <span>{roomTypeLabel}</span>
              </div>
              {room.capacity && (
                <div>
                  <strong>Capacity</strong>
                  <span>{room.capacity} Sharing</span>
                </div>
              )}
              <div>
                <strong>Status</strong>
                <span>{room.status || "Available"}</span>
              </div>
            </div>

            <h3>Amenities</h3>
            <div className="amenities">
              {amenities.map((amenity, index) => (
                <span key={index}>✓ {amenity}</span>
              ))}
            </div>

            <Link to="/rooms" className="book-button">
              Back to Rooms
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default RoomDetails;
