// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//  helper functions
import { createBudget, createExpense, fetchData, waait } from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

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
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 7)}
                    />
                    {expenses.length > 7 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;


/**
 * This file, Dashboard.jsx, is a React component that represents the dashboard page of the React Budget application. Here's a breakdown of what is going on in this file:

Imports
React Router DOM (rrd) Imports:

Link: A component from react-router-dom used for navigation.
useLoaderData: A hook from react-router-dom used to access data loaded by the route's loader function.
Library Imports:

toast from react-toastify: A library for displaying notifications.
Component Imports:

Intro: A component that displays an introductory message for new users.
AddBudgetForm: A component for adding new budgets.
AddExpenseForm: A component for adding new expenses.
BudgetItem: A component for displaying budget details.
Table: A component for displaying a table of expenses.
Helper Imports:

createBudget, createExpense, fetchData, waait: Helper functions for creating budgets and expenses, fetching data from local storage, and simulating a delay.
Loader Function
dashboardLoader: A function that loads the user's name, budgets, and expenses from local storage.
Fetches the user's name, budgets, and expenses from local storage.
Returns the fetched data.
Action Function
dashboardAction: An asynchronous function that handles form submissions for creating new users, budgets, and expenses.
Parses form data to determine the action (_action).
If the action is newUser, it creates a new user and displays a success notification.
If the action is createBudget, it creates a new budget and displays a success notification.
If the action is createExpense, it creates a new expense and displays a success notification.
Throws an error if there is a problem with creating the user, budget, or expense.
Dashboard Component
Dashboard: The main React component for the dashboard page.
Uses useLoaderData to access the loaded user name, budgets, and expenses.
If the user name exists, it displays a welcome message, the budget form, and the expense form.
If there are existing budgets, it displays the budgets and recent expenses.
If there are more than 7 expenses, it provides a link to view all expenses.
If there are no budgets, it displays a message encouraging the user to create a budget.
If the user name does not exist, it displays the introductory message.
Main Goal
The main goal of this file is to display the user's dashboard, which includes a welcome message, forms for adding budgets and expenses, a list of existing budgets, and a list of recent expenses. It also handles the creation of new users, budgets, and expenses through form submissions.

Terms
Loader Function: A function that loads data required by a route before rendering the component.
Action Function: A function that handles form submissions and other actions triggered by the user.
useLoaderData: A hook from react-router-dom that provides access to the data loaded by the route's loader function.
toast: A notification message that appears temporarily to inform the user of an action's success or failure.
 */