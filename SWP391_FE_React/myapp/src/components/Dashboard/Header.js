// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import { Link } from "react-router-dom";
// import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

// const pages = [
//   { label: "Home", route: "/" },
//   { label: "Infor", route: "/infor" },
//   { label: "Contact", route: "/contact" },
// ];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// function Header() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const darkTheme = createTheme({
//     palette: {
//       primary: {
//         main: "#4CAF50",
//       },
//     },
//   });
//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <AppBar position="static">
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             <AdbIcon
//               sx={{
//                 display: { xs: "none", md: "flex" },
//                 mr: 1,
//                 color: "white",
//               }}
//             />
//             <Typography
//               variant="h6"
//               noWrap
//               component="div"
//               sx={{
//                 mr: 2,
//                 display: { xs: "none", md: "flex" },
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 letterSpacing: ".3rem",
//                 color: "white",
//                 textDecoration: "none",
//               }}
//             >
//               LEOPARD
//             </Typography>

//             <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//               <IconButton
//                 size="large"
//                 aria-label="menu"
//                 aria-controls="menu-appbar"
//                 aria-haspopup="true"
//                 onClick={handleOpenNavMenu}
//                 color="inherit"
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Menu
//                 id="menu-appbar"
//                 anchorEl={anchorElNav}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "left",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "left",
//                 }}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//                 sx={{ display: { xs: "block", md: "none" } }}
//               >
//                 {pages.map((page) => (
//                   <MenuItem key={page.route} onClick={handleCloseNavMenu}>
//                     <Link
//                       to={page.route}
//                       style={{ textDecoration: "none", color: "inherit" }}
//                     >
//                       {page.label}
//                     </Link>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>

//             <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//               {pages.map((page) => (
//                 <Button
//                   key={page.route}
//                   onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: "white", display: "block" }}
//                 >
//                   <Link
//                     to={page.route}
//                     style={{ textDecoration: "none", color: "inherit" }}
//                   >
//                     {page.label}
//                   </Link>
//                 </Button>
//               ))}
//             </Box>

//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: "45px" }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 {settings.map((setting) => (
//                   <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                     <Typography textAlign="center">{setting}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//     </ThemeProvider>
//   );
// }

// export default Header;
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Badge,
  Button,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationMenu from "./NotificationMenu"; // Import NotificationMenu đã tách riêng

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50",
    },
  },
});

const Header = () => {
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [unreadCount, setUnreadCount] = React.useState(0); // State cho số thông báo chưa đọc
  const navigate = useNavigate();

  // Mở menu thông báo
  const handleOpenNotificationMenu = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  // Đóng menu thông báo
  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="logo"
                width="50"
                height="50"
                style={{ filter: "invert(1)" }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  ml: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "white",
                }}
              >
                LEOPARD
              </Typography>
            </Box>

            {/* Notification & Log Out */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Open notifications">
                <IconButton
                  onClick={handleOpenNotificationMenu}
                  sx={{ color: "white", mr: 1 }}
                >
                  <Badge
                    color="error"
                    variant="dot"
                    invisible={unreadCount === 0} // Ẩn dấu chấm đỏ nếu không có thông báo chưa đọc
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Menu thông báo */}
              <NotificationMenu
                anchorEl={anchorElNotification}
                handleClose={handleCloseNotificationMenu}
                setUnreadCount={setUnreadCount} // Cập nhật số thông báo chưa đọc
              />

              <Tooltip title="Log out">
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  startIcon={<ExitToAppIcon style={{ color: "#4CAF50" }} />}
                  sx={{
                    bgcolor: "white",
                    color: "#4CAF50",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1px solid #4CAF50",
                    "&:hover": {
                      bgcolor: "#f0f0f0",
                    },
                    "&:active": {
                      bgcolor: "#e0e0e0",
                    },
                  }}
                >
                  Log Out
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
