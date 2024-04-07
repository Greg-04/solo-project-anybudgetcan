import './ViewTransactionsPage.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ViewTransactionsPage() {
  //dispatch hook
  const dispatch = useDispatch();
  const transactions = useSelector((store) => store.transaction);
  // console.log('transactions data', transactions);

  // State to manage editing for each transaction
  const [editingId, setEditingId] = useState(null); // ID of the transaction being edited
  const [newAmount, setNewAmount] = useState(''); // New amount for the transaction being edited

  //Setting the state of the current inputs
  const handleEdit = (id, currentAmount) => {
    setEditingId(id);
    setNewAmount(currentAmount);
  };

  //Adding a save handle to dispatch the update saga
  const handleSave = (id) => {
    dispatch({
      type: 'UPDATE_TRANSACTION_AMOUNT',
      payload: { id, amount: newAmount },
    });
    setEditingId(null); // Reset editing state
    setNewAmount('');
  };

  //adding a cancel handle to revert back the state
  const handleCancel = () => {
    setEditingId(null); // Reset editing state
    setNewAmount('');
  };

  //adding handle to set new changed amount
  const handleChange = (event) => {
    setNewAmount(event.target.value);
  };

  // Fetch transactions on component mount
  useEffect(() => {
    dispatch({ type: 'FETCH_TRANSACTIONS' });
  }, [dispatch]);

  //Function to reformat the timestamp into date format
  const formatDate = (newDate) => {
    // //This splits string into substrings/array
    // const splitDate = newDate.split('T');
    // // console.log('new date object', splitDate);
    // return splitDate[0];

    //new date formatting
    const date = new Date(newDate);
    // console.log(date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
    // console.log(formattedDate);
    const splitDate = formattedDate.split(',');
    // console.log(splitDate);
    // const weekday = splitDate[0];
    const monthDay = splitDate[1];
    const splitMonthDay = monthDay.split(' ');
    // console.log('splitMonthDay', splitMonthDay);
    const newDateFormat = splitMonthDay[1];
    // console.log('newDateFormat', newDateFormat);
    const replaceNewDateFormat = newDateFormat.replace(/\//g, '-');
    // console.log('replaceNewDateFormat', replaceNewDateFormat);

    return `${replaceNewDateFormat}`;
  };

  // Function to format date for table header
  const formatTableHeaderDate = (newDate) => {
    const date = new Date(newDate);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  // Function to handle delete
  const handleDelete = (id) => {
    // Dispatch action to delete transaction
    // console.log('Transaction ID:', id);
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  // Function to group transactions by month
  const groupTransactionsByMonth = () => {
    const groupedTransactions = {};
    //forEach to call function and loop through array
    transactions &&
      transactions.forEach((transaction) => {
        //Getting the month from each transaction
        const month = new Date(transaction.trans_date).getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
        //if the month exists and creating an array if not
        if (!groupedTransactions[month]) {
          groupedTransactions[month] = [];
        }
        // console.log(groupedTransactions[month]);
        //pushing the transaction into the corresponding array
        groupedTransactions[month].push(transaction);
      });
    return groupedTransactions;
  };

  return (
    <>
      <div>
        <LogOutButton className="btn" />
      </div>
      <div className="vtHeader">
        <h1>View Transactions</h1>
      </div>

      {/* object.entries returns an array of arrays, giving it the properties of month and transactions */}
      {Object.entries(groupTransactionsByMonth()).map(
        ([month, transactions]) => (
          <TableContainer
            component={Paper}
            key={month}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '20px',
              maxWidth: '60%',
              marginTop: '20px',
              marginLeft: 'auto',
              marginRight: 'auto',
              border: '1px solid',
            }}>
            <h2 className="monthHeader">
              {formatTableHeaderDate(transactions[0].trans_date)}
            </h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontFamily: 'Rockwell', fontSize: 'larger' }}>
                    Date
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: 'Rockwell', fontSize: 'larger' }}>
                    Description
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: 'Rockwell', fontSize: 'larger' }}>
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: 'Rockwell', fontSize: 'larger' }}>
                    Category
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: 'Rockwell', fontSize: 'larger' }}>
                    Delete?
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: 'Rockwell', fontSize: 'larger' }}>
                    Edit Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {JSON.stringify(transactions)} */}
                {/* Adding a conditional check to prevent mapping over undefined or null */}
                {transactions &&
                  transactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontFamily: 'Rockwell', color: '#e0e0e0' }}>
                        {formatDate(transaction.trans_date)}
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: 'Rockwell', color: '#e0e0e0' }}>
                        {transaction.name}
                      </TableCell>
                      {/* <td>${transaction.amount}</td> */}
                      <TableCell
                        sx={{ fontFamily: 'Rockwell', color: '#e0e0e0' }}>
                        {editingId === transaction.id ? (
                          <input
                            type="number"
                            value={newAmount}
                            onChange={handleChange}
                          />
                        ) : (
                          `$${transaction.amount}`
                        )}
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: 'Rockwell', color: '#e0e0e0' }}>
                        {transaction.category_name}
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: 'Rockwell', color: '#e0e0e0' }}>
                        <Button
                          sx={{
                            fontFamily: 'Rockwell',
                            backgroundColor: '#d50000',
                            color: '#e0e0e0',
                          }}
                          variant="contained"
                          onClick={() => handleDelete(transaction.id)}>
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: 'Rockwell', color: '#e0e0e0' }}>
                        {editingId === transaction.id ? (
                          <>
                            <Button
                              sx={{
                                fontFamily: 'Rockwell',
                                backgroundColor: '#9e9e9e',
                                color: '#e0e0e0',
                              }}
                              variant="contained"
                              onClick={() => handleSave(transaction.id)}>
                              Save
                            </Button>
                            <Button
                              sx={{
                                fontFamily: 'Rockwell',
                                backgroundColor: '#9e9e9e',
                                color: '#e0e0e0',
                                marginLeft: '5px',
                              }}
                              variant="contained"
                              onClick={handleCancel}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            sx={{
                              fontFamily: 'Rockwell',
                              backgroundColor: '#9e9e9e',
                              color: '#e0e0e0',
                            }}
                            variant="contained"
                            onClick={() =>
                              handleEdit(transaction.id, transaction.amount)
                            }>
                            Edit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                {/* If transactions is null or undefined, display a loading message */}
                {!transactions && (
                  <TableRow>
                    <TableCell>Loading...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  );
}

export default ViewTransactionsPage;
