import { useState, useEffect } from "react";
import { TruckIcon, SearchIcon, FilterIcon } from "@heroicons/react/outline";
import {
  StarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import {
  FaOilCan,
  FaCarCrash,
  FaCarBattery,
  FaCarAlt,
  FaTools,
  FaWrench,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import Booking_Navbar from "./Booking_Navbar";

const My_Bookings = () => {
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      service: "Premium Oil Change",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "Completed",
      vehicle: "Toyota Camry 2018",
      price: "$89.99",
      rating: 5,
      technician: "John Smith",
      address: "123 Auto Service Lane, Mechanic City",
      serviceDetails: "Full synthetic oil, oil filter replacement",
    },
    {
      id: 2,
      service: "Brake Inspection & Service",
      date: "2023-06-20",
      time: "2:30 PM",
      status: "Confirmed",
      vehicle: "Honda Accord 2020",
      price: "$129.99",
      rating: null,
      technician: "Maria Garcia",
      address: "123 Auto Service Lane, Mechanic City",
      serviceDetails: "Brake pad inspection, rotor check, fluid top-up",
    },
    {
      id: 3,
      service: "Battery Replacement",
      date: "2023-05-28",
      time: "9:00 AM",
      status: "Completed",
      vehicle: "Ford F-150 2019",
      price: "$199.99",
      rating: 4,
      technician: "Robert Johnson",
      address: "123 Auto Service Lane, Mechanic City",
      serviceDetails: "Premium battery installation with 3-year warranty",
    },
    {
      id: 4,
      service: "Full Vehicle Inspection",
      date: "2023-07-05",
      time: "11:00 AM",
      status: "Pending",
      vehicle: "Tesla Model 3 2021",
      price: "$149.99",
      rating: null,
      technician: "Pending Assignment",
      address: "123 Auto Service Lane, Mechanic City",
      serviceDetails: "150-point comprehensive vehicle inspection",
    },
    {
      id: 5,
      service: "Tire Rotation & Balance",
      date: "2023-06-10",
      time: "3:45 PM",
      status: "Completed",
      vehicle: "Chevrolet Equinox 2022",
      price: "$59.99",
      rating: 5,
      technician: "David Wilson",
      address: "123 Auto Service Lane, Mechanic City",
      serviceDetails: "Tire rotation, balance, and pressure check",
    },
    {
      id: 6,
      service: "AC System Recharge",
      date: "2023-07-12",
      time: "1:15 PM",
      status: "Confirmed",
      vehicle: "Nissan Rogue 2017",
      price: "$119.99",
      rating: null,
      technician: "Sarah Lee",
      address: "123 Auto Service Lane, Mechanic City",
      serviceDetails: "AC system diagnostic and refrigerant recharge",
    },
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [sortOption, setSortOption] = useState("date-desc");
  const [serviceMessage, setServiceMessage] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 4;

  // Filter bookings based on search and filters
  const filteredBookings = bookings
    .filter((booking) => {
      const matchesSearch =
        booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || booking.status === statusFilter;
      const matchesDate =
        dateFilter === "All" ||
        (dateFilter === "Upcoming" && new Date(booking.date) >= new Date()) ||
        (dateFilter === "Past" && new Date(booking.date) < new Date());

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      if (sortOption === "date-asc") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOption === "date-desc") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOption === "price-asc") {
        return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
      } else if (sortOption === "price-desc") {
        return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
      }
      return 0;
    });

  // Get current bookings for pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, sortOption]);

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "Completed":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        break;
      case "Confirmed":
        bgColor = "bg-blue-100";
        textColor = "text-blue-800";
        break;
      case "Pending":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        break;
      case "Cancelled":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
    }

    return (
      <span
        className={`${bgColor} ${textColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}
      >
        {status}
      </span>
    );
  };

  // Render star ratings
  const renderStars = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating}.0)</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Booking_Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-1">
              View and manage your service appointments
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg shadow-sm transition-colors">
            Book New Service
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {" "}
            {/* Added items-end */}
            {/* Search */}
            <div className="relative">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {/* Status Filter */}
            <div>
              <label
                htmlFor="status-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status-filter"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-lg"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            {/* Date Filter */}
            <div>
              <label
                htmlFor="date-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date
              </label>
              <select
                id="date-filter"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-lg"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Past">Past</option>
              </select>
            </div>
            {/* Sort Option */}
            <div>
              <label
                htmlFor="sort-option"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sort By
              </label>
              <select
                id="sort-option"
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 rounded-lg"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="price-asc">Price (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Grid */}
        {currentBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {currentBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.service}
                          </h3>
                          <div className="flex items-center mt-1">
                            <StatusBadge status={booking.status} />
                            {booking.rating && (
                              <span className="ml-2 text-sm text-gray-500">
                                • Rated
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-lg font-bold text-purple-700">
                          {booking.price}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <FaCalendarAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Date & Time</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(booking.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}{" "}
                              • {booking.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaCarAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Vehicle</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.vehicle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaWrench className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Technician</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.technician}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.address}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Service Details</p>
                        <p className="text-sm text-gray-700 mt-1">
                          {booking.serviceDetails}
                        </p>
                      </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2">
                      {booking.status === "Completed" && !booking.rating && (
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          Rate Service
                        </button>
                      )}
                      {booking.status === "Confirmed" && (
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-full bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          Reschedule
                        </button>
                      )}
                      {(booking.status === "Pending" ||
                        booking.status === "Confirmed") && (
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-full bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          Cancel Booking
                        </button>
                      )}
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-full bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        View Details
                      </button>
                      {booking.status === "Completed" && (
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-full bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                          Download Invoice
                        </button>
                      )}
                    </div>
                  </div>

                  {booking.rating && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">
                        Your Rating
                      </h4>
                      {renderStars(booking.rating)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <TruckIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No bookings found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "All" || dateFilter !== "All"
                ? "Try adjusting your search or filter criteria"
                : "You haven't made any bookings yet"}
            </p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Book a Service
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredBookings.length > bookingsPerPage && (
          <div className="mt-8 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstBooking + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastBooking, filteredBookings.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredBookings.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === number
                            ? "z-10 bg-purple-50 border-purple-500 text-purple-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-black text-white pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">
                DriveFix
              </h3>
              <p className="text-gray-400 mb-4">
                Professional auto services to keep your vehicle running smoothly
                and safely.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Oil Changes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Brake Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Battery Replacement
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tire Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Full Inspections
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="not-italic text-gray-400">
                <p className="mb-2">123 Auto Service Lane</p>
                <p className="mb-2">Mechanic City, MC 12345</p>
                <p className="mb-4">United States</p>
                <p className="mb-2">Phone: (123) 456-7890</p>
                <p className="mb-2">Email: info@drivefix.com</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} DriveFix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default My_Bookings;
