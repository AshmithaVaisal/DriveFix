import { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  SearchIcon,
  XIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import Admin_Navbar from "../components/Admin_Navbar";
import Sidebar from "../components/Sidebar";

const AddCategory = () => {
  // Sample data
  const [categories, setCategories] = useState([
    { id: 1, categoryName: "Maintenance", status: "Active" },
    { id: 2, categoryName: "Repair", status: "Active" },
    { id: 3, categoryName: "Seasonal", status: "Inactive" },
    { id: 4, categoryName: "Emergency", status: "Active" },
    { id: 5, categoryName: "Diagnostics", status: "Active" },
  ]);

  // Predefined category options for dropdown
  const categoryOptions = [
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

  // Form state
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    status: "Active",
  });

  // Modal and edit state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current categories for pagination
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open modal for adding new category
  const openAddModal = () => {
    setIsEditMode(false);
    setNewCategory({ categoryName: "", status: "Active" });
    setIsModalOpen(true);
  };

  // Open modal for editing category
  const openEditModal = (category) => {
    setIsEditMode(true);
    setCurrentCategory({ ...category });
    setIsModalOpen(true);
  };

  // Add new category
  const handleAddCategory = () => {
    if (newCategory.categoryName.trim()) {
      const newId =
        categories.length > 0
          ? Math.max(...categories.map((c) => c.id)) + 1
          : 1;
      setCategories([
        ...categories,
        {
          id: newId,
          ...newCategory,
        },
      ]);
      setNewCategory({ categoryName: "", status: "Active" });
      setIsModalOpen(false);
    }
  };

  // Update existing category
  const handleUpdateCategory = () => {
    if (currentCategory.categoryName.trim()) {
      setCategories(
        categories.map((category) =>
          category.id === currentCategory.id ? currentCategory : category
        )
      );
      setIsModalOpen(false);
    }
  };

  // Delete category
  const handleDelete = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Toggle status
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

  // Select category from dropdown
  const selectCategory = (category) => {
    if (isEditMode) {
      setCurrentCategory({ ...currentCategory, categoryName: category });
    } else {
      setNewCategory({ ...newCategory, categoryName: category });
    }
    setShowCategoryDropdown(false);
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
                    Categories Management
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search categories..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1); // Reset to first page when searching
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      onClick={openAddModal}
                    >
                      <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                      Add Category
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
                          Category Name
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
                      {currentCategories.length > 0 ? (
                        currentCategories.map((category, index) => (
                          <tr key={category.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {indexOfFirstCategory + index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {category.categoryName}
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
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-4 text-center text-sm text-gray-500"
                          >
                            No categories found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredCategories.length > categoriesPerPage && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Showing{" "}
                      <span className="font-medium">
                        {indexOfFirstCategory + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          indexOfLastCategory,
                          filteredCategories.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredCategories.length}
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
                          filteredCategories.length / categoriesPerPage
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
                              Math.ceil(
                                filteredCategories.length / categoriesPerPage
                              )
                              ? currentPage + 1
                              : currentPage
                          )
                        }
                        disabled={
                          currentPage ===
                          Math.ceil(
                            filteredCategories.length / categoriesPerPage
                          )
                        }
                        className={`px-3 py-1 rounded-md ${
                          currentPage ===
                          Math.ceil(
                            filteredCategories.length / categoriesPerPage
                          )
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
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

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <>
          {/* Blur Background */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {isEditMode ? "Edit Category" : "Add New Category"}
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

              {/* Modal Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="categoryName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="categoryName"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-0.5 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={
                        isEditMode
                          ? currentCategory.categoryName
                          : newCategory.categoryName
                      }
                      onChange={(e) =>
                        isEditMode
                          ? setCurrentCategory({
                              ...currentCategory,
                              categoryName: e.target.value,
                            })
                          : setNewCategory({
                              ...newCategory,
                              categoryName: e.target.value,
                            })
                      }
                      placeholder="Enter category name"
                    />
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
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      value={
                        isEditMode ? currentCategory.status : newCategory.status
                      }
                      onChange={(e) =>
                        isEditMode
                          ? setCurrentCategory({
                              ...currentCategory,
                              status: e.target.value,
                            })
                          : setNewCategory({
                              ...newCategory,
                              status: e.target.value,
                            })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0.5 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                  onClick={
                    isEditMode ? handleUpdateCategory : handleAddCategory
                  }
                >
                  {isEditMode ? "Update Category" : "Add Category"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCategory;
