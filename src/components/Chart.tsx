import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { chartData } from "../services/api/admin/apiMethods";

const ApexChart: React.FC = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [options, setOptions] = useState<any>({
    chart: {
      height: 350,
      type: "area",
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: "smooth"
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: 'MMM yyyy',
        datetimeUTC: false,
      },
      tickAmount: 4, // This will show approximately 4 ticks on the x-axis
    },
    yaxis: {
      title: {
        text: 'Count'
      },
      min: 0
    },
    title: {
      text: "User Growth, Post and Job Creation",
      align: "left",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#263238"
      }
    },
    legend: {
      position: 'top'
    },
    colors: ['#008FFB', '#00E396', '#FEB019'],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    }
  });

  useEffect(() => {
    chartData()
      .then((response: any) => {
        const { userJoinStats, postCreationStats, jobCreationStats } = response.data;

        // Combine all dates and sort them
        const allDates = [...new Set([
          ...userJoinStats.map((item: any) => item._id),
          ...postCreationStats.map((item: any) => item._id),
          ...jobCreationStats.map((item: any) => item._id)
        ])].sort();

        // Create a map for each stat type
        const userMap = new Map(userJoinStats.map((item: any) => [item._id, item.userCount]));
        const postMap = new Map(postCreationStats.map((item: any) => [item._id, item.postCount]));
        const jobMap = new Map(jobCreationStats.map((item: any) => [item._id, item.jobCount]));

        // Generate series data
        const userData = allDates.map(date => [new Date(date).getTime(), userMap.get(date) || 0]);
        const postData = allDates.map(date => [new Date(date).getTime(), postMap.get(date) || 0]);
        const jobData = allDates.map(date => [new Date(date).getTime(), jobMap.get(date) || 0]);

        setSeries([
          { name: "Users Joined", data: userData },
          { name: "Posts Created", data: postData },
          { name: "Jobs Created", data: jobData }
        ]);

        // Update options to set y-axis max
        const maxValue = Math.max(
          ...userData.map(d => d[1]),
          ...postData.map(d => d[1]),
          ...jobData.map(d => d[1])
        );
        setOptions(prevOptions => ({
          ...prevOptions,
          yaxis: {
            ...prevOptions.yaxis,
            max: Math.ceil(maxValue * 1.1) // Set max to 110% of the highest value
          }
        }));

      })
      .catch((error: any) => {
        console.error("Error fetching chart data:", error);
      });
  }, []);

  return (
    <div id="chart" className="ms-20 mt-5 items-center p-10 border rounded-lg bg-white" style={{width:"1130px"}}>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ApexChart;