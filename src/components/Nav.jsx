// Importing necessary components and hooks from react-router-dom
import { Form, NavLink } from "react-router-dom";

// Importing the TrashIcon component from the heroicons library
import { TrashIcon } from '@heroicons/react/24/solid';

// Importing assets
import logomark from "../assets/logomark.svg";

// Nav component definition, accepting userName as a prop
const Nav = ({ userName }) => {
  return (
    <nav>
      {/* NavLink component to navigate to the home page */}
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        {/* Displaying the logo image */}
        <img src={logomark} alt="" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {
        // Conditionally rendering the form if userName is present
        userName && (
          <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              // Confirming with the user before deleting the user and all data
              if (!confirm("Delete user and all data?")) {
                event.preventDefault()
              }
            }}
          >
            {/* Button to submit the form and delete the user */}
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )
      }
    </nav>
  )
}

// Exporting the Nav component as the default export
export default Nav