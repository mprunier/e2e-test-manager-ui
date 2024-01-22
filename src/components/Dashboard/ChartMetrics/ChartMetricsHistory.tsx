import { useGetMetricsHistory } from "../../../services/useGetMetricsHistory.tsx";
import { Line } from "react-chartjs-2";

import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { Error } from "../../Common/Error/Error.tsx";
import { LoadingSVG } from "../../../assets/images/LoadingSVG.tsx";
import { useState } from "react";
import { formatDateTime } from "../../../utils/dateUtils.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

interface IParams {
    closeModal: () => void;
}

export const ChartMetricsHistory = (props: IParams) => {
    const { closeModal } = props;

    const [period, setPeriod] = useState("week");

    const { data, isLoading, error } = useGetMetricsHistory({ period });

    const chartData = {
        labels: data.map((d) => formatDateTime(new Date(d.at))),
        datasets: [
            {
                label: "Tests",
                data: data.map((d) => d.tests),
                borderColor: "rgb(201, 203, 207)",
                backgroundColor: "rgba(201, 203, 207, 0.5)",
            },
            {
                label: "Passes",
                data: data.map((d) => d.passes),
                borderColor: "rgb(35,124,30)",
                backgroundColor: "rgb(93,163,65)",
            },
            {
                label: "Failures",
                data: data.map((d) => d.failures),
                borderColor: "rgb(255,86,86)",
                backgroundColor: "rgba(255,86,86,0.5)",
            },
            {
                label: "Skipped",
                data: data.map((d) => d.skipped),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    return (
        <div
            className="fixed inset-0 -top-8 z-50 flex flex-col items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={closeModal}
        >
            <div className="w-3/5 rounded-lg bg-white p-5 shadow-lg" onClick={(e) => e.stopPropagation()}>
                {isLoading && (
                    <div className="mt-4 flex w-3/4 justify-center rounded-md bg-blue-50 p-4">
                        <LoadingSVG />
                    </div>
                )}
                {error && <Error status={error.status} errorMessage={error.detail} />}
                {!isLoading && !error && <Line data={chartData} options={{ responsive: true }} />}
                <div className="mt-4 flex items-center justify-center gap-12">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="h-8 cursor-pointer rounded border-2 border-gray-300 pl-3 pr-8 text-sm focus:border-cyan-500 focus:ring-cyan-500"
                    >
                        <option value="day">1 Day</option>
                        <option value="week">1 Week</option>
                        <option value="month">1 Month</option>
                        <option value="3months">3 Months</option>
                        <option value="6months">6 Months</option>
                        <option value="year">1 Year</option>
                    </select>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="h-8 rounded bg-cyan-900 px-5 text-sm font-medium text-white hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
