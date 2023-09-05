import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function PlayerWinChart(props) {
  const [stats, setStats] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    fetch(`/api/stats/player/win-chart?id=${props.id}&days=14`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  var min = Math.abs(Math.min.apply(null, stats));
  var max = Math.max.apply(null, stats);
  var boundary = min > max ? min : max;
  const labels = Object.keys(stats);
  const data = {
    labels,
    datasets: [
      {
        label: "Current Record",
        data: stats,
        borderColor: "#2a9d8f",
        backgroundColor: "#2a9d8f",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "grey",
          borderColor: "grey",
          zeroLineColor: "red",
          display: false,
        },
        ticks: {
          color: "white",
          //   display: false,
        },
      },
      y: {
        min: boundary * -1,
        max: boundary,
        grid: {
          color: "grey",
          borderColor: "red",
        },
        ticks: {
          color: "white",
        },
      },
    },
  };
  if (!loaded) {
    return <Spinner />;
  } else {
    return <Line options={options} data={data} />;
  }
}
