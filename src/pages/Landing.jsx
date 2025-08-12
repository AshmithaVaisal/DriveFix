import { useState } from "react";
import { TruckIcon, XIcon } from "@heroicons/react/outline";

import {
  StarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";
import {
  FaOilCan,
  FaCarCrash,
  FaCarBattery,
  FaCarAlt,
  FaTools,
  FaWrench,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import User_Navbar from "./user/User_Navbar";

const Landing = () => {
  // Carousel state
  const [visibleServices, setVisibleServices] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleBookNowClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = (bookingData) => {
    // Here you would typically send the data to your backend
    alert("Booking submitted:", bookingData);
    // You can add your API call here
  };

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Services data with updated prices
  const services = [
    {
      id: 1,
      name: "General Service",
      icon: <FaOilCan className="text-purple-800 text-4xl" />,
      image: "/images/oilchange.jpg",
      description:
        "Routine checkups and essential upkeep to keep your vehicle running smoothly",
      price: "499",
      features: [
        "Oil change",
        "Fuel top-up",
        "Battery replacement",
        "Filter changes (Air, Cabin, Fuel)",
        "Spark plug maintenance",
      ],
    },
    {
      id: 2,
      name: "Repairs & Diagnostics",
      icon: <FaCarCrash className="text-purple-800 text-4xl" />,
      image: "/images/battery.jpg",
      description:
        "Accurate diagnostics and expert repairs to get you back on the road safely",
      price: "899",
      features: [
        "Engine diagnostics",
        "Brake repair & replacement",
        "Clutch repair",
        "Suspension & steering repairs",
        "AC/Heater repair",
      ],
    },
    {
      id: 3,
      name: "Tires & Wheel Care",
      image: "/images/tyre1.jpg",
      description:
        "Ensure a smooth and safe ride with proper tire and alignment services",
      price: "1299",
      features: [
        "Tire replacement",
        "Wheel alignment",
        "Puncture repair",
        "Wheel balancing",
        "Tire rotation",
      ],
    },
    {
      id: 4,
      name: "Full Vehicle Inspection",
      icon: <FaCarAlt className="text-purple-800 text-4xl" />,
      image: "/images/Ins1.jpg",
      // image: "/images/cartoon.jpg",
      description:
        "Comprehensive evaluation of your vehicle's condition and performance",
      price: "799",
      features: [
        "150-point inspection",
        "Safety assessment",
        "Fluid level checks",
        "Brake system evaluation",
        "Detailed report",
      ],
    },
    {
      id: 5,
      name: "Electrical Systems",
      icon: <FaCarBattery className="text-purple-800 text-4xl" />,
      image: "/images/Ins2.jpg",
      description:
        "Expert care for your vehicle's complex electrical components",
      price: "1099",
      features: [
        "Battery testing",
        "Alternator checks",
        "Wiring diagnostics",
        "Lighting systems",
        "Fuse box inspection",
      ],
    },
    {
      id: 6,
      name: "Performance Upgrade",
      icon: <FaTools className="text-purple-800 text-4xl" />,
      image: "/images/Ins3.jpg",
      description:
        "Enhance your vehicle's power and efficiency with our upgrades",
      price: "1999",
      features: [
        "ECU tuning",
        "Exhaust upgrades",
        "Air intake systems",
        "Suspension tuning",
        "Performance chips",
      ],
    },
  ];

  const offers = [
    {
      id: 1,
      title: "First Visit Discount",
      discount: "20% OFF",
      description: "For new customers on first service",
    },
    {
      id: 2,
      title: "Seasonal Maintenance",
      discount: "15% OFF",
      description: "Complete vehicle check-up package",
    },
    {
      id: 3,
      title: "Brake Service Special",
      discount: "Rs: 300 OFF",
      description: "Full brake inspection and service",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "The team at DriveFix saved me hundreds by catching an issue early. Professional and honest service!",
      date: "2 weeks ago",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment:
        "Quick service without cutting corners. My car has never run better. Highly recommend!",
      date: "1 month ago",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      id: 3,
      name: "David Wilson",
      rating: 4,
      comment:
        "Consistently good service over 3 years. They remember my car's history and needs.",
      date: "3 months ago",
      avatar: "https://randomuser.me/api/portraits/men/26.jpg",
    },
  ];

  return (
    <div className="bg-white">
      {/* Navbar */}
      <User_Navbar />

      {/* Hero Section */}
      <section
        id="top"
        className="relative h-screen min-h-[400px] max-h-[500px] bg-gray-900"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl px-4 sm:px-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Fix Fast{" "}
                <span className="block">
                  Drive <span className="text-purple-800">Safe</span>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg  ">
                From oil changes to urgent repairs, DriveFix makes car care
                effortless. Book in seconds and let our certified experts handle
                the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("services-section")}
                  className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Book Service
                </button>
                <button
                  onClick={() => scrollToSection("about-section")}
                  className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1"
                >
                  About Us
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Image */}
        <img
          src="git add ./images/new3.jpg"
          alt="Car maintenance"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </section>

      {/* Emergency card section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          {" "}
          {/* Only changed max-w-4xl to max-w-5xl */}
          <div className="bg-white rounded-xl shadow-xl p-6 text-purple-800">
            {/* Card Header - Unchanged */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl md:text-4xl font-bold">
                  Emergency Roadside Assistance
                </h2>
                <p className="text-gray-800 text-sm md:text-sm mt-2">
                  Available 24/7 for your emergencies
                </p>
              </div>
              <button className="bg-red-600 text-white hover:bg-black py-2 px-6 rounded-lg shadow-sm transition-colors whitespace-nowrap w-60">
                Book Now
              </button>
            </div>

            {/* Services - Horizontal Layout - Unchanged */}
            <div className="flex flex-wrap justify-between gap-4">
              {[
                {
                  icon: <FaCarCrash className="h-5 w-5 text-purple-800" />,
                  title: "Breakdown",
                  desc: "Jump-start, lockout help",
                },
                {
                  icon: <TruckIcon className="h-5 w-5 text-purple-800" />,
                  title: "Towing",
                  desc: "Quick towing service",
                },
                {
                  icon: <FaOilCan className="h-5 w-5 text-purple-800" />,
                  title: "Fuel",
                  desc: "Emergency delivery",
                },
                {
                  icon: <FaTools className="h-5 w-5 text-purple-800" />,
                  title: "Flat Tire",
                  desc: "On-spot replacement",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 min-w-[120px]"
                >
                  <div className="bg-purple-100 p-1.5 rounded-full">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{service.title}</h3>
                    <p className="text-gray-800 text-xs">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Premium Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional auto services tailored to your vehicle's needs with
              expert care and precision ✨
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, visibleServices).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Service Image */}
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  {/* Icon and Title */}
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <div className="text-purple-800 text-xl">
                        {service.icon || (
                          <FaWrench className="text-purple-800 text-4xl" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {service.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-5">{service.description}</p>

                  {/* Features */}
                  <div className="mb-6 space-y-3">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircleIcon className="text-purple-800 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    <div className="text-sm text-purple-800 font-medium mt-2">
                      + {service.features.length - 3} more services
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-sm text-gray-500">
                        Starting at{" "}
                      </span>
                      <br />
                      <span className="text-lg font-bold text-gray-900">
                        Rs {service.price}/-
                      </span>
                    </div>
                    <button
                      onClick={() => handleBookNowClick(service)}
                      className="bg-gradient-to-r from-purple-800 to-purple-900 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-5 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleBookingSubmit}
            selectedService={selectedService}
          />

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleServices(visibleServices === 3 ? 6 : 3)}
              className="border-2 border-purple-800 text-purple-800 hover:bg-purple-800 hover:text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
            >
              {visibleServices === 3 ? "View All Services" : "Show Less"}
            </button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-section" className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About DriveFix
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your trusted partner for all automotive needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Our Story
              </h3>
              <p className="text-gray-600 mb-6">
                Founded in 2010, DriveFix has grown from a small local garage to
                a trusted name in automotive services. Our journey began with a
                simple mission: to provide honest, reliable car care at fair
                prices.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we're proud to serve thousands of satisfied customers
                with our team of ASE-certified technicians and state-of-the-art
                facilities.
              </p>
              <div className="bg-purple-100 p-6 rounded-lg border-l-4 border-purple-800">
                <h4 className="text-lg font-semibold text-purple-800 mb-2">
                  Our Mission
                </h4>
                <p className="text-gray-700">
                  To deliver exceptional automotive services with integrity,
                  expertise, and a commitment to customer satisfaction.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl overflow-hidden h-96">
              <img
                src="/images/team.jpg"
                alt="DriveFix team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              {
                number: "12+",
                label: "Years Experience",
                emoji: "📅",
                color: "bg-gray-100",
              },
              {
                number: "5,000+",
                label: "Happy Customers",
                emoji: "😊",
                color: "bg-gray-100",
              },
              {
                number: "25+",
                label: "Certified Technicians",
                emoji: "🔧",
                color: "bg-gray-100",
              },
              {
                number: "24/7",
                label: "Roadside Assistance",
                emoji: "🚨",
                color: "bg-gray-100",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center p-6 ${stat.color} rounded-lg hover:scale-105 transition-transform duration-300`}
              >
                <div className="text-4xl font-bold text-purple-800 mb-2 animate-bounce">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label} {stat.emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special offers */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Special Offers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Special offer for our valued customers! Act fast - this deal won't
              last! ⏳
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-blue-950 rounded-lg shadow-md p-6 text-center hover:border-purple-800 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {offer.title}
                </h3>
                <div className="text-3xl font-semibold text-white mb-3">
                  {offer.discount}
                </div>
                <p className="text-gray-300 mb-6">{offer.description}</p>
                <button className="w-full bg-gradient-to-r from-purple-800 to-purple-900 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] font-medium">
                  Get This Deal
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Customer Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear what our customers say about their DriveFix experience ⭐
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-xl p-8 shadow-lg border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-6">
                  "{testimonial.comment}"
                </p>
                <div className="text-sm text-gray-500">{testimonial.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                    General Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Repairs & Diagnostics
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tires & Wheel Care
                  </a>
                </li>
                {/* <li>
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
                </li> */}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about-section"
                    className="text-gray-400 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about-section");
                    }}
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
                {/* <li>
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
                </li> */}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="not-italic text-gray-400">
                <p className="mb-2">123 Auto Service Lane</p>
                <p className="mb-2">Chennai City</p>
                <p className="mb-4">TamilNadu</p>
                <p className="mb-2">Phone: +91 4122424141</p>
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

export default Landing;

const BookingModal = ({ isOpen, onClose, onSubmit, selectedService }) => {
  const [formData, setFormData] = useState({
    service: selectedService?.name || "",
    vehicle: "",
    date: "",
    time: "",
    notes: "",
  });

  const timeSlots = [
    "9:00 AM",
    "10:30 AM",
    "12:00 PM",
    "1:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: selectedService?.price || "Rs 0",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              Book Your Service
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Service Information (pre-filled if from card) */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <FaWrench className="text-purple-800 text-xl" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {formData.service || "Select a service"}
                    </h4>
                    {selectedService?.price && (
                      <p className="text-sm text-purple-800">
                        Starting at {selectedService.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Details
                </label>
                <div className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <FaCarAlt className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    name="vehicle"
                    required
                    placeholder="e.g. Toyota Camry 2018"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="bg-transparent flex-1 focus:outline-none"
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <FaCalendarAlt className="text-gray-400 mr-3" />
                    <input
                      type="date"
                      name="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={handleChange}
                      className="bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="block w-full bg-gray-50 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="block w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  placeholder="Any special requests or details about your vehicle..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-800 to-purple-900 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
