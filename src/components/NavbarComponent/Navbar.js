import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PetsIcon from "@mui/icons-material/Pets";
import { Stack } from "@mui/material";
import { orangeTheme } from "../../themes";
const drawerWidth = 240;

function Navbar(props) {
  const { window, isLoggedIn } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  let navTestItems = [
    {
      name: "Ljubimci",
      link: "/",
    },
    {
      name: isLoggedIn ? "Moj profil" : "Prijavi se",
      link: isLoggedIn ? "/profile" : "/auth/login",
    },
    {
      name: "Kontakt",
      link: "/contact",
    },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <PetsIcon style={{ color: orangeTheme.palette.primary.main }} />
        <Typography variant="h6" sx={{ my: 2 }}>
          udomi
        </Typography>
      </Stack>
      <Divider />
      <List>
        {navTestItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={(e) => {
                navigate(item.link);
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="left"
              gap={1}
            >
              <PetsIcon style={{ color: "#fff" }} />
              <Typography variant="h6" sx={{ my: 2 }}>
                udomi
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navTestItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                onClick={(e) => {
                  navigate(item.link);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;
