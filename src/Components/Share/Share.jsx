import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import { IconButton, Tooltip, Box } from "@mui/material";
import share from '../../assets/Share.png'

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: "#ECCD48",
    color: "#415A77",
    padding: "10px",
    textAlign: "center",
  },
}));

function Share() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const websiteUrl = window.location.href;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(websiteUrl);
    handleClose();
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
        <img src={share} alt="Donate" className="donate-img" />
      </Button>

      <StyledMenu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {/* Social Media Icons in a row */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
          <IconButton
            component="a"
            href={`https://wa.me/?text=${encodeURIComponent(websiteUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "green" }}
          >
            <WhatsAppIcon fontSize="large" />
          </IconButton>

          <IconButton
            component="a"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#1877F2" }}
          >
            <FacebookIcon fontSize="large" />
          </IconButton>

          <IconButton
            component="a"
            href={`https://t.me/share/url?url=${encodeURIComponent(websiteUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "#0088cc" }}
          >
            <TelegramIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* Copy Link on a new line */}
        <MenuItem onClick={handleCopy} sx={{ justifyContent: "center" }}>
          <ContentCopyIcon sx={{ marginRight: 1 }} />
          Copy Link
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default Share;
