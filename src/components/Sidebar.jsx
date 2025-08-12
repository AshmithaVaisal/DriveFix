import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Profile = ({ isOpen, onClose, userData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(userData.image);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you would typically upload the image to a server
    // For this example, we'll just use the preview URL
    const updatedData = {
      ...formData,
      image: selectedFile ? previewImage : formData.image,
    };

    onUpdate(updatedData);
    setIsEditing(false);
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setFormData(userData);
    setPreviewImage(userData.image);
    setSelectedFile(null);
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">User Profile</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
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

          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4 group">
              <img
                src={previewImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-purple-200"
              />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors cursor-pointer shadow-md">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </label>
                </div>
              )}
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="block w-full px-3 py-2 bg-gray-50 rounded-lg">
                    {formData.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="block w-full px-3 py-2 bg-gray-50 rounded-lg">
                    {formData.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                ) : (
                  <p className="block w-full px-3 py-2 bg-gray-50 rounded-lg">
                    {formData.phone}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: "AdminUser",
    email: "admin@example.com",
    phone: "+1 (555) 123-4567",
    image: "/images/profile.jpg",
  });

  useEffect(() => {
    const handleOpenModal = () => {
      setIsProfileModalOpen(true);
    };

    window.addEventListener('openProfileModal', handleOpenModal);
    return () => {
      window.removeEventListener('openProfileModal', handleOpenModal);
    };
  }, []);

  // Add useEffect to listen for the event
  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.getItem("openProfileModal") === "true") {
        setIsProfileModalOpen(true);
        localStorage.removeItem("openProfileModal");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleUpdateProfile = (updatedData) => {
    setUserData(updatedData);
  };

  // Helper functions for dynamic classes
  const navLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 text-sm font-medium rounded-md group ${
      isActive
        ? "text-blue-700 bg-blue-50"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`;

  const iconClass = (isActive) =>
    `w-5 h-5 mr-3 ${
      isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500"
    }`;

  return (
    <>
      <nav className="flex-1 space-y-2">
        {/* Dashboard Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main
          </h3>
          <div className="mt-2 space-y-1">
            <NavLink to="/dashboard" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <svg
                    className={iconClass(isActive)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Dashboard
                </>
              )}
            </NavLink>
            <NavLink to="/bookings" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <svg
                    className={iconClass(isActive)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                  Bookings
                </>
              )}
            </NavLink>
            <NavLink to="/payments" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <svg
                    className={iconClass(isActive)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Payments
                </>
              )}
            </NavLink>
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Services
          </h3>
          <div className="mt-2 space-y-1">
            <NavLink
              to="/vehicles/add"
              className={navLinkClass}
              isActive={(match, location) => {
                return location.pathname === "/vehicles/add";
              }}
            >
              {({ isActive }) => (
                <>
                  <svg
                    className={iconClass(isActive)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  Add category
                </>
              )}
            </NavLink>
            <NavLink to="/vehicles/category" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <svg
                    className={iconClass(isActive)}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Vehicle Category
                </>
              )}
            </NavLink>
            <NavLink to="/vehicles" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <svg
                    className={iconClass(isActive)}
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
                  My Services
                </>
              )}
            </NavLink>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Account
          </h3>
          <div className="mt-2 space-y-1">
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className={
                navLinkClass({ isActive: false }) + " w-full text-left"
              }
            >
              <svg
                className={iconClass(false)}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      <Profile
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userData={userData}
        onUpdate={handleUpdateProfile}
      />
    </>
  );
};

export default Sidebar;
