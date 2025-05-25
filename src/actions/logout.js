
// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName"
  })
  deleteItem({
    key: "budgets"
  })
  deleteItem({
    key: "expenses"
  })
  toast.success("You’ve deleted your account!")
  // return redirect
  return redirect("/")
}

/**
 * This file, logout.js, is a JavaScript module that defines a function to handle the logout action in the React Budget application. Here's a breakdown of what is going on in this file:

Imports
React Router DOM (rrd) Imports:

redirect: A function from react-router-dom used to programmatically navigate to a different route after an action is performed.
Library Imports:

toast from react-toastify: A library for displaying notifications.
Helper Imports:

deleteItem: A helper function for deleting items from local storage.
logoutAction Function
logoutAction: The main asynchronous function that handles the logout process.
Steps:
Delete User Data: Calls deleteItem to delete the userName, budgets, and expenses from local storage.
Display Success Notification: Uses toast.success to display a success notification indicating that the account has been deleted.
Redirect: Uses redirect to navigate the user to the home page ("/") after the logout process is complete.
Main Goal
The main goal of this file is to define a function that deletes all user-related data from local storage, displays a success notification, and redirects the user to the home page.

Terms
redirect: A function from react-router-dom that allows programmatic navigation to a different route.
toast: A notification message that appears temporarily to inform the user of an action's success or failure.
deleteItem: A helper function that deletes an item from local storage based on a specified key.
 */