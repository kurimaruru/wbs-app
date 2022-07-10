import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'right';

export const NotificationBar = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text} style={{ padding: 0 }}>
            <Card style={{ backgroundColor: '#ffffd6', width: '100%' }}>
              <CardContent>
                <Typography>2022-07-30</Typography>
                <Box style={{ display: 'flex' }}>
                  <AccountCircle />
                  <Typography>栗原があなたをメンション</Typography>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer('right', true)}>
          {children}
        </IconButton>
        <Drawer
          anchor='right'
          open={state['right']}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
