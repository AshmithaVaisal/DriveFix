import { useState } from "react";
import Admin_Navbar from "../components/Admin_Navbar";
import Sidebar from "../components/Sidebar";

const Payments = () => {
  // Sample payment data
  const [payments, setPayments] = useState([
    {
      id: 1,
      paymentDate: "2023-06-15",
      paymentType: "Credit Card",
      amount: "$120",
      service: "Oil Change",
      customerName: "John Smith",
      phoneNumber: "+1 (555) 123-4567",
      status: "Completed",
    },
    {
      id: 2,
      paymentDate: "2023-06-18",
      paymentType: "PayPal",
      amount: "$250",
      service: "Brake Repair",
      customerName: "Sarah Johnson",
      phoneNumber: "+1 (555) 987-6543",
      status: "Completed",
    },
    {
      id: 3,
      paymentDate: "2023-06-20",
      paymentType: "Bank Transfer",
      amount: "$80",
      service: "Tire Rotation",
      customerName: "Michael Chen",
      phoneNumber: "+1 (555) 456-7890",
      status: "Pending",
    },
    {
      id: 4,
      paymentDate: "2023-06-22",
      paymentType: "Cash",
      amount: "$180",
      service: "AC Repair",
      customerName: "David Wilson",
      phoneNumber: "+1 (555) 789-0123",
      status: "Completed",
    },
    {
      id: 5,
      paymentDate: "2023-06-25",
      paymentType: "Credit Card",
      amount: "$200",
      service: "Battery Replacement",
      customerName: "Emily Davis",
      phoneNumber: "+1 (555) 234-5678",
      status: "Failed",
    },
    {
      id: 6,
      paymentDate: "2023-06-28",
      paymentType: "Debit Card",
      amount: "$150",
      service: "Engine Check",
      customerName: "Robert Brown",
      phoneNumber: "+1 (555) 345-6789",
      status: "Completed",
    },
    {
      id: 7,
      paymentDate: "2023-07-01",
      paymentType: "PayPal",
      amount: "$300",
      service: "Transmission Service",
      customerName: "Jennifer Lee",
      phoneNumber: "+1 (555) 567-8901",
      status: "Refunded",
    },
    {
      id: 8,
      paymentDate: "2023-07-05",
      paymentType: "Cash",
      amount: "$50",
      service: "Flat Tire",
      customerName: "Thomas Taylor",
      phoneNumber: "+1 (555) 678-9012",
      status: "Completed",
    },
  ]);

  // State for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;

  // Filter payments based on search term
  const filteredPayments = payments.filter(
    (payment) =>
      payment.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current payments for pagination
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete
  const handleDelete = (id) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

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
                    Payment Management
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
                        placeholder="Search payments..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    {/* <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      New Payment
                    </button> */}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          S.No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Payment Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Payment Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Service
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Customer Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Phone Number
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentPayments.map((payment, index) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {indexOfFirstPayment + index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.paymentDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.paymentType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.service}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.customerName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {payment.phoneNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                payment.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : payment.status === "Failed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-purple-600 hover:text-purple-900 mr-3">
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDelete(payment.id)}
                            >
                              Delete
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
                      {indexOfFirstPayment + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastPayment, filteredPayments.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredPayments.length}
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
                        filteredPayments.length / paymentsPerPage
                      ),
                    }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === index + 1
                            ? "bg-purple-600 text-white"
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
                            Math.ceil(filteredPayments.length / paymentsPerPage)
                            ? currentPage + 1
                            : currentPage
                        )
                      }
                      disabled={
                        currentPage ===
                        Math.ceil(filteredPayments.length / paymentsPerPage)
                      }
                      className={`px-3 py-1 rounded-md ${
                        currentPage ===
                        Math.ceil(filteredPayments.length / paymentsPerPage)
                          ? "bg-gray-200 cursor-not-allowed"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm text-gray-500 mb-2 md:mb-0">
                    © {new Date().getFullYear()} AutoCare Dashboard
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-purple-600"
                    >
                      Privacy
                    </a>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-purple-600"
                    >
                      Terms
                    </a>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-purple-600"
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

export default Payments;
