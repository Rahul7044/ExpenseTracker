import React, { useState, useEffect } from "react";
import SingleExpense from "./SingleExpense";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const initialState = () => {
    const value = "Food";
    return value;
  };
  const [category, setCategory] = useState(initialState);
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const getExpenses = () => {
    fetch(
      "https://react-http-efb57-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((data) => {
            let errorMessage = "Authotication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        let arr = [];
        for (let key in data) {
          arr.push({
            description: data[key].description,
            amount: data[key].amount,
            category: data[key].category,
          });
        }
        setExpenses(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const expenseFormHandler = (event) => {
    event.preventDefault();
    const data = {
      amount: amount,
      description: description,
      category: category,
    };
    fetch(
      "https://react-http-efb57-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        alert(err);
      });
    setExpenses((prevExp) => {
      let newExpense = [...prevExp];
      newExpense.push(data);
      return newExpense;
    });
    setAmount(0);
    setDescription("");
    setCategory(initialState);
  };
  useEffect(() => {
    getExpenses();
    console.log(expenses);
  }, []);
  return (
    <>
      <div className="form">
        <form onSubmit={expenseFormHandler}>
          <div className="allInput">
            <div className="form-input">
              <h5>Enter Amount</h5>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>
            <div>
              <h5>Description</h5>
              <input
                type="text"
                value={description}
                placeholder="Enter description"
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
            <div>
              <h5>ADD CATEGORY</h5>
              <select
                className="input"
                id="category"
                onChange={categoryHandler}
              >
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
          </div>

          <div>
            <button className="btn">Add Expense</button>
          </div>
        </form>
      </div>

      <div className="form">
        {expenses.map((expense, index) => {
          return (
            <SingleExpense
              key={index}
              amount={expense.amount}
              desc={expense.description}
              category={expense.category}
            />
          );
        })}
      </div>
    </>
  );
};

export default Expenses;
