import React from "react";
import styles from "./Dashboard.module.css";
import { Navigate } from "react-router-dom";
import { Session } from "../../model/utils/Session";
import { Bar, Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import UserResponse, { CountResponse } from "../../model/interfaces/UserResponse";
import UserService from "../../services/UserService/UserService";
import MainHeader from "../../components/MainHeader/MainHeader";

Chart.register(CategoryScale);
Chart.defaults.font.size = 16;

class Dashboard extends React.Component<any, any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            chartData: undefined,
            lineChartData: undefined,
            optionsChartData: undefined,
            optionsLineChartData: undefined,
            createdUser: [],
            arrayUser: undefined,
            userData: undefined,
        };
    }

    componentDidMount(): void {
        this.getUserByActive();
        this.getUserByCreatedForChart();
    }

    private async getUserByActive() {
        const activeResponse: CountResponse = await UserService.getUserByActive(true);
        const inactiveResponse: CountResponse = await UserService.getUserByActive(false);

        const activeUsers = activeResponse.data;
        const inactiveUsers = inactiveResponse.data;
        const totalUsers = activeUsers + inactiveUsers;

        const options = {
            responsive: true,


            plugins: {
                title: {
                    display: true,
                    color: "#333",
                    text: "Usuários Ativos x Inativos",
                    padding: { bottom: 30 }
                },
                legend: {
                    display: false,
                    labels: { font: { size: 12 } },
                },
            },
            scales: {
                x: {
                    min: 0,
                    grid: { color: "white", drawOnChartArea: false, offset: true },
                    ticks: { color: "#2F4F4F", lineWidth: 1 },
                },
                y: {
                    min: 0,
                    grid: { color: "white", drawOnChartArea: false },
                    ticks: { color: "#2F4F4F", lineWidth: 2, stepSize: 1 },
                },
            },
        };

        const chartData = {
            labels: ["Ativos", "Inativos"],
            datasets: [
                {
                    label: "Usuários",
                    data: [activeUsers, inactiveUsers],
                    backgroundColor: ["#060047", "#F36E29"],
                    borderColor: "white",
                    barThickness: 80,
                    borderWidth: 2,
                },
            ],
        };

        this.setState(() => ({
            chartData: chartData,
            optionsChartData: options,
            activeUsers: activeUsers,
            inactiveUsers: inactiveUsers,
            totalUsers: totalUsers
        }));
    }

    private getCreateUsersCountByDay(users: { createdAt: string }[]) {
        const countMap = new Map<string, number>()
        console.log('usuários: ', users)
        for (const user of users) {
            const userCreatedDay = user.createdAt.split('T')[0]
            const currentCount = countMap.get(userCreatedDay) ?? 0
            countMap.set(userCreatedDay, currentCount + 1)
        }

        console.log('Mapa: ', countMap)

        const countArray = Array.from(countMap.entries()).map(dayCountPair => ({
            day: dayCountPair[0],
            count: dayCountPair[1],
            time: new Date(dayCountPair[0]).getTime()
        }))

        countArray.sort((a, b) => a.time - b.time)

        console.log('countArray ordenado: ', countArray)

        return countArray
    };

    private async getUserByCreatedForChart() {
        const createdAtResponse: UserResponse =
            await UserService.getUserByCreatedForChart();

        const users = createdAtResponse.data;
        const countArray = this.getCreateUsersCountByDay(users as unknown as { createdAt: string }[])
        const option = {
            type: 'line',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    color: "#333",
                    text: "Usuários cadastrados x Data",
                    padding: { bottom: 90 }
                },
                legend: {
                    display: false,
                    labels: { font: { size: 12 } },
                },
            },
            scales: {
                x: {
                    min: 0,
                    grid: { color: "white", drawOnChartArea: true },
                    ticks: { color: "#2F4F4F", lineWidth: 2 },
                },
                y: {
                    min: 0,
                    grid: { color: "white", drawOnChartArea: false },
                    ticks: { color: "#2F4F4F", lineWidth: 2, stepSize: 1 },
                    stacked: true
                },
            },
        };

        const lineChartData = {
            labels: countArray.map((item) => {
                const dateParts = item.day.split("-");
                const month = dateParts[1];
                const day = dateParts[2];
                return `${day}/${month}`;
            }),
            datasets: [
                {
                    label: "Quantidade",
                    data: countArray.map(item => item.count),
                    borderColor: "#060047",
                    fill: false,
                    tension: 0,
                },
            ],
        };

        this.setState({
            lineChartData: lineChartData,
            optionsLineChartData: option,
        });
    }


    render() {
        console.log(this);
        const session = Session();

        if (session.profile.type === 1) {
            return (
                <div className={styles.content}>
                    <MainHeader title="Dashboard" area="Navegação" pages={["Dashboard"]} />
                    <div className={`${styles.container} ${styles.chartArea}`}>
                        {this.state.chartData && (
                            <div className={`${styles.userChart} ${styles.chart}`}>
                                <Bar data={this.state.chartData} options={this.state.optionsChartData} />
                            </div>
                        )}
                        {this.state.lineChartData && (
                            <div className={`${styles.userLineChart} ${styles.chart}`}>
                                <Line
                                    data={this.state.lineChartData}
                                    options={this.state.optionsLineChartData}
                                />
                            </div>
                        )}
                        <div className={`${styles.chart} ${styles.chartTotalUsers}`}>Usuários totais cadastrados <br /> {this.state.totalUsers}</div>
                    </div>
                </div>
            );
        } else {
            return <Navigate to="/initialuser" />;
        }
    }
}

export default Dashboard;
