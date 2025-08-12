import { useState } from "react";
import { TruckIcon } from "@heroicons/react/outline";
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
  FaMapMarkerAlt,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import User_Navbar from "./User_Navbar";

const Main = () => {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Services data
  const services = [
    {
      id: 1,
      name: "General Service",
      icon: <FaOilCan className="text-purple-600 text-4xl" />,
      description: "Routine checkups and essential upkeep",
      price: "$49.99",
      features: [
        "Oil-change",
        "Fuel top-up",
        "Battery Replacement",
        "Filter Changes(Air,Cabin,Fuel)",
        "Spark Plug Maintenance",
      ],
    },
    {
      id: 2,
      name: " Repairs & Diagnostics",
      icon: <FaCarCrash className="text-purple-600 text-4xl" />,
      description: "Accurate diagnostics and expert repairs",
      price: "$89.99",
      features: [
        "Engine Diagnostics",
        "Brake Repair & Replacement",
        "Clutch Repair",
        "Suspension & Steering Repairs",
        "AC/Heater Repair",
      ],
    },
    {
      id: 3,
      name: "Tires & Wheel Care",
      icon: <FaCarBattery className="text-purple-600 text-4xl" />,
      description:
        " smooth and safe ride with proper tire and alignment services",
      price: "$129.99",
      features: [
        "Tire Replacement",
        "Wheel Alignment",
        "Puncture Repair",
        "Wheel Balancing",
        "Tire Rotation",
      ],
    },
    // {
    //   id: 4,
    //   name: "Tire Rotation",
    //   icon: <FaCarAlt className="text-purple-600 text-4xl" />,
    //   description: "Tire rotation and pressure check for optimal wear",
    //   price: "$39.99",
    //   features: [
    //     "Tread depth check",
    //     "Valve stem inspection",
    //     "Pressure adjustment",
    //   ],
    // },
    // {
    //   id: 5,
    //   name: "Full Inspection",
    //   icon: <FaTools className="text-purple-600 text-4xl" />,
    //   description: "Complete 50-point vehicle inspection",
    //   price: "$59.99",
    //   features: ["Engine diagnostics", "Suspension check", "Fluid levels"],
    // },
    // {
    //   id: 6,
    //   name: "Engine Tune-Up",
    //   icon: <FaWrench className="text-purple-600 text-4xl" />,
    //   description: "Complete engine performance optimization",
    //   price: "$99.99",
    //   features: ["Spark plug replacement", "Fuel system clean", "ECU check"],
    // },
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
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment:
        "Quick service without cutting corners. My car has never run better. Highly recommend!",
      date: "1 month ago",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "David Wilson",
      rating: 4,
      comment:
        "Consistently good service over 3 years. They remember my car's history and needs.",
      date: "3 months ago",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  // Carousel images
  const carouselImages = [
    "./images/2.png",
    "./images/1.png",
    "./images/3.png",
    "./images/4.png",
  ];

  // Special offers
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
      discount: "$30 OFF",
      description: "Full brake inspection and service",
    },
  ];

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white">
      {/* Navbar */}
      <User_Navbar />
      {/* Hero Carousel with Card Overlay */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-black">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Car service ${index + 1}`}
              className="w-full h-full object-cover opacity-70"
            />
            {/* Text overlay with card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 p-8 rounded-xl shadow-xl w-fit mx-6 text-center">
                <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 whitespace-nowrap">
                  AutoCare Service at Your Fingertips
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  From oil changes to emergency repairs, we bring the garage to
                  you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105">
                    Book Service
                  </button>
                  <button className="border-2 border-purple-600 text-white hover:bg-gray-900 font-bold py-3 px-8 rounded-lg transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-black text-black rounded-full p-3 focus:outline-none shadow-lg z-10 transition-all border border-gray-700"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-black text-black rounded-full p-3 focus:outline-none shadow-lg z-10 transition-all border border-gray-700"
        >
          <ArrowRightIcon className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-purple-500 w-6" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Emergency card section */}
      {/* Emergency card section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="group relative rounded-xl shadow-xl bg-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-gray-900">
            {/* Hover zoom effect container */}
            <div className="transform transition-transform duration-300 group-hover:scale-[1.02]">
              <div className="flex flex-col md:flex-row">
                {/* Left side - Emergency info */}
                <div className="p-8 md:p-10 md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold text-black group-hover:text-white mb-4 transition-colors">
                    Emergency Roadside Assistance
                  </h2>
                  <p className="text-gray-800 group-hover:text-gray-300 mb-6 transition-colors">
                    Stranded on the road? Our rapid response team is available
                    round the clock to get you back on track.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      {
                        icon: <FaCarCrash className="h-5 w-5 text-white" />,
                        title: "Breakdown Assistance",
                        desc: "Jump-starts, lockouts, minor repairs",
                      },
                      {
                        icon: <TruckIcon className="h-5 w-5 text-white" />,
                        title: "Towing Service",
                        desc: "Quick towing to nearest garage",
                      },
                      {
                        icon: <FaOilCan className="h-5 w-5 text-white" />,
                        title: "Fuel Delivery",
                        desc: "Petrol/diesel brought to your location",
                      },
                      {
                        icon: <FaTools className="h-5 w-5 text-white" />,
                        title: "Flat Tire Service",
                        desc: "Tire changes on the spot",
                      },
                    ].map((service, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-purple-600 p-2 rounded-full mr-3 transition-colors duration-300 group-hover:bg-purple-700">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-gray-700 group-hover:text-gray-300 transition-colors">
                            {service.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform group-hover:scale-105">
                    Call Emergency: (123) 456-7890
                  </button>
                </div>

                {/* Right side - Image */}
                <div className="hidden md:block md:w-1/3 bg-gray-800 bg-[url('./images/e1.jpg')] bg-cover bg-center">
                  <div className="h-full w-full bg-black/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-black/40">
                    <div className="text-center p-6 transform transition-transform duration-300 group-hover:scale-105">
                      <FaShieldAlt className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white">
                        We've Got You Covered
                      </h3>
                      <p className="text-gray-300 mt-2">
                        Anywhere, anytime assistance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our <span className="text-purple-600">Services</span>
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Essential auto services for your vehicle's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="p-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 text-center mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="mb-4 space-y-2">
                    {service.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start text-gray-600 text-sm"
                      >
                        <CheckCircleIcon className="text-purple-500 h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <span className="text-lg font-semibold text-gray-800">
                      {service.price}
                    </span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Simplified Special Offers Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Special Offers
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Take advantage of these limited-time deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-gray-800 rounded-lg shadow-md p-6 text-center border border-gray-700"
              >
                <h3 className="text-xl font-bold text-purple-600 mb-2">
                  {offer.title}
                </h3>
                <div className="text-3xl font-bold text-white mb-3">
                  {offer.discount}
                </div>
                <p className="text-gray-300 mb-6">{offer.description}</p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                  Get This Deal
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Customer <span className="text-purple-600">Testimonials</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Hear what our customers say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-100 rounded-xl p-8 shadow-lg border border-gray-200"
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
      {/* Features Banner */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaClock className="text-4xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Service</h3>
              <p className="text-gray-300">
                Most services completed in under 2 hours
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaShieldAlt className="text-4xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Warranty Included</h3>
              <p className="text-gray-300">
                All services come with warranty protection
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaMapMarkerAlt className="text-4xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Convenient Location</h3>
              <p className="text-gray-300">
                Easy access with ample parking space
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-purple-600 mb-4">
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

export default Main;
