// rrd imports
import { useLoaderData } from "react-router-dom";

// library import
import { toast } from "react-toastify";

// component imports
import Table from "../components/Table";

// helpers
import { deleteItem, fetchData } from "../helpers";

// loader
export async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

// action
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;

/**
 * This file, ExpensesPage.jsx, is a React component that represents the expenses page of the React Budget application. Here's a breakdown of what is going on in this file:

Imports
React Router DOM (rrd) Imports:

useLoaderData: A hook from react-router-dom used to access data loaded by the route's loader function.
Library Imports:

toast from react-toastify: A library for displaying notifications.
Component Imports:

Table: A component for displaying a table of expenses.
Helper Imports:

deleteItem, fetchData: Helper functions for deleting items and fetching data from local storage.
Loader Function
expensesLoader: An asynchronous function that loads the expenses data from local storage.
Fetches the expenses from local storage.
Returns the fetched expenses.
Action Function
expensesAction: An asynchronous function that handles form submissions for deleting expenses.
Parses form data to determine the action (_action).
If the action is deleteExpense, it deletes the specified expense and displays a success notification.
Throws an error if there is a problem with deleting the expense.
ExpensesPage Component
ExpensesPage: The main React component for the expenses page.
Uses useLoaderData to access the loaded expenses.
Renders a heading "All Expenses".
If there are expenses, it displays the number of expenses and a table of expenses.
If there are no expenses, it displays a message "No Expenses to show".
Main Goal
The main goal of this file is to display a list of all expenses, allow the user to delete expenses, and handle the deletion of expenses through form submissions.

Terms
Loader Function: A function that loads data required by a route before rendering the component.
Action Function: A function that handles form submissions and other actions triggered by the user.
useLoaderData: A hook from react-router-dom that provides access to the data loaded by the route's loader function.
toast: A notification message that appears temporarily to inform the user of an action's success or failure.

 */