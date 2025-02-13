import React, { useState } from "react";
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as DashboardIcon } from "../../assets/dashboard.svg";
import { ReactComponent as FirstguruIcon } from "../../assets/firstguru.svg";
import { ReactComponent as TownhallIcon } from "../../assets/townhall.svg";
import { ReactComponent as PerformanceIcon } from "../../assets/performance.svg";
import { ReactComponent as NotificationsIcon } from "../../assets/notification.svg";
import { ReactComponent as NotesIcon } from "../../assets/notes.svg";
import { Link } from "react-router-dom";
import "./Navbar.css";

const AccountBar = () => (
  <div className="flex items-center space-x-4 px-4 py-2 bg-neutral-800 text-white square-md cursor-pointer hover:bg-gray-700 gap-2">
    <Link to="/profile" className="flex items-center space-x-2">
      Profile
      <ArrowIcon className="h-4 w-4 text-white" />
    </Link>
    <Link
      to="/register"
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Register
    </Link>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-midnight">
      <div className="w-full sm:w-full lg:px-8">
        <div className="flex items-center h-16 w-full justify-between">
          <div className="flex space-x-9 items-center text-sm">
            <Logo className="w-32" alt="Firstbench logo" />

            <div className="hidden lg:flex ml-10 space-x-9">
              <Link to="/" className="icon-text flex items-center">
                <DashboardIcon className="h-5 w-5" />
                <span className="ml-2">Dashboard</span>
              </Link>
              <Link to="/mocktest_point" className="icon-text flex items-center">
                <NotesIcon className="h-5 w-5" />
                <span className="ml-2">Mock Test</span>
              </Link>
              <Link to="/firstguru" className="icon-text flex items-center">
                <FirstguruIcon className="h-5 w-5" />
                <span className="ml-2">Firstguru</span>
              </Link>
              <Link to="/townhall" className="icon-text flex items-center">
                <TownhallIcon className="h-5 w-5" />
                <span className="ml-2">Townhall</span>
              </Link>
              <Link to="/ai_evaluation" className="icon-text flex items-center">
                <PerformanceIcon className="h-5 w-5" />
                <span className="ml-2">AI Evaluation</span>
              </Link>
              <Link to="/performance" className="icon-text flex items-center">
                <PerformanceIcon className="h-5 w-5" />
                <span className="ml-2">Performance</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <a href="/">
              <NotificationsIcon />
            </a>
            <AccountBar />
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden block">
          {" "}
          {/* Ensure this is only visible below 1024px */}
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/townhall"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Townhall
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Firstguru
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              AI Evaluation
            </Link>
            <Link
              to="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Performance
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
