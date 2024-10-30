import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ManageRevenuePage = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [dailyProfit, setDailyProfit] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState(10);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  const formatVietnamDate = (date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date));
  };

  const fetchTotalRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/revenue/total-revenue"
      );
      setTotalRevenue(response.data);
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  const fetchTotalProfit = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/revenue/total-profit"
      );
      setTotalProfit(response.data);
    } catch (error) {
      console.error("Error fetching total profit:", error);
    }
  };

  const fetchDailyRevenue = async (date) => {
    if (date) {
      const dateOnly = date.toLocaleDateString("en-CA");
      try {
        const response = await axios.get(
          `http://localhost:8080/revenue/daily-revenue?date=${dateOnly}`
        );
        setDailyRevenue([{ date: dateOnly, total: response.data }]);
      } catch (error) {
        console.error("Error fetching daily revenue:", error);
      }
    }
  };

  const fetchDailyProfit = async (date) => {
    if (date) {
      const dateOnly = date.toLocaleDateString("en-CA");
      try {
        const response = await axios.get(
          `http://localhost:8080/revenue/daily-profit?date=${dateOnly}`
        );
        setDailyProfit([{ date: dateOnly, profit: response.data }]);
      } catch (error) {
        console.error("Error fetching daily profit:", error);
      }
    }
  };

  const fetchLastXDaysData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/revenue/last-x-days/${days}`
      );
      const data = response.data || {};

      const labels = Object.keys(data).reverse();
      const revenueData = labels.map((date) => data[date]?.revenue || 0);
      const profitData = labels.map((date) => data[date]?.profit || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: "Revenue",
            data: revenueData,
            borderColor: "#007BFF",
            backgroundColor: "rgba(0, 123, 255, 0.1)",
            fill: true,
          },
          {
            label: "Profit",
            data: profitData,
            borderColor: "#28a745",
            backgroundColor: "rgba(40, 167, 69, 0.1)",
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTotalRevenue();
    fetchTotalProfit();
    fetchLastXDaysData();
    if (selectedDate) {
      fetchDailyRevenue(selectedDate);
      fetchDailyProfit(selectedDate);
    }
  }, [selectedDate, days]);

  const lineChartData = {
    labels: dailyRevenue.map((item) => formatVietnamDate(item.date)),
    datasets: [
      {
        label: "Revenue",
        data: dailyRevenue.map((item) => item.total),
        fill: false,
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
      },
      {
        label: "Profit",
        data: dailyProfit.map((item) => item.profit),
        fill: false,
        backgroundColor: "#28a745",
        borderColor: "#28a745",
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 2, color: "#4CAF50" }}
      >
        Revenue Management
      </Typography>

      {/* Date Filter for Daily Revenue & Profit */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Daily Revenue & Profit"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </LocalizationProvider>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Number of Days"
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Key Metrics Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              {totalRevenue.toLocaleString()} USD
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Revenue
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              {totalProfit.toLocaleString()} USD
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total Profit
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Line Chart for Revenue and Profit */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              Revenue & Profit Over the Last {days} Days
            </Typography>
            <Line data={chartData} />
          </Paper>
        </Grid>
      </Grid>

      {/* Daily Revenue and Profit Table */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              Daily Revenue & Profit
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Daily Revenue</TableCell>
                    <TableCell align="right">Daily Profit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dailyRevenue.map((item, index) => (
                    <TableRow key={item.date}>
                      <TableCell>{formatVietnamDate(item.date)}</TableCell>
                      <TableCell align="right">
                        {item.total.toLocaleString()} USD
                      </TableCell>
                      <TableCell align="right">
                        {(dailyProfit[index]?.profit || 0).toLocaleString()} USD
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManageRevenuePage;
