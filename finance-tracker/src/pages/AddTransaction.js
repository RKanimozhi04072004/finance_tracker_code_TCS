import { useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function AddTransaction() {

    const [transaction, setTransaction] = useState({
        title: "",
        amount: "",
        type: "Income",
        category: "",
        transactionDate: ""
    });

    const handleChange = (e) => {

        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });

    };

    const saveTransaction = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        const data = {

            ...transaction,

            user: {
                id: user.id
            }

        };

        API.post("/transactions", data)
            .then(() => {
                alert("Transaction Added Successfully");
            })
            .catch((error) => {
                console.log(error);
            });

    };
    const categories = [
        "Salary",
        "Food",
        "Transport",
        "Shopping",
        "Entertainment",
        "Bills",
        "Healthcare",
        "Education",
        "Travel",
        "Investment",
        "Other"
    ];
    return (

        <div>

            <Navbar />

            <div className="container mt-4">

                <h2>Add Transaction</h2>

                <input
                    className="form-control mb-3"
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Amount"
                    name="amount"
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="type"
                    onChange={handleChange}
                >
                    <option>Income</option>
                    <option>Expense</option>
                </select>

                <select
                    className="form-control mb-3"
                    name="category"
                    value={transaction.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>

                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}

                </select>

                <input
                    type="date"
                    className="form-control mb-3"
                    name="transactionDate"
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success"
                    onClick={saveTransaction}
                >
                    Save Transaction
                </button>

            </div>

        </div>

    );

}

export default AddTransaction;