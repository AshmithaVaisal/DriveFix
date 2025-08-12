import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  BellIcon,
  UserCircleIcon,
  LogoutIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

const Admin_Navbar = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Function to open profile modal
  const openProfileModal = () => {
    localStorage.setItem("openProfileModal", "true");
    window.dispatchEvent(new Event("storage"));
    setProfileOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out..."); // debug line
    localStorage.clear();
    setProfileOpen(false);
    navigate("/login"); // ✅ proper navigation
  };

  // Mock notifications data
  const notifications = [
    { id: 1, text: "Your booking has been confirmed", time: "2 hours ago" },
    { id: 2, text: "Service reminder: Oil change due soon", time: "1 day ago" },
    { id: 3, text: "New service available in your area", time: "3 days ago" },
  ];

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-black font-bold text-lg">DF</span>
          </div>
          <span className="text-xl font-bold hidden sm:inline-block">
            DriveFix
          </span>
        </Link>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          {/* Notification Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setProfileOpen(false);
              }}
              className="p-1 rounded-full hover:bg-gray-800 focus:outline-none relative transition-colors"
            >
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-purple-600"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-900 rounded-md shadow-lg overflow-hidden z-20 border border-gray-700">
                <div className="py-2">
                  <div className="px-4 py-2 bg-black text-white font-semibold flex justify-between items-center border-b border-gray-700">
                    <span>Notifications</span>
                    <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">
                      3 new
                    </span>
                  </div>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 border-b border-gray-800 hover:bg-gray-800 cursor-pointer"
                    >
                      <p className="text-sm text-gray-200">
                        {notification.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                  <div className="px-4 py-2 bg-gray-800 text-center">
                    <Link
                      to="/notifications"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("No New Notifications");
                      }}
                      className="text-sm text-purple-400 font-medium hover:underline"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationOpen(false);
              }}
              className="flex items-center space-x-1 focus:outline-none hover:text-purple-400 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center">
                <UserCircleIcon className="h-5 w-5 text-gray-300" />
              </div>
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  profileOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg overflow-hidden z-20 border border-gray-700">
                <div className="py-1">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-sm text-gray-200 font-medium">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-400">john@example.com</p>
                  </div>

                  <button
                    onClick={openProfileModal}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 flex items-center"
                  >
                    <LogoutIcon className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Admin_Navbar;
