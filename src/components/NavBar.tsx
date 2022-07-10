import {
  AppBar,
  Box,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';
import { MenuOutlined } from '@material-ui/icons';
import { AccountCircle } from '@material-ui/icons';
import { Notifications } from '@material-ui/icons';
import { SideMenu } from './SideMenu';
import { NotificationBar } from './NotificationBar';

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Grid container>
            <Grid item xs={6}>
              <Grid container justifyContent='flex-start'>
                <Grid item>
                  <SideMenu>
                    <MenuOutlined />
                  </SideMenu>
                </Grid>
                <Grid item>
                  <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    style={{ marginTop: '10px' }}
                  >
                    WBS Project
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <NotificationBar>
                      <Badge
                        overlap='rectangular'
                        badgeContent={10}
                        color='error'
                      >
                        <Notifications />
                      </Badge>
                    </NotificationBar>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton>
                      <AccountCircle />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
