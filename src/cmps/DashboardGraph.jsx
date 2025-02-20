import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);


export function DashboardGraph({ orders = [] }) {

    const orderStatusesMap = countOrderStatuses(orders)
    const { rejected, approved, pending, done } = orderStatusesMap
    const data = {
        labels: ['Rejected', 'Approved', 'Pending', 'Done'],
        datasets: [
            {
                label: '# of Orders',
                title: 'Orders Count by Status',
                data: [rejected, approved, pending, done],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',

                ],
                borderWidth: 1,
            },
        ],
    }



    function countOrderStatuses(orders) {
        return orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1
            return acc
        }, {})

    }

    return (
        <section className="dashboard-graph">
            <div className="doughnut-graph graph">
                <Doughnut data={data} />
            </div>
        </section>
    )
}