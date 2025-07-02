import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/app/store';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { ListItem, ListItemButton ,Drawer, List, ListItemText } from '@mui/material';

const navLinks = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Employees', path: '/emp-mang' },
];

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const [mobileOpen, setMobileOpen] = React.useState<boolean | undefined>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const CurrentLocation = useLocation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout(''));
    navigate('/');
    handleClose();
  };

  // current path
  // const getLinkStyle = (path: string)=> ({
  // color: CurrentLocation.pathname === path ? '#FFD700' : 'white',
  // textDecoration: 'none',
  // fontWeight: CurrentLocation.pathname === path ? 700 : 400,
  // position: 'relative',
  // transition: 'color 0.3s ease-in-out',

  // // Custom underline
  // ...(CurrentLocation.pathname === path && {
  //   borderBottom: '2px solidrgb(177, 177, 177)',
  // }),
  // });
    const toggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#1A237E', px: { xs: 2, md: 5 } }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>

          {/* Menu Icon for Mobile on the LEFT */}
          {isLoggedIn && (
            <IconButton
              sx={{ display: { xs: 'block', md: 'none' }, mr: 1 }}
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo & Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BadgeOutlinedIcon sx={{ fontSize: 30, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: 20, md: 24 } }}>
              Staff Management
            </Typography>
          </Box>

    {/*  Desktop Nav  , only show if logged in*/}
          {isLoggedIn && (
            <>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: '18px',
                        color: location.pathname === link.path ? '#bdbdbd' : 'white',//  #bdbdbd   cfd8dc
                        fontWeight: location.pathname === link.path ? 700 : 400,
                        position: 'relative',
                        transition: 'color 0.3s ease-in-out',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: -4,
                          left: 0,
                          width: location.pathname === link.path ? '100%' : '0%',
                          height: '2px',
                          backgroundColor: 'white',
                          transition: 'width 0.3s ease-in-out'
                        },
                        '&:hover::after': {
                          width: '100%'
                        }
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Box>

              {/*  Account Icon */}
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>

{/* Mobile Drawer */}
              <Drawer anchor="left" open={mobileOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 220 }} role="presentation" onClick={toggleDrawer}>
                  <List>
                    {navLinks.map(link => (
                      <ListItem key={link.path} disablePadding>
                        <ListItemButton onClick={() => navigate(link.path)}>
                          <ListItemText primary={link.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>

                  {/* Divider (optional for visual separation) */}
                  <Box sx={{ my: 1, mx: 2, borderTop: '1px solid #ccc' }} />

                  {/* Profile & Logout Buttons */}
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => alert('Profile clicked')}>
                        <ListItemText primary="Profile" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
