import {
  AppBar,
  Box,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MenuOutlined } from '@material-ui/icons';
import { AccountCircle } from '@material-ui/icons';
import { Notifications } from '@material-ui/icons';
export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton>
            <MenuOutlined />
          </IconButton>
          <Typography variant='h6' color='inherit' component='div'>
            WBS Project
          </Typography>
          <Box style={{ width: '80%' }}></Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton>
              <Badge overlap='rectangular' badgeContent={10} color='error'>
                <Notifications />
              </Badge>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
