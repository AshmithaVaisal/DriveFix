import React, { useState } from "react";

const Booking_Matrix = ({ bookings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const mechanics = [...new Set(bookings.map((b) => b.technician))];
  const slots = ["9AM", "11AM", "1PM", "3PM"]; // Example slots

  const getStatus = (tech, slot) => {
    const booking = bookings.find(
      (b) => b.technician === tech && b.time.startsWith(slot)
    );

    // Example: mark some prefilled booked slots
    if (!booking && (slot === "11AM" || (tech === "John Smith" && slot === "1PM"))) {
      return "Booked";
    }

    return booking ? booking.status : "Available";
  };

  const handleSlotClick = (tech, slot, status) => {
    if (status === "Available") {
      setSelectedSlot({ tech, slot });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 overflow-x-auto">
      <h2 className="text-lg font-bold mb-3">Book with your favorite mechanics</h2>
      <div className="grid grid-cols-5 gap-1 text-center text-xs">
        {/* Header row */}
        <div className="font-semibold py-2">Technician</div>
        {slots.map((slot, i) => (
          <div key={i} className="font-semibold py-2">
            {slot}
          </div>
        ))}

        {/* Mechanics rows */}
        {mechanics.map((tech, i) => (
          <div key={i} className="contents">
            <div className="font-medium py-2 px-1 border">{tech}</div>
            {slots.map((slot, j) => {
              const status = getStatus(tech, slot);
              return (
                <div
                  key={j}
                  onClick={() => handleSlotClick(tech, slot, status)}
                  className={`py-2 px-1 rounded text-[10px] border cursor-pointer ${
                    status === "Completed" ||
                    status === "Confirmed" ||
                    status === "Booked"
                      ? "bg-red-400 text-white cursor-not-allowed"
                      : "bg-green-200 text-gray-800 hover:bg-green-300"
                  }`}
                >
                  {status}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedSlot && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Book Slot</h3>
            <p className="mb-2 text-sm text-gray-700">
              Mechanic: <span className="font-medium">{selectedSlot.tech}</span>
            </p>
            <p className="mb-4 text-sm text-gray-700">
              Time: <span className="font-medium">{selectedSlot.slot}</span>
            </p>

            {/* Simple form */}
            <input
              type="text"
              placeholder="Enter Vehicle"
              className="w-full border rounded px-3 py-2 mb-3"
            />
            <input
              type="text"
              placeholder="Enter Service"
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(
                    `Booked ${selectedSlot.tech} at ${selectedSlot.slot}`
                  );
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking_Matrix;

