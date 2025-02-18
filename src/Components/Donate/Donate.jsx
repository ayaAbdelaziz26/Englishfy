import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Menu, Fade, TextField, Box, Typography } from '@mui/material';

import donate from '../../assets/Donate.png';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#415A77',
    color: '#ECCD48',
    padding: theme.spacing(2),
    minWidth: 250,
  },
}));

function Donate() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [amount, setAmount] = React.useState('');
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      setAmount(value);
    }
  };

  const handleDonate = (platform) => {
    if (amount) {
      alert(`Donating $${amount} via ${platform}`);
      handleClose();
    }
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={donate} alt="Donate" className="donate-img" />
      </Button>
      
      <StyledMenu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Box sx={{ textAlign: 'center', p: 2,width: '300px'}}>
          <Typography variant="h6" gutterBottom>
            Enter Donation Amount ($)
          </Typography>
          <TextField
            fullWidth
            type="number"
            variant="outlined"
            placeholder="Enter amount"
            value={amount}
            onChange={handleChange}
            inputProps={{ min: 0 }}
            sx={{ mb: 2,
              '& .MuiInputBase-input': {
      color: '#fff', // White text color
    },
             }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 1 }}
            onClick={() => handleDonate('PayPal')}
            disabled={!amount}
          >
            Donate with PayPal
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: '#0e8a16' } }}
            fullWidth
            onClick={() => handleDonate('Patreon')}
            disabled={!amount}
          >
            Donate with Patreon
          </Button>
        </Box>
      </StyledMenu>
    </div>
  );
}

export default Donate;
