import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import ProfileTab from './TabContents/ProfileTab';
import MyRecipesTab from './TabContents/MyRecipesTab';
import FavoritesTab from './TabContents/FavoritesTab';
import CustomTabPanel from '../../components/CustomTabPanel';
import { EProtectedRoutes } from '../../router/types';
import { a11yProps } from '../../components/CustomTabPanel/utils';
import WrapperContainer from '../../components/stylingComponents/WrapperContainer';

const ProfilePage = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path === EProtectedRoutes.ME) navigate(EProtectedRoutes.PROFILE);

    if (path === EProtectedRoutes.PROFILE) {
      setValue(0);
    } else if (path === EProtectedRoutes.MY_RECIPES) {
      setValue(1);
    } else if (path === EProtectedRoutes.FAVORITES) {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [location, navigate]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate(EProtectedRoutes.PROFILE);
        break;
      case 1:
        navigate(EProtectedRoutes.MY_RECIPES);
        break;
      case 2:
        navigate(EProtectedRoutes.FAVORITES);
        break;
      default:
        break;
    }
  };

  return (
    <WrapperContainer id="profile-page">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: 'max-content' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Recipes" {...a11yProps(1)} />
          <Tab label="Favorite recipes" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProfileTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyRecipesTab />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FavoritesTab />
      </CustomTabPanel>
    </WrapperContainer>
  );
};

export default ProfilePage;
