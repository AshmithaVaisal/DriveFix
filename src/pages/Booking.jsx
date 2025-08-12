import { useState } from "react";
import Admin_Navbar from "../components/Admin_Navbar";
import Sidebar from "../components/Sidebar";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";

const Bookings = () => {
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      bookingDate: "2023-06-15",
      serviceType: "Regular Service",
      issue: "Oil Change",
      amount: "120",
      status: "Confirmed",
      username: "john_doe",
      phone: "555-123-4567",
      vehicleType: "Sedan",
    },
    {
      id: 2,
      bookingDate: "2023-06-18",
      serviceType: "Emergency",
      issue: "Brake Failure",
      amount: "250",
      status: "In Progress",
      username: "jane_smith",
      phone: "555-987-6543",
      vehicleType: "SUV",
    },
    {
      id: 3,
      bookingDate: "2023-06-20",
      serviceType: "Maintenance",
      issue: "Tire Rotation",
      amount: "80",
      status: "Completed",
      username: "bob_johnson",
      phone: "555-456-7890",
      vehicleType: "Truck",
    },
  ]);

  // State for modal and form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [newBooking, setNewBooking] = useState({
    bookingDate: "",
    serviceType: "Regular Service",
    issue: "",
    amount: "",
    status: "Pending",
    username: "",
    phone: "",
    vehicleType: "Sedan",
  });

  // Service type options
  const serviceTypes = [
    "Regular Service",
    "Emergency",
    "Maintenance",
    "Diagnostics",
    "Tire Service",
    "Battery Service",
  ];

  // Vehicle type options
  const vehicleTypes = [
    "Sedan",
    "SUV",
    "Truck",
    "Hatchback",
    "Van",
    "Motorcycle",
  ];

  // Status options
  const statusOptions = [
    "Pending",
    "Confirmed",
    "In Progress",
    "Completed",
    "Cancelled",
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditMode) {
      setCurrentBooking({
        ...currentBooking,
        [name]: value,
      });
    } else {
      setNewBooking({
        ...newBooking,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleEditBooking();
    } else {
      handleAddBooking();
    }
  };

  // Add new booking
  const handleAddBooking = () => {
    const newId =
      bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1;

    setBookings([
      ...bookings,
      {
        id: newId,
        ...newBooking,
      },
    ]);

    // Reset form and close modal
    setNewBooking({
      bookingDate: "",
      serviceType: "Regular Service",
      issue: "",
      amount: "",
      status: "Pending",
      username: "",
      phone: "",
      vehicleType: "Sedan",
    });
    setIsModalOpen(false);
  };

  // Edit existing booking
  const handleEditBooking = () => {
    setBookings(
      bookings.map((booking) =>
        booking.id === currentBooking.id ? currentBooking : booking
      )
    );
    setIsModalOpen(false);
  };

  // Delete booking
  const handleDelete = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  // Open modal for adding new booking
  const openAddModal = () => {
    setIsEditMode(false);
    setNewBooking({
      bookingDate: "",
      serviceType: "Regular Service",
      issue: "",
      amount: "",
      status: "Pending",
      username: "",
      phone: "",
      vehicleType: "Sedan",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing booking
  const openEditModal = (booking) => {
    setIsEditMode(true);
    setCurrentBooking({ ...booking });
    setIsModalOpen(true);
  };

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current bookings for pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navbar */}
      <Admin_Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex items-center h-16 px-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                AutoCare Dashboard
              </h2>
            </div>
            <div className="flex flex-col flex-grow p-4 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Main Card Container */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Card Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                    Booking Management
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search bookings..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={openAddModal}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                      New Booking
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          S.No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Booking Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vehicle Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentBookings.map((booking, index) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {indexOfFirstBooking + index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.bookingDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.serviceType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.issue}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Rs {booking.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : booking.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.username}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.vehicleType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              onClick={() => openEditModal(booking)}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDelete(booking.id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-medium">
                      {indexOfFirstBooking + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastBooking, filteredBookings.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredBookings.length}
                    </span>{" "}
                    results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        paginate(currentPage > 1 ? currentPage - 1 : 1)
                      }
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      Previous
                    </button>
                    {Array.from({
                      length: Math.ceil(
                        filteredBookings.length / bookingsPerPage
                      ),
                    }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        paginate(
                          currentPage <
                            Math.ceil(filteredBookings.length / bookingsPerPage)
                            ? currentPage + 1
                            : currentPage
                        )
                      }
                      disabled={
                        currentPage ===
                        Math.ceil(filteredBookings.length / bookingsPerPage)
                      }
                      className={`px-3 py-1 rounded-md ${
                        currentPage ===
                        Math.ceil(filteredBookings.length / bookingsPerPage)
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* New Booking Modal */}
              {isModalOpen && (
                <>
                  {/* Blur Background */}
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm z-40"></div>

                  {/* Modal */}
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                      <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {isEditMode ? "Edit Booking" : "Add New Booking"}
                        </h3>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                              <div>
                                <label
                                  htmlFor="bookingDate"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Booking Date{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="date"
                                  id="bookingDate"
                                  name="bookingDate"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  value={
                                    isEditMode
                                      ? currentBooking.bookingDate
                                      : newBooking.bookingDate
                                  }
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="serviceType"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Service Type{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <select
                                  id="serviceType"
                                  name="serviceType"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                  value={
                                    isEditMode
                                      ? currentBooking.serviceType
                                      : newBooking.serviceType
                                  }
                                  onChange={handleInputChange}
                                  required
                                >
                                  {serviceTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label
                                  htmlFor="issue"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Issue <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="issue"
                                  name="issue"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  value={
                                    isEditMode
                                      ? currentBooking.issue
                                      : newBooking.issue
                                  }
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="vehicleType"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Vehicle Type{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <select
                                  id="vehicleType"
                                  name="vehicleType"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                  value={
                                    isEditMode
                                      ? currentBooking.vehicleType
                                      : newBooking.vehicleType
                                  }
                                  onChange={handleInputChange}
                                  required
                                >
                                  {vehicleTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                              <div>
                                <label
                                  htmlFor="amount"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Approximate Amount{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-500 sm:text-sm">
                                      Rs
                                    </span>
                                  </div>
                                  <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2 px-3"
                                    placeholder="0.00"
                                    value={
                                      isEditMode
                                        ? currentBooking.amount
                                        : newBooking.amount
                                    }
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label
                                  htmlFor="status"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Status
                                </label>
                                <select
                                  id="status"
                                  name="status"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                  value={
                                    isEditMode
                                      ? currentBooking.status
                                      : newBooking.status
                                  }
                                  onChange={handleInputChange}
                                >
                                  {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label
                                  htmlFor="username"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Username{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  id="username"
                                  name="username"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  value={
                                    isEditMode
                                      ? currentBooking.username
                                      : newBooking.username
                                  }
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="phone"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Phone Number{" "}
                                  <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="tel"
                                  id="phone"
                                  name="phone"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  value={
                                    isEditMode
                                      ? currentBooking.phone
                                      : newBooking.phone
                                  }
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                          >
                            {isEditMode ? "Update Booking" : "Add Booking"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-gray-500 mb-2 md:mb-0">
                    © {new Date().getFullYear()} AutoCare Dashboard
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-blue-600"
                    >
                      Privacy
                    </a>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-blue-600"
                    >
                      Terms
                    </a>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-blue-600"
                    >
                      Help
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
