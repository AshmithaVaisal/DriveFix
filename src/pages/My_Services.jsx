import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import Admin_Navbar from "../components/Admin_Navbar";
import Sidebar from "../components/Sidebar";

const My_Services = () => {
  // Sample data
  const [categories, setCategories] = useState([
    {
      id: 1,
      serviceName: "Oil Change",
      serviceCategory: "Maintenance",
      vehicleCategory: "Sedan",
      price: "$49.99",
      image: "/images/oil-change.jpg",
      status: "Active",
    },
    {
      id: 2,
      serviceName: "Brake Repair",
      serviceCategory: "Repair",
      vehicleCategory: "SUV",
      price: "$129.99",
      image: "/images/brake-repair.jpg",
      status: "Active",
    },
    {
      id: 3,
      serviceName: "AC Service",
      serviceCategory: "Seasonal",
      vehicleCategory: "Truck",
      price: "$89.99",
      image: "/images/ac-service.jpg",
      status: "Inactive",
    },
  ]);

  const [newService, setNewService] = useState({
    serviceName: "",
    serviceCategory: "",
    vehicleCategory: "",
    price: "",
    image: "",
    status: "Active",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const vehicleCategories = [
    "Sedan",
    "SUV",
    "Truck",
    "Hatchback",
    "Van",
    "Motorcycle",
  ];

  const service_types = [
    "Maintenance",
    "Repair",
    "Seasonal",
    "Emergency",
    "Diagnostics",
    "Tires",
    "Battery",
    "Transmission",
    "Electrical",
    "Body Work",
  ];

  const handleAddService = () => {
    if (
      newService.serviceName &&
      newService.serviceCategory &&
      newService.vehicleCategory &&
      newService.price
    ) {
      setCategories([
        ...categories,
        {
          id:
            categories.length > 0
              ? Math.max(...categories.map((c) => c.id)) + 1
              : 1,
          ...newService,
        },
      ]);
      setNewService({
        serviceName: "",
        serviceCategory: "",
        vehicleCategory: "",
        price: "",
        image: "",
        status: "Active",
      });
      setImagePreview("");
      setIsModalOpen(false);
    }
  };

  const handleEditService = () => {
    if (
      currentService.serviceName &&
      currentService.serviceCategory &&
      currentService.vehicleCategory &&
      currentService.price
    ) {
      setCategories(
        categories.map((category) =>
          category.id === currentService.id ? currentService : category
        )
      );
      setIsModalOpen(false);
      setImagePreview("");
    }
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const toggleStatus = (id) => {
    setCategories(
      categories.map((category) =>
        category.id === id
          ? {
              ...category,
              status: category.status === "Active" ? "Inactive" : "Active",
            }
          : category
      )
    );
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setNewService({
      serviceName: "",
      serviceCategory: "",
      vehicleCategory: "",
      price: "",
      image: "",
      status: "Active",
    });
    setImagePreview("");
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setIsEditMode(true);
    setCurrentService({ ...service });
    setImagePreview(service.image);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setImagePreview(imageUrl);
        if (isEditMode) {
          setCurrentService({ ...currentService, image: imageUrl });
        } else {
          setNewService({ ...newService, image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredServices = categories.filter(
    (service) =>
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceCategory
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      service.vehicleCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    Service Management
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search services..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={openAddModal}
                    >
                      <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                      Add Service
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
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Image
                        </th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Vehicle Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredServices.map((category, index) => (
                        <tr key={category.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={category.image || "/images/default-service.jpg"}
                                alt={category.serviceName}
                              />
                            </div>
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.serviceName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.serviceCategory}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.vehicleCategory}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              onClick={() => toggleStatus(category.id)}
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                                category.status === "Active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {category.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              className="text-purple-600 hover:text-purple-900 mr-3"
                              onClick={() => openEditModal(category)}
                            >
                              <PencilIcon className="h-5 w-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDelete(category.id)}
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

      {/* Add/Edit Service Modal */}
      {isModalOpen && (
        <>
          {/* Blur Background */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {isEditMode ? "Edit Service" : "Add New Service"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md p-1"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="serviceName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Service Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="serviceName"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={
                          isEditMode
                            ? currentService.serviceName
                            : newService.serviceName
                        }
                        onChange={(e) =>
                          isEditMode
                            ? setCurrentService({
                                ...currentService,
                                serviceName: e.target.value,
                              })
                            : setNewService({
                                ...newService,
                                serviceName: e.target.value,
                              })
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="serviceCategory"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Service Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="serviceCategory"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={
                          isEditMode
                            ? currentService.serviceCategory
                            : newService.serviceCategory
                        }
                        onChange={(e) =>
                          isEditMode
                            ? setCurrentService({
                                ...currentService,
                                serviceCategory: e.target.value,
                              })
                            : setNewService({
                                ...newService,
                                serviceCategory: e.target.value,
                              })
                        }
                      >
                        <option value="">Select Service Category</option>
                        {service_types.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="vehicleCategory"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Vehicle Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="vehicleCategory"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={
                          isEditMode
                            ? currentService.vehicleCategory
                            : newService.vehicleCategory
                        }
                        onChange={(e) =>
                          isEditMode
                            ? setCurrentService({
                                ...currentService,
                                vehicleCategory: e.target.value,
                              })
                            : setNewService({
                                ...newService,
                                vehicleCategory: e.target.value,
                              })
                        }
                      >
                        <option value="">Select Vehicle Category</option>
                        {vehicleCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">Rs</span>
                        </div>
                        <input
                          type="text"
                          id="price"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                          placeholder="Rs 0.00"
                          value={
                            isEditMode
                              ? currentService.price.replace("$", "")
                              : newService.price.replace("$", "")
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            if (isEditMode) {
                              setCurrentService({
                                ...currentService,
                                price: `$${value}`,
                              });
                            } else {
                              setNewService({
                                ...newService,
                                price: `$${value}`,
                              });
                            }
                          }}
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
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                        value={
                          isEditMode ? currentService.status : newService.status
                        }
                        onChange={(e) =>
                          isEditMode
                            ? setCurrentService({
                                ...currentService,
                                status: e.target.value,
                              })
                            : setNewService({
                                ...newService,
                                status: e.target.value,
                              })
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Column - Image Upload */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Service Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          {imagePreview ? (
                            <div className="relative">
                              <img
                                src={imagePreview}
                                alt="Service preview"
                                className="mx-auto h-40 w-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white"
                                onClick={() => {
                                  setImagePreview("");
                                  if (isEditMode) {
                                    setCurrentService({
                                      ...currentService,
                                      image: "",
                                    });
                                  } else {
                                    setNewService({ ...newService, image: "" });
                                  }
                                }}
                              >
                                <XCircleIcon className="h-5 w-5" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="flex text-sm text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none"
                                >
                                  <span>Upload an image</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 2MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                  onClick={isEditMode ? handleEditService : handleAddService}
                >
                  {isEditMode ? "Update Service" : "Add Service"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default My_Services;
