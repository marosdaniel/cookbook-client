import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Tab, Tabs } from '@mui/material';

import { a11yProps } from '../../components/CustomTabPanel/utils';
import CustomTabPanel from '../../components/CustomTabPanel';
import { EProtectedRoutes } from '../../router/types';

import UsersTab from './TabContents/UsersTab';
import CategoriesTab from './TabContents/CategoriesTab';
import UnitsTab from './TabContents/UnitsTab';
import LabelsTab from './TabContents/LabelsTab';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';

const AdminPage = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === EProtectedRoutes.ADMIN) navigate(EProtectedRoutes.ADMIN_USERS);

    if (path === EProtectedRoutes.ADMIN_USERS) {
      setValue(0);
    } else if (path === EProtectedRoutes.ADMIN_CATEGORIES) {
      setValue(1);
    } else if (path === EProtectedRoutes.ADMIN_UNITS) {
      setValue(2);
    } else if (path === EProtectedRoutes.ADMIN_LABELS) {
      setValue(3);
    } else {
      setValue(0);
    }
  }, [location, navigate]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate(EProtectedRoutes.ADMIN_USERS);
        break;
      case 1:
        navigate(EProtectedRoutes.ADMIN_CATEGORIES);
        break;
      case 2:
        navigate(EProtectedRoutes.ADMIN_UNITS);
        break;
      case 3:
        navigate(EProtectedRoutes.ADMIN_LABELS);
        break;
      default:
        break;
    }
  };
  return (
    <WrapperContainer id="admin-page">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 'max-content' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Categories" {...a11yProps(1)} />
          <Tab label="Units" {...a11yProps(2)} />
          <Tab label="Labels" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UsersTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CategoriesTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UnitsTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <LabelsTab />
      </CustomTabPanel>
    </WrapperContainer>
  );
};

export default AdminPage;
