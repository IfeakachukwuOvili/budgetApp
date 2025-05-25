// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }
  return redirect("/");
}

/**
 * This file, deleteBudget.js, is a JavaScript module that defines a function to delete a budget and its associated expenses from the React Budget application. Here's a breakdown of what is going on in this file:

Imports
React Router DOM (rrd) Imports:

redirect: A function from react-router-dom used to programmatically navigate to a different route after an action is performed.
Library Imports:

toast from react-toastify: A library for displaying notifications.
Helper Imports:

deleteItem: A helper function for deleting items from local storage.
getAllMatchingItems: A helper function for fetching items from local storage that match a specific key-value pair.
deleteBudget Function
deleteBudget: The main function that handles the deletion of a budget and its associated expenses.
Parameters: Takes an object with params as a property, which contains the id of the budget to be deleted.
Steps:
Delete the Budget: Calls deleteItem to delete the budget with the specified id from local storage.
Fetch Associated Expenses: Calls getAllMatchingItems to fetch all expenses associated with the budget.
Delete Associated Expenses: Iterates over the fetched expenses and calls deleteItem to delete each expense from local storage.
Display Success Notification: Uses toast.success to display a success notification indicating that the budget was deleted successfully.
Error Handling: Catches any errors that occur during the deletion process and throws a new error with a descriptive message.
Redirect: Uses redirect to navigate the user to the home page ("/") after the budget and its expenses are deleted.
Main Goal
The main goal of this file is to define a function that deletes a budget and all its associated expenses from local storage, displays a success notification, and redirects the user to the home page.

Terms
redirect: A function from react-router-dom that allows programmatic navigation to a different route.
toast: A notification message that appears temporarily to inform the user of an action's success or failure.
deleteItem: A helper function that deletes an item from local storage based on a specified key and id.
getAllMatchingItems: A helper function that fetches items from local storage that match a specific key-value pair.

 */