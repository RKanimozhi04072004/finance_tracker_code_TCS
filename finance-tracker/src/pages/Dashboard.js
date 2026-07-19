import { useEffect, useState } from "react";
import API from "../services/Api";
import Navbar from "../components/Navbar";
import FinanceChart from "../components/FinanceChart";
import BudgetAnalytics from "./BudgetAnalytics"
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [dashboard, setDashboard] = useState({
        income: 0,
        expense: 0,
        balance: 0
    });
     const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
        }

    }, []);
    const user = JSON.parse(localStorage.getItem("user"));
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );
    useEffect(() => {
        if (user) {
            API.get("/dashboard/" + user.id)
                .then((response) => {
                    setDashboard(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const downloadCSV = async () => {
        try {
            const response = await API.get(
                `/export/csv/${user.id}?month=${selectedMonth}`,
                {
                    responseType: "blob"
                }

            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "Monthly_Report.csv"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.log(error);

            alert("Download Failed");

        }

    };
    return (
        <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
            <Navbar />

            <div className="container mt-4">
                <div className="mb-4">

                    <h2>

                        Welcome,

                        <span className="text-primary">

                            {" " + user.name}

                        </span>

                    </h2>


                    <p className="text-muted">

                        Manage your personal finance easily.

                    </p>


                </div>


                <div className="row">


                    <div className="col-md-4">


                        <div className="card shadow border-0 bg-success text-white">


                            <div className="card-body text-center">


                                <h5>Total Cash</h5>


                                <h2>
                                    ₹ {dashboard.income}
                                </h2>


                            </div>


                        </div>


                    </div>


                    <div className="col-md-4">


                        <div className="card shadow border-0 bg-danger text-white">


                            <div className="card-body text-center">


                                <h5>Total Expense</h5>


                                <h2>
                                    ₹ {dashboard.expense}
                                </h2>


                            </div>


                        </div>


                    </div>

                    <div className="col-md-4">


                        <div className="card shadow border-0 bg-primary text-white">


                            <div className="card-body text-center">


                                <h5>Balance</h5>


                                <h2>
                                    ₹ {dashboard.balance}
                                </h2>


                            </div>


                        </div>


                    </div>


                </div>

                <div className="row mt-5">


                    <div className="col-md-6">


                        <div className="card shadow">


                            <div className="card-body">


                                <h4 className="text-center">

                                    Income vs Expense

                                </h4>


                                <FinanceChart

                                    income={dashboard.income}

                                    expense={dashboard.expense}

                                />


                            </div>


                        </div>


                    </div>


                    <div className="col-md-6">


                        <div className="card shadow">


                            <div className="card-body">


                                <h4 className="text-center">

                                    Finance Summary

                                </h4>



                                <table className="table">


                                    <tbody>


                                        <tr>

                                            <td>
                                                <b>Total Income</b>
                                            </td>


                                            <td className="text-success">

                                                ₹ {dashboard.income}

                                            </td>

                                        </tr>





                                        <tr>

                                            <td>
                                                <b>Total Expense</b>
                                            </td>


                                            <td className="text-danger">

                                                ₹ {dashboard.expense}

                                            </td>

                                        </tr>





                                        <tr>

                                            <td>
                                                <b>Available Balance</b>
                                            </td>


                                            <td className="text-primary">

                                                ₹ {dashboard.balance}

                                            </td>

                                        </tr>



                                    </tbody>


                                </table>


                            </div>


                        </div>


                    </div>



                </div>


                <div className="row mt-5">


                    <div className="col-md-12">


                        <div className="card shadow">


                            <div className="card-body">


                                <h4>
                                    Quick Statistics
                                </h4>




                                <p>
                                    Total Income
                                </p>



                                <div className="progress mb-3">


                                    <div

                                        className="progress-bar bg-success"

                                        style={{ width: "100%" }}

                                    >

                                        ₹ {dashboard.income}


                                    </div>


                                </div>






                                <p>
                                    Total Expense
                                </p>



                                <div className="progress mb-3">


                                    <div


                                        className="progress-bar bg-danger"


                                        style={{

                                            width:

                                                dashboard.income > 0

                                                    ?

                                                    (dashboard.expense / dashboard.income) * 100 + "%"

                                                    :

                                                    "0%"

                                        }}


                                    >


                                        ₹ {dashboard.expense}


                                    </div>



                                </div>



                            </div>


                        </div>


                    </div>


                </div>



                <div className="row mt-5">


                    <div className="col-md-12">


                        <div className="card shadow">

                        </div>


                    </div>


                </div>





            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <BudgetAnalytics />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">

                <div className="col-md-12">

                    <div className="card shadow">

                        <div className="card-body">

                            <h4 className="mb-4">
                                Monthly Expense Report
                            </h4>

                            <div className="row align-items-end">

                                <div className="col-md-4">

                                    <label className="form-label">
                                        Select Month
                                    </label>

                                    <input
                                        type="month"
                                        className="form-control"
                                        value={selectedMonth}
                                        onChange={(e) =>
                                            setSelectedMonth(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="col-md-4">

                                    <button
                                        className="btn btn-success mt-4"
                                        onClick={downloadCSV}
                                    >
                                        📊 Download CSV
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>


    );


}


export default Dashboard;