import { useState, useEffect } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function Budget() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [budget, setBudget] = useState({
        id: "",
        category: "",
        monthlyLimit: "",
        month: ""
    });

    const [budgets, setBudgets] = useState([]);

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        loadBudgets();
    }, []);

    const loadBudgets = () => {

        API.get("/budgets/user/" + user.id)
            .then((response) => {
                setBudgets(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const handleChange = (e) => {

        setBudget({
            ...budget,
            [e.target.name]: e.target.value
        });

    };


    const saveBudget = () => {

        const data = {
            ...budget,
            user: {
                id: user.id
            }
        };

        API.post("/budgets", data)
            .then(() => {

                alert("Budget Saved Successfully");

                loadBudgets();

                clearForm();

            })
            .catch((error) => {
                console.log(error);
            });

    };


    const editBudget = (b) => {

        setBudget({
            id: b.id,
            category: b.category,
            monthlyLimit: b.monthlyLimit,
            month: b.month
        });

        setEditing(true);

    };


    const updateBudget = () => {

        const data = {
            ...budget,
            user: {
                id: user.id
            }
        };

        API.put("/budgets/" + budget.id, data)
            .then(() => {

                alert("Budget Updated Successfully");

                loadBudgets();

                clearForm();

                setEditing(false);

            })
            .catch((error) => {
                console.log(error);
            });

    };


    const deleteBudget = (id) => {

        API.delete("/budgets/" + id)
            .then(() => {

                alert("Budget Deleted Successfully");

                loadBudgets();

            })
            .catch((error) => {
                console.log(error);
            });

    };

    const clearForm = () => {

        setBudget({
            id: "",
            category: "",
            monthlyLimit: "",
            month: ""
        });

    };
    const categories = [
        "Food",
        "Transport",
        "Shopping",
        "Entertainment",
        "Bills",
        "Healthcare",
        "Education",
        "Travel",
        "Other"
    ];
    return (

        <div>

            <Navbar />

            <div className="container mt-4">

                <h2>Budget Management</h2>

                <select
                    className="form-control mb-3"
                    name="category"
                    value={budget.category}
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
                    type="number"
                    className="form-control mb-3"
                    placeholder="Monthly Limit"
                    name="monthlyLimit"
                    value={budget.monthlyLimit}
                    onChange={handleChange}
                />

                <input
                    type="month"
                    className="form-control mb-3"
                    placeholder="Month"
                    name="month"
                    value={budget.month}
                    onChange={handleChange}
                />

                {!editing ? (

                    <button
                        className="btn btn-success me-2"
                        onClick={saveBudget}
                    >
                        Save Budget
                    </button>

                ) : (

                    <>
                        <button
                            className="btn btn-primary me-2"
                            onClick={updateBudget}
                        >
                            Update Budget
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => {

                                clearForm();

                                setEditing(false);

                            }}
                        >
                            Cancel
                        </button>
                    </>

                )}

                <hr />

                <table className="table table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Category</th>
                            <th>Monthly Limit</th>
                            <th>Month</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {budgets.map((b, index) => (

                            <tr key={b.id}>
                                <td>{index + 1}</td>
                                <td>{b.category}</td>
                                <td>₹ {b.monthlyLimit}</td>
                                <td>{b.month}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editBudget(b)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteBudget(b.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Budget;