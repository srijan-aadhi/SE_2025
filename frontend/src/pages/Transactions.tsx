import { useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Define transaction type
interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
}

// Define new transaction form state type
interface NewTransactionForm {
  date: string;
  description: string;
  category: string;
  amount: string;
}

// Example transaction data
const initialTransactions: Transaction[] = [
  { id: 1, date: '2025-04-15', description: 'Grocery Shopping', category: 'Food', amount: -120.50 },
  { id: 2, date: '2025-04-14', description: 'Salary', category: 'Income', amount: 3000.00 },
  { id: 3, date: '2025-04-12', description: 'Electric Bill', category: 'Utilities', amount: -85.20 },
  { id: 4, date: '2025-04-10', description: 'Restaurant', category: 'Food', amount: -45.00 },
  { id: 5, date: '2025-04-08', description: 'Gas', category: 'Transportation', amount: -40.00 },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [open, setOpen] = useState<boolean>(false);
  const [newTransaction, setNewTransaction] = useState<NewTransactionForm>({
    date: '',
    description: '',
    category: '',
    amount: ''
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Fix: Add proper type for the event parameter
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = () => {
    const transaction: Transaction = {
      id: transactions.length + 1,
      date: newTransaction.date,
      description: newTransaction.description,
      category: newTransaction.category,
      amount: parseFloat(newTransaction.amount)
    };
    
    setTransactions([...transactions, transaction]);
    setNewTransaction({ date: '', description: '', category: '', amount: '' });
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transactions
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Transaction
        </Button>
      </Box>

      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: transaction.amount < 0 ? 'error.main' : 'success.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Transaction Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            value={newTransaction.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={newTransaction.description}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newTransaction.category}
              onChange={handleChange}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transportation">Transportation</MenuItem>
              <MenuItem value="Utilities">Utilities</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={newTransaction.amount}
            onChange={handleChange}
            helperText="Use negative values for expenses, positive for income"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Transactions;