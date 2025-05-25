// Importing necessary components and hooks from react-router-dom
import { Outlet, useLoaderData } from "react-router-dom";

// Importing assets
import wave from "../assets/wave.svg";

// Importing the Nav component
import Nav from "../components/Nav";

// Importing the fetchData helper function
import { fetchData } from "../helpers"

// Loader function to fetch data before rendering the component
export function mainLoader() {
  // Fetching the userName from local storage or any other data source
  const userName = fetchData("userName");
  // Returning the fetched userName as an object
  return { userName }
}

// Main layout component definition
const Main = () => {
  // Using the useLoaderData hook to get the data returned by the loader function
  const { userName } = useLoaderData()

  // Rendering the Main layout component
  return (
    <div className="layout">
      {/* Rendering the Nav component and passing the userName as a prop */}
      <Nav userName={userName} />
      <main>
        {/* Rendering the child routes */}
        <Outlet />
      </main>
      {/* Displaying an image */}
      <img src={wave} alt="" />
    </div>
  )
}

// Exporting the Main component as the default export
export default Main

/**
 * This file, Main.jsx, is a React component that represents the main layout of the React Budget application. Here's a breakdown of what is going on in this file:

Imports
React Router DOM (rrd) Imports:

Outlet: A component from react-router-dom used to render child routes.
useLoaderData: A hook from react-router-dom used to access data loaded by the route's loader function.
Asset Imports:

wave: An SVG image imported from the assets folder.
Component Imports:

Nav: A component for rendering the navigation bar.
Helper Imports:

fetchData: A helper function for fetching data from local storage.
Loader Function
mainLoader: A function that loads data required by the main layout before rendering the component.
Fetches the userName from local storage using the fetchData helper function.
Returns the fetched userName as an object.
Main Component
Main: The main React component for the layout.
Uses useLoaderData to access the data returned by the loader function.
Renders the Nav component and passes the userName as a prop.
Uses Outlet to render child routes within the main layout.
Displays an image (wave) at the bottom of the layout.
Main Goal
The main goal of this file is to define the main layout of the application, which includes the navigation bar, a section for rendering child routes, and a decorative image. It ensures that the userName is fetched and passed to the Nav component for display.

Terms
Loader Function: A function that loads data required by a route before rendering the component.
useLoaderData: A hook from react-router-dom that provides access to the data loaded by the route's loader function.
Outlet: A component from react-router-dom used to render child routes within a parent route.
 */