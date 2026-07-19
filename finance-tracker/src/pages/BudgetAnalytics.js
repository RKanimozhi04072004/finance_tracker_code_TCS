import { useEffect, useState } from "react";
import API from "../services/Api";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

function BudgetAnalytics() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {

        if (user) {
            loadAnalytics();
        }

    }, []);

    const loadAnalytics = () => {

        API.get("/budget-analytics/" + user.id)
            .then((response) => {
                setAnalytics(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const getProgress = (spent, budget) => {

        if (budget === 0) return 0;

        let percent = (spent / budget) * 100;

        if (percent > 100) {
            percent = 100;
        }

        return percent;
    };

    const getColor = (status) => {

        if (status === "Over Budget")
            return "bg-danger";

        if (status === "Near Limit")
            return "bg-warning";

        return "bg-success";
    };

    return (

        <div>

            <h3 className="mb-4 text-center">
                Budget Analytics
            </h3>

            <ResponsiveContainer width="100%" height={350}>

                <BarChart data={analytics}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="category" />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                        dataKey="budget"
                        fill="#0d6efd"
                        name="Budget"
                    />

                    <Bar
                        dataKey="spent"
                        fill="#dc3545"
                        name="Spent"
                    />

                </BarChart>

            </ResponsiveContainer>

            <div className="mt-5">

                {analytics.map((item, index) => (

                    <div
                        className="card shadow mb-4"
                        key={index}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between">

                                <h5>{item.category}</h5>

                                <span
                                    className={
                                        "badge " +
                                        (item.status === "Over Budget"
                                            ? "bg-danger"
                                            : item.status === "Near Limit"
                                                ? "bg-warning text-dark"
                                                : "bg-success")
                                    }
                                >
                                    {item.status}
                                </span>

                            </div>

                            <br />

                            <div className="row">

                                <div className="col-md-4">
                                    <strong>Budget</strong>
                                    <br />
                                    ₹ {item.budget}
                                </div>

                                <div className="col-md-4">
                                    <strong>Spent</strong>
                                    <br />
                                    ₹ {item.spent}
                                </div>

                                <div className="col-md-4">
                                    <strong>Remaining</strong>
                                    <br />
                                    ₹ {item.remaining}
                                </div>

                            </div>

                            <br />

                            <div className="progress">

                                <div
                                    className={
                                        "progress-bar " +
                                        getColor(item.status)
                                    }
                                    role="progressbar"
                                    style={{
                                        width:
                                            getProgress(
                                                item.spent,
                                                item.budget
                                            ) + "%"
                                    }}
                                >
                                    {Math.round(
                                        getProgress(
                                            item.spent,
                                            item.budget
                                        )
                                    )}
                                    %
                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default BudgetAnalytics;