// src/components/sidebar/NavigationBar.tsx

'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import PeopleIcon from '@mui/icons-material/People';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { useSession } from '@supabase/auth-helpers-react';
import { getUserProfile } from '@/services/UserService';
import { UserProfile } from '@/types/user';

export default function NavigationBar() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const session = useSession();
  const email = session?.user?.email ?? '';

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) return;

      try {
        const data = await getUserProfile(email);
        setUser(data);
      } catch (error) {
        console.error('Failed to load user profile:', error);
      }
    };

    fetchProfile();
  }, [email]);

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        gap: 2,
        height: '100dvh',
        width: 240,
        px: 2,
        py: 3,
        borderRight: '1px solid',
        borderColor: 'divider',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1100,
        bgcolor: 'background.body',
      }}
    >
      {/* Profile Info */}
      {user && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            variant="outlined"
            size="lg"
            src={user.profile || '/default-avatar.png'}
            alt={user.username || 'Guest'}
          />
          <Box sx={{ ml: 2 }}>
            <Typography level="title-md">{user.username || 'Guest'}</Typography>
            <Typography level="body-sm">{user.email || ''}</Typography>
          </Box>
        </Box>
      )}

      <Divider />

      {/* Sidebar Links */}
      <List size="sm" sx={{ mt: 2 }}>
        <ListItem>
          <ListItemButton component={Link} href="/home">
            <ListItemDecorator><HomeRoundedIcon /></ListItemDecorator>
            Home
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} href="/books/list">
            <ListItemDecorator><MenuBookIcon /></ListItemDecorator>
            List Books
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} href="/books/my">
            <ListItemDecorator><MenuBookIcon /></ListItemDecorator>
            My Listed Books
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} href="/books/favorites">
            <ListItemDecorator><FavoriteIcon /></ListItemDecorator>
            Favourite Books
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} href="/books/exchanged">
            <ListItemDecorator><SwapHorizIcon /></ListItemDecorator>
            Exchanged Books
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} href="/socials">
            <ListItemDecorator><PeopleIcon /></ListItemDecorator>
            Socials
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} href="/messages">
            <ListItemDecorator><EmailRoundedIcon /></ListItemDecorator>
            Messages
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} href="/settings">
            <ListItemDecorator><SettingsRoundedIcon /></ListItemDecorator>
            Settings
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton component={Link} href="/logout">
            <ListItemDecorator><LogoutRoundedIcon /></ListItemDecorator>
            Logout
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
