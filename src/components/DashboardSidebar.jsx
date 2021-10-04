import PropTypes from "prop-types";
import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
// material
import { styled } from "@material-ui/core/styles";
import { Box, Link, Drawer, Typography } from "@material-ui/core";
// components
// import Logo from '../../components/Logo';
import Scrollbar from "./Scrollbar";
import NavSection from "./NavSection";
// import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from "./SidebarConfig";
// import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 580;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
      style={{ backgroundColor: "#9AF591" }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: "inline-flex" }}>
        <img src={process.env.PUBLIC_URL + "/planeta1.png"} alt="Logo" style={{ width: 100,
            height: 100, marginLeft: 40}}/>
        </Box>
      </Box>

      <Box component="span" sx={{ p: 2, border: '1px grey' }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
          Tu Hogar Sustentable
            <Box sx={{ ml: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "text.primary" }}
              ></Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              ></Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {/* <MHidden width="lgUp"> */}
      <Drawer
        open={isOpenSidebar}
        onClose={onCloseSidebar}
        PaperProps={{
          sx: { width: DRAWER_WIDTH },
        }}
      >
        {renderContent}
      </Drawer>
      {/* </MHidden> */}

      {/* <MHidden width="lgDown"> */}
      <Drawer
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH,
            bgcolor: "background.default",
          },
        }}
      >
        {renderContent}
      </Drawer>
      {/* </MHidden> */}
    </RootStyle>
  );
}
