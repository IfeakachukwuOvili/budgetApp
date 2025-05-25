import { useRouteError, Link, useNavigate } from "react-router-dom"

// library imports
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid"

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="error">
      <h1>Uh oh! We’ve got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button
          className="btn btn--dark"
          onClick={() => navigate(-1)}
        >
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link
          to="/"
          className="btn btn--dark"
        >
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  )
}
export default Error

/**
 * This file, Error.jsx, is a React component that represents an error page for the React Budget application. Here's a breakdown of what is going on in this file:

Imports
React Router DOM (rrd) Imports:

useRouteError: A hook from react-router-dom used to access the error thrown by the route.
Link: A component from react-router-dom used for navigation.
useNavigate: A hook from react-router-dom used to programmatically navigate to different routes.
Library Imports:

HomeIcon, ArrowUturnLeftIcon from @heroicons/react/24/solid: Icons used for the buttons.
Error Component
Error: The main React component for the error page.
Uses useRouteError to access the error thrown by the route.
Uses useNavigate to programmatically navigate to different routes.
Renders a message indicating that there is a problem.
Displays the error message or status text.
Provides two buttons:
A "Go Back" button that navigates to the previous page.
A "Go home" button that navigates to the home page.
Main Goal
The main goal of this file is to display an error page when there is a problem with the route. It provides the user with options to go back to the previous page or navigate to the home page.

Terms
useRouteError: A hook from react-router-dom that provides access to the error thrown by the route.
useNavigate: A hook from react-router-dom that allows programmatic navigation to different routes.
Link: A component from react-router-dom used for navigation.
Heroicons: A set of free, MIT-licensed high-quality SVG icons for you to use in your web projects.
 */