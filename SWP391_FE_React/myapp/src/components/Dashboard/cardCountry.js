import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function CardCountry({ country }) {
  const { countryName, countryCode, countryImage } = country;

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>  {/* Đặt chiều cao 100% */}
      <CardMedia
        component="img"
        sx={{ height: 200 }}  
        image={countryImage}
        alt={countryName}
      />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>  {/* Để thẻ mở rộng */}
        <CardContent>
          <Typography component="div" variant="h5">
            {countryName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {countryCode}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
