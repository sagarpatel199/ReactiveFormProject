import React, { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/components/categories";

const App = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 5, category: "Groceries" },
    { id: 2, description: "aaa", amount: 1, category: "Entertainment" },
    { id: 3, description: "aaa", amount: 3, category: "Utility" },
    { id: 4, description: "aaa", amount: 6, category: "Groceries" },
  ]);

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelectCategory={(category) => console.log(category)} />
      </div>
      <ExpenseList
        expenses={expenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
};

export default App;
