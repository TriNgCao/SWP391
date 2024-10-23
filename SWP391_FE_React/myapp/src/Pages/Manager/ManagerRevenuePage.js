import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import ManagerTransaction from "./ManagerTransaction";

// Register necessary elements for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const ManageRevenuePage = () => {
  const salesData = [
    { id: 1, product: "Product A", quantity: 150, price: "$300" },
    { id: 2, product: "Product B", quantity: 200, price: "$400" },
    { id: 3, product: "Product C", quantity: 100, price: "$150" },
    { id: 4, product: "Product D", quantity: 250, price: "$500" },
    { id: 5, product: "Product E", quantity: 300, price: "$600" },
  ];
  // Sample data for the line chart (Revenue)
  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Revenue Generated",
        data: [12000, 19000, 3000, 5000, 2000, 30000, 4000, 35000, 5000, 6000],
        fill: false,
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
      },
    ],
  };

  // Sample data for the doughnut chart (Campaign Data)
  const doughnutChartData = {
    labels: ["Campaign 1", "Campaign 2", "Campaign 3"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
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
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Revenue Management
      </Typography>

      {/* Key Metrics Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              12,361
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Emails Sent
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              43,225
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sales Obtained
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              32,441
            </Typography>
            <Typography variant="body2" color="textSecondary">
              New Clients
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              1,335,134
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Traffic Received
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Revenue Chart and Recent Transactions Section */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {/* Revenue Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              Revenue Generated
            </Typography>
            <Line data={lineChartData} />
          </Paper>
        </Grid>

        {/* Recent Transactions Section */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              Recent Transactions
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TransactionItem id="#34562" date="2023-10-04" amount="$320" />
              <TransactionItem id="#12478" date="2023-09-21" amount="$1,200" />
              <TransactionItem id="#89732" date="2023-09-14" amount="$830" />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Campaign and Sales Quantity Section */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {/* Doughnut Chart for Campaigns */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              Campaign
            </Typography>
            <Doughnut data={doughnutChartData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <Typography variant="h6" color="primary">
              Sales Quantity
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.product}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <ManagerTransaction />
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={{ backgroundColor: "#007BFF" }}
        >
          Download Reports
        </Button>
      </Box>
    </Box>
  );
};

// Reusable component for recent transaction item
const TransactionItem = ({ id, date, amount }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
    <Typography variant="body2" color="textSecondary">
      {id}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {date}
    </Typography>
    <Typography variant="body2" fontWeight="bold" color="#333">
      {amount}
    </Typography>
  </Box>
);

export default ManageRevenuePage;
