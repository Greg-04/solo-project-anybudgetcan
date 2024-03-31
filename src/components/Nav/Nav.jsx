// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Nav.css';
// import { useSelector } from 'react-redux';

// //MUI imports
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';

// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// function Nav() {
//   const user = useSelector((store) => store.user);

//   //MUI Code
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event &&
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}>
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <>
//       <div className="navLink">
//         {['right'].map((anchor) => (
//           <React.Fragment key={anchor}>
//             <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//             <SwipeableDrawer
//               anchor={anchor}
//               open={state[anchor]}
//               onClose={toggleDrawer(anchor, false)}
//               onOpen={toggleDrawer(anchor, true)}>
//               {list(anchor)}
//             </SwipeableDrawer>
//           </React.Fragment>
//         ))}
//       </div>
//       <div className="nav">
//         <Link to="/homeDashboard">
//           <h2 className="nav-title">Any Budget Can</h2>
//         </Link>
//         <Tabs value={false} variant="fullWidth">
//           {/* If no user is logged in, show these links */}
//           {!user.id && (
//             // If there's no user, show login/registration links
//             <Tab
//               label="Login / Register"
//               className="navLink"
//               component={Link}
//               to="/login"
//               sx={{ fontFamily: 'Rockwell' }}
//             />
//           )}
//           {/* If a user is logged in, show these links */}
//           {user.id && (
//             <>
//               <Tab
//                 className="navLink"
//                 to="/homeDashboard"
//                 label="Home"
//                 component={Link}
//                 sx={{ fontFamily: 'Rockwell' }}
//               />

//               <Tab
//                 className="navLink"
//                 to="/info"
//                 label="Info Page"
//                 component={Link}
//                 sx={{ fontFamily: 'Rockwell' }}
//               />

//               <Tab
//                 className="navLink"
//                 to="/addTransactions"
//                 label="Add Transactions"
//                 component={Link}
//                 sx={{ fontFamily: 'Rockwell' }}
//               />

//               <Tab
//                 className="navLink"
//                 to="/viewTransactions"
//                 label="View Transactions"
//                 component={Link}
//                 sx={{ fontFamily: 'Rockwell' }}
//               />

//               <Tab
//                 className="navLink"
//                 to="/expensesPage"
//                 label="Expenses"
//                 component={Link}
//                 sx={{ fontFamily: 'Rockwell' }}
//               />

//               <Tab
//                 className="navLink"
//                 to="/createPlanPage"
//                 label="Create Plan"
//                 component={Link}
//                 sx={{ fontFamily: 'Rockwell' }}
//               />

//               <Tab
//                 className="navLink"
//                 to="/budgetOverviewPage"
//                 label="Budget Overview"
//                 component={Link}
//                 sx={{ fontFamily: 'Rockwell' }}
//               />

//               <Tab
//                 className="navLink"
//                 to="/planInformationPage"
//                 label="Plan Info"
//                 component={Link}
//                 sx={{ fontFamily: 'Rockwell' }}
//               />
//             </>
//           )}
//           <Tab
//             to="/about"
//             className="navLink"
//             label="About"
//             component={Link}
//             sx={{ fontFamily: 'Rockwell', textDecoration: 'underline' }}
//           />
//           About
//         </Tabs>
//       </div>
//     </>
//   );
// }

// export default Nav;

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
                sx={{ fontFamily: 'Rockwell', color: 'black' }}
              />
            )}
            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                <Tab
                  to="/homeDashboard"
                  label="Home"
                  component={Link}
                  sx={{ fontFamily: 'Rockwell', color: 'black' }}
                />
              </>
            )}
            <Tab
              to="/about"
              className=""
              label="About"
              component={Link}
              sx={{ fontFamily: 'Rockwell', color: 'black' }}
            />
          </Tabs>

          <MenuOutlinedIcon
            onClick={toggleDrawer(true)}
            sx={{ marginLeft: '10px' }}>
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
