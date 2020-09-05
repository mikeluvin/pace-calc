import React from 'react';
import { Container, AppBar, Toolbar, Typography,
  CssBaseline, useScrollTrigger, Box, StylesProvider } from "@material-ui/core";
import './App.css';

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      //target: window ? window() : undefined,
    });
    
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
}

export default function Layout(props) {
    const { children } = props;
    return (
      <React.Fragment>
        <ElevationScroll {...props}>
          <AppBar>
            <Toolbar>
              <Typography className="title" variant="h4">NUTC Pace Calculator</Typography>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container>
          <Box my={2}>
            {children}
          </Box>
        </Container>
      </React.Fragment>
    );
  }