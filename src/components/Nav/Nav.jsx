import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

function Nav() {
  const user = useSelector((store) => store.user);
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpenDrawer(open);
  };

  return (
    <>
      <div>
        <div className="nav">
          <Link to="/homeDashboard">
            <h2 className="nav-title">Any Budget Can</h2>
          </Link>
        </div>
        <div className="linkBar">
          <Tabs value={false} variant="fullWidth">
            {/* If no user is logged in, show these links */}
            {!user.id && (
              <Tab
                label="Login / Register"
                component={Link}
                to="/login"
                sx={{ fontFamily: 'Rockwell', color: '' }}
              />
            )}
            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                <Tab
                  to="/homeDashboard"
                  label="Home"
                  component={Link}
                  sx={{ fontFamily: 'Rockwell', fontSize: 15, marginTop: '2px' }}
                />
              </>
            )}
            <Tab
              to="/about"
              className=""
              label="About"
              component={Link}
              sx={{ fontFamily: 'Rockwell', marginTop: '1.6px', fontSize: 14.80 }}
            />
          </Tabs>

          <MenuOutlinedIcon
            onClick={toggleDrawer(true)}
            sx={{ marginLeft: '15px', marginBottom: '5.5px', color: '#e0e0e0' }}>
            Open Drawer
          </MenuOutlinedIcon>
        </div>
      </div>
      <SwipeableDrawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{ style: { backgroundColor: '#9e9e9e' } }}
        sx={{
          fontFamily: 'Rockwell',
        }}>
        <List sx={{ width: 250 }}>
          {!user.id ? (
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={toggleDrawer(false)}
              sx={{ marginBottom: 2, marginTop: '75px' }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#e0e0e0',
                  fontFamily: 'Rockwell',
                  fontSize: '25px',
                }}>
                Login / Register
              </Typography>
            </ListItem>
          ) : (
            <>
              <ListItem
                button
                component={Link}
                to="/homeDashboard"
                onClick={toggleDrawer(false)}
                sx={{ marginBottom: 2, marginTop: '75px' }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    fontSize: '25px',
                  }}>
                  Home
                </Typography>
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/info"
                onClick={toggleDrawer(false)}
                sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    fontSize: '25px',
                  }}>
                  Info Page
                </Typography>
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/addTransactions"
                onClick={toggleDrawer(false)}
                sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    fontSize: '25px',
                  }}>
                  {' '}
                  Add Transactions
                </Typography>
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/viewTransactions"
                onClick={toggleDrawer(false)}
                sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    fontSize: '25px',
                  }}>
                  {' '}
                  View Transactions
                </Typography>
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/expensesPage"
                onClick={toggleDrawer(false)}
                sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    fontSize: '25px',
                  }}>
                  Expenses
                </Typography>
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/createPlanPage"
                onClick={toggleDrawer(false)}
                sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    fontSize: '25px',
                  }}>
                  Create Plan
                </Typography>
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/budgetOverviewPage"
                onClick={toggleDrawer(false)}
                sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    fontSize: '25px',
                  }}>
                  Budget Overview
                </Typography>
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/planInformationPage"
                onClick={toggleDrawer(false)}
                sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#e0e0e0',
                    fontFamily: 'Rockwell',
                    fontSize: '25px',
                  }}>
                  Plan Information
                </Typography>
              </ListItem>
            </>
          )}
          <ListItem
            button
            component={Link}
            to="/about"
            onClick={toggleDrawer(false)}
            sx={{ marginBottom: 2 }}>
            <Typography
              variant="body1"
              sx={{
                color: '#e0e0e0',
                fontFamily: 'Rockwell',
                fontSize: '25px',
              }}>
              About
            </Typography>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  );
}

export default Nav;
