import { useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Example categories data
const initialCategories = [
  { id: 1, name: 'Food', type: 'expense', color: '#FF5722' },
  { id: 2, name: 'Transportation', type: 'expense', color: '#2196F3' },
  { id: 3, name: 'Utilities', type: 'expense', color: '#4CAF50' },
  { id: 4, name: 'Entertainment', type: 'expense', color: '#9C27B0' },
  { id: 5, name: 'Income', type: 'income', color: '#00BCD4' },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: '',
    type: 'expense',
    color: '#000000'
  });

  const handleOpen = (category = null) => {
    if (category) {
      setCurrentCategory(category);
      setEditMode(true);
    } else {
      setCurrentCategory({ id: null, name: '', type: 'expense', color: '#000000' });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const handleSubmit = () => {
    if (editMode) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id ? currentCategory : cat
      ));
    } else {
      // Add new category
      const newCategory = {
        ...currentCategory,
        id: categories.length + 1
      };
      setCategories([...categories, newCategory]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Categories
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Category
        </Button>
      </Box>

      <Paper elevation={3}>
        <List>
          {categories.map((category) => (
            <ListItem key={category.id} divider>
              <Box 
                sx={{ 
                  width: 16, 
                  height: 16, 
                  borderRadius: '50%', 
                  backgroundColor: category.color,
                  mr: 2
                }} 
              />
              <ListItemText 
                primary={category.name}
                secondary={
                  <Chip 
                    label={category.type.charAt(0).toUpperCase() + category.type.slice(1)} 
                    size="small"
                    color={category.type === 'income' ? 'success' : 'default'}
                  />
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(category.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Add/Edit Category Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Category Name"
            type="text"
            fullWidth
            value={currentCategory.name}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={currentCategory.type}
              onChange={handleChange}
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>Color</Typography>
            <TextField
              name="color"
              type="color"
              value={currentCategory.color}
              onChange={handleChange}
              sx={{ width: '100%' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Categories;