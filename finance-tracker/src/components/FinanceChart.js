import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function FinanceChart({ income, expense }) {

    const data = {

        labels: ["Income", "Expense"],

        datasets: [

            {
                data: [income, expense],
                backgroundColor: [
                    "#28a745",
                    "#dc3545"
                ]
            }

        ]

    };

    return (

        <div style={{ width: "350px" }}>

            <Pie data={data} />

        </div>

    );

}

export default FinanceChart;