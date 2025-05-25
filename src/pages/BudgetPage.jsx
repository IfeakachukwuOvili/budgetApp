// Import necessary modules and components
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// Loader function to fetch budget and expenses data
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

// Action function to handle form submissions for creating and deleting expenses
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

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

// BudgetPage component to display budget details and expenses
const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;

/* 
This file, BudgetPage.jsx, is a React component that represents a page displaying details about a specific budget and its associated expenses. Here's a breakdown of what is going on in this file:

Imports
React Router DOM (rrd) Imports:

useLoaderData: A hook from react-router-dom used to access data loaded by the route's loader function.
Library Imports:

toast from react-toastify: A library for displaying notifications.
Component Imports:

AddExpenseForm: A component for adding new expenses.
BudgetItem: A component for displaying budget details.
Table: A component for displaying a table of expenses.
Helper Imports:

createExpense, deleteItem, getAllMatchingItems: Helper functions for creating expenses, deleting items, and fetching matching items from local storage.
Loader Function
budgetLoader: An asynchronous function that loads the budget and its associated expenses based on the id parameter from the route.
Fetches the budget with the matching id from local storage.
Fetches the expenses associated with the budget.
Throws an error if the budget does not exist.
Returns the budget and expenses.
Action Function
budgetAction: An asynchronous function that handles form submissions for creating and deleting expenses.
Parses form data to determine the action (_action).
If the action is createExpense, it creates a new expense and displays a success notification.
If the action is deleteExpense, it deletes the specified expense and displays a success notification.
Throws an error if there is a problem with creating or deleting the expense.
BudgetPage Component
BudgetPage: The main React component for the budget page.
Uses useLoaderData to access the loaded budget and expenses.
Renders the budget details and a form for adding new expenses.
If there are expenses, it renders a table of expenses.
Main Goal
The main goal of this file is to display the details of a specific budget, allow the user to add new expenses to the budget, and display a list of existing expenses. It also handles the creation and deletion of expenses through form submissions.

Terms
Loader Function: A function that loads data required by a route before rendering the component.
Action Function: A function that handles form submissions and other actions triggered by the user.
useLoaderData: A hook from react-router-dom that provides access to the data loaded by the route's loader function.
toast: A notification message that appears temporarily to inform the user of an action's success or failure.

 */