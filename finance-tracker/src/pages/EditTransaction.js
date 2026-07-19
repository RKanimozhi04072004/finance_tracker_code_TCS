import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/Api";
import Navbar from "../components/Navbar";

function EditTransaction() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [transaction, setTransaction] = useState({
        title: "",
        amount: "",
        type: "Income",
        category: "",
        transactionDate: ""
    });

    useEffect(() => {

        API.get("/transactions/" + id)
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]);

    const handleChange = (e) => {

        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });

    };

    const updateTransaction = () => {

        const user = JSON.parse(localStorage.getItem("user"));

        const data = {

            ...transaction,

            user: {
                id: user.id
            }

        };

        API.put("/transactions/" + id, data)
            .then(() => {

                alert("Transaction Updated Successfully");

                navigate("/transactions");

            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (

        <div>

            <Navbar />

            <div className="container mt-4">

                <h2>Edit Transaction</h2>

                <input
                    className="form-control mb-3"
                    name="title"
                    value={transaction.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <input
                    className="form-control mb-3"
                    name="amount"
                    value={transaction.amount}
                    onChange={handleChange}
                    placeholder="Amount"
                />

                <select
                    className="form-control mb-3"
                    name="type"
                    value={transaction.type}
                    onChange={handleChange}
                >
                    <option>Income</option>
                    <option>Expense</option>
                </select>

                <input
                    className="form-control mb-3"
                    name="category"
                    value={transaction.category}
                    onChange={handleChange}
                    placeholder="Category"
                />

                <input
                    type="date"
                    className="form-control mb-3"
                    name="transactionDate"
                    value={transaction.transactionDate}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-primary"
                    onClick={updateTransaction}
                >
                    Update Transaction
                </button>

            </div>

        </div>

    );

}

export default EditTransaction;