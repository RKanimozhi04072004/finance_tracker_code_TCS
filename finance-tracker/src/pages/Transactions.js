import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function Transactions() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        API.get("/transactions/user/" + user.id)
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteTransaction = (id) => {

        API.delete("/transactions/" + id)
            .then(() => {
                alert("Transaction Deleted Successfully");
                loadTransactions();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (

        <div>

            <Navbar />

            <div className="container mt-4">

                <h2>Transactions</h2>

                <table className="table table-bordered">

                    <thead>

                        <tr>
                            <th>S.No</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Action</th>

                        </tr>

                    </thead>
                    <tbody>

                        {transactions.map((transaction, index) => (

                            <tr key={transaction.id}>

                                <td>{index + 1}</td>

                                <td>{transaction.title}</td>

                                <td>{transaction.amount}</td>

                                <td>{transaction.type}</td>

                                <td>{transaction.category}</td>

                                <td>{transaction.transactionDate}</td>

                                <td>

                                    <Link
                                        to={"/edit-transaction/" + transaction.id}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteTransaction(transaction.id)}
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

export default Transactions;