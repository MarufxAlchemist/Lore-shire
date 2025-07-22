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
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { useSession } from '@supabase/auth-helpers-react';
import { getUserProfile } from '@/services/UserService';
import { UserProfile } from '@/types/user';

export default function NavigationBar(){
  const [user, setUser] = useState<UserProfile | null>(null);
  const session = useSession();

  const email = session?.user?.email ?? '';

  useEffect(() => {
    const fetchProfile = async () => {
      if (!email) {
        console.warn('No email found in session. Skipping profile fetch.');
        return;
      }

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
    <Box sx={{ p: 2, width: 280, minHeight: '100vh', bgcolor: 'background.body' }}>
      {/* Top Profile Section */}
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

      {/* Navigation List */}
      <Divider />
      <List size="sm" sx={{ mt: 2 }}>
        <ListItem>
          <ListItemButton component={Link} href="/home">
            <ListItemDecorator>
              <HomeRoundedIcon />
            </ListItemDecorator>
            Home
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} href="/messages">
            <ListItemDecorator>
              <EmailRoundedIcon />
            </ListItemDecorator>
            Messages
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} href="/settings">
            <ListItemDecorator>
              <SettingsRoundedIcon />
            </ListItemDecorator>
            Settings
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} href="/logout">
            <ListItemDecorator>
              <LogoutRoundedIcon />
            </ListItemDecorator>
            Logout
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
