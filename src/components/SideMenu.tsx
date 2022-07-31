import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'left';

export const SideMenu = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
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

  const linkList = [
    {
      icon: <ScheduleIcon />,
      link: 'wbs',
      text: 'WBS',
    },
    {
      icon: <DateRangeIcon />,
      link: 'calendar',
      text: 'Schedule',
    },
  ];

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {linkList.map((list) => {
          return (
            <ListItem button key={list.text}>
              <ListItemIcon>{list.icon}</ListItemIcon>
              <ListItemText>
                <Link
                  to={`/${list.link}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {list.text}
                </Link>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer('left', true)}>{children}</IconButton>
        <Drawer
          anchor='left'
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
