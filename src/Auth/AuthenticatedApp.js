import React from 'react';
//Routing
import { Routes, Route } from "react-router-dom";
import { rootRoutes }  from '../app-modules';
import { integrationRootRoutes} from '../app-modules';
import Copyright from '../components/Copyright';
//MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
// import Appbar from '../Components/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import SideNav from '../SideNav';
// import Image from '../Components/Image';
// import Dashboard from '../Components/Dashboard';
// import ImageSlides from '../ImageSlides';
//Pages

// import AuthVerify from './AuthVerify';
import { useSelector } from "react-redux";


const AuthenticatedApp = (props) => {
    const userDetail = useSelector((state) => state.mainSlice.user);

    const CustomFontThemeDark = createTheme({
        palette: {
            mode: "dark",
        },
        pagination: {
            justifyContent:"center",
            display:'flex'
        },
        typography: {
            fontSize: 12
          },
          components: {
            MuiContainer: {
              styleOverrides: {
                root: {
                  fontSize: 12
                }
              }
            }
          }
    });

    const CustomFontThemeLight = createTheme({
        palette: {
            mode: "dark",
        },
        pagination: {
            justifyContent:"center",
            display:'flex'
        },
        typography: {
            fontSize: 12
          },
          components: {
            MuiContainer: {
              styleOverrides: {
                root: {
                  fontSize: 12
                }
              }
            }
          }
    });
    
    return(
        <React.Fragment>
            <ThemeProvider theme={userDetail !== undefined && userDetail.length > 0 && userDetail[0].theme === 1? CustomFontThemeDark : CustomFontThemeLight}>
                <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <SideNav/>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? theme.palette.grey[900]
                            : theme.palette.grey[100],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                       
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
                        <Grid container spacing={1}>
                            {/* <Routes>
                            {rootRoutes.map((route, idx) => (
                                <Route 
                                    key= {idx}
                                    path={route.path} 
                                    element={route.component}
                                />
                            ))}
                            </Routes> */}
                            <Routes>
                          
                            {integrationRootRoutes.map((route, idx) => (
                                <Route 
                                    key= {idx}
                                    path={route.path} 
                                    element={route.component}
                                
                                />
                                
                               
                            ))}
                            </Routes>
                        </Grid>
                    </Container>
                    
                </Box>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
                    <Copyright sx={{ m: 1}} />
                </Paper>
                </Box>
            </ThemeProvider>

        </React.Fragment>
    );
}

export default AuthenticatedApp;