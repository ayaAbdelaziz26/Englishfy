import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: '#415A77',
    color: '#fff',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#ECCD48',
  fontFamily:'Josefin Sans',
});

function Discover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
      sx={{
        backgroundColor:'#ECCD48',
        color:'#0d1b2a',
        fontFamily:'Josefin Sans',
        fontWeight:'Bold',
        textTransform:'uppercase',
        fontSize:'13px',
        padding:'4px 6px'
      }}
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Discover
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <StyledLink to="/englisharticle">Why English?</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <StyledLink to="/basics">English Basics</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <StyledLink to="/listen">Listenning routine</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <StyledLink to="/benefits">English Benefits</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <StyledLink to="/features">Site Features</StyledLink>
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <StyledLink to="/tips">Tips</StyledLink>
        </MenuItem>

        <MenuItem onClick={handleClose} disableRipple>
          <StyledLink to="/terms">Terms</StyledLink>
        </MenuItem>

        <MenuItem onClick={handleClose} disableRipple>
          <StyledLink to="/privacy">Privacy policy</StyledLink>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default Discover;

