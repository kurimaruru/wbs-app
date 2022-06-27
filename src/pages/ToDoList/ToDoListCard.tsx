import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Box, IconButton } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  box: {
    width: '100%',
    height: '50px',
  },
  openSlideCard: {
    animation: '$slideList 1s ease',
    animationFillMode: 'forwards',
  },
  '@keyframes slideList': {
    '0%': {
      transform: 'translateX(0px)',
      opacity: 1,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      transform: 'translateX(100%)',
      opacity: 0,
    },
  },
  closeSlideCard: {
    // animation: '$closeSlideList 1s ease',
    // animationFillMode: 'forwards',
    width: '100%',
  },
  '@keyframes closeSlideList': {
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0px)' },
  },
}));

export const ToDoListCard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openToDoList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    console.log(open);
  };
  const closeToDoList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
    console.log(open);
  };
  return (
    <>
      <Box style={{ marginLeft: '50px', display: 'flex' }}>
        <Typography style={{ marginTop: '12px' }}>ToDo</Typography>
        {open ? (
          <IconButton onClick={closeToDoList} aria-label='openButton'>
            <KeyboardArrowLeft />
          </IconButton>
        ) : (
          <IconButton onClick={openToDoList} aria-label='openButton'>
            <KeyboardArrowRight />
          </IconButton>
        )}
      </Box>
      <Box className={open ? classes.openSlideCard : classes.closeSlideCard}>
        <Card className={classes.root}>
          <CardContent>
            <List style={{ marginLeft: '50px' }}>
              <ListItem>
                <ListItemText>ToDo1</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>ToDo2</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>ToDo3</ListItemText>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
