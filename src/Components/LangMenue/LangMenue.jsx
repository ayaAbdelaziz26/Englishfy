import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useTranslation } from 'react-i18next';
import translate from '../../assets/Translate.png';

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#415A77',  // Set the Menu background color to yellow
    color: '#ECCD48',  // Optional: Adjust text color for contrast
  },
}));

function LangMenue() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { i18n } = useTranslation();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language) => {
    setAnchorEl(null);
    if (language) i18n.changeLanguage(language); // Change the language
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
        <img src={translate} alt="Translate" className='translate-img'/>
      </Button>
      <StyledMenu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
        <MenuItem onClick={() => handleClose('es')}>Spanish</MenuItem>
        <MenuItem onClick={() => handleClose('fr')}>French</MenuItem>
        <MenuItem onClick={() => handleClose('hi')}>Indian</MenuItem>
        <MenuItem onClick={() => handleClose('de')}>German</MenuItem>
        <MenuItem onClick={() => handleClose('ru')}>Russian</MenuItem>
        <MenuItem onClick={() => handleClose('ar')}>Arabic</MenuItem>
      </StyledMenu>
    </div>
  );
}

export default LangMenue;
