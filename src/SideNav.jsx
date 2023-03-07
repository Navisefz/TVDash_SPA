import { useState ,useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
    
  }),
  overflowX: 'hidden',
  backgroundColor:"black",
  
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(0)} + 0px)`,
    display: 'none'

  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
   
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
      
    }),
  }),
);

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
 // const [menuData, setMenuData] = useState("Dashboard");
  const navigate = useNavigate();
  
  //const [isMouseActive, setIsMouseActive] = useState(true);
  
  //const handleDrawerOpen = () => {
   // setOpen(true);
  //};
  /*useEffect(() => {
    let timeoutId;

    const handleMouseActivity = () => {
      setIsMouseActive(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMouseActive(false);
      },1000);
    };

    document.addEventListener("mousemove", handleMouseActivity);

    return () => {
      document.removeEventListener("mousemove", handleMouseActivity);
      clearTimeout(timeoutId);
    };
  }, []);*/
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
     <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{transition: "opacity 0.5s",backgroundColor:"black",color:"white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>{setOpen(!open)}}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
         
          <Typography variant="h8" noWrap component="div" sx={{position:"relative", left:"50px"}}>
            TV Dashboard App
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{position:"relative", left:"60px", alignItems:"center"}}>
    
            <LiveTvIcon/>
          </Typography>
         
          <Typography variant="h6" noWrap component="div" sx={{position:"relative", left:"1350px",}}>
        
          {/*<ProfileMenu />*/}
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{  }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
           {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}*/}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
         
            <ListItem disablePadding sx={{ display: 'block' , '&:hover': {
       backgroundColor: "gray",
       transform: "scale(1.12)",
        // add any other hover styles you want
      },}}onClick={()=>{navigate("/tvdash")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: "white",
                  }}
                >
                <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"sx={{ opacity: open ? 1 : 0, color: "white" }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block', '&:hover': {
       backgroundColor: "gray",
       transform: "scale(1.12)"} }}onClick={()=>{navigate("/tvdash/Image")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: "white",
                  }}
                >
               <AddPhotoAlternateIcon/>
                </ListItemIcon>
                <ListItemText primary="Image"sx={{ opacity: open ? 1 : 0 ,  color: "white",}} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block', '&:hover': {
       backgroundColor: "gray",
       transform: "scale(1.12)",} }}onClick={()=>{navigate("/tvdash/Roles")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: "white",
                  }}
                >
                 <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Roles"sx={{ opacity: open ? 1 : 0 ,  color: "white",}} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' , '&:hover': {
       backgroundColor: "gray",
       transform: "scale(1.12)",}}}onClick={()=>{navigate("/tvdash//Others")}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: "white",
                  }}
                >
                 <ContactSupportIcon />
                </ListItemIcon>
                <ListItemText primary="Others"sx={{ opacity: open ? 1 : 0,  color: "white" }} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      
      </Drawer>
     
      </Box>
   
    </>
   
  );
}