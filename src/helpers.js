// This file contains various helper functions for the React Budget application.

// `waait` function creates a promise that resolves after a random delay up to 800ms.
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// `generateRandomColor` function generates a random color based on the number of existing budgets.
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// `fetchData` function retrieves data from local storage by key.
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// `getAllMatchingItems` function retrieves all items from local storage that match a specific key-value pair.
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// `deleteItem` function deletes an item from local storage by key and id.
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// `createBudget` function creates a new budget and saves it to local storage.
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem])
  );
};

// `createExpense` function creates a new expense and saves it to local storage.
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem])
  );
};

// `calculateSpentByBudget` function calculates the total amount spent for a specific budget.
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// `formatDateToLocaleString` function formats a date (in epoch time) to a locale string.
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// `formatPercentage` function formats a number as a percentage string.
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// `formatCurrency` function formats a number as a currency string in USD.
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};