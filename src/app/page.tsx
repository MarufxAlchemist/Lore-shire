'use client';

import Image from 'next/image';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import theme from '@/theme';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import { CssBaseline } from '@mui/joy';

export default function LandingPage() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
          py: 10,
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 4 }}>
          <Image
            src="/logo.svg"
            alt="BookLoop Logo"
            width={400}
            height={200}
            priority
          />
        </Box>

        {/* Title */}
        <Typography level="h3" sx={{ pb: 2 }}>
          Let&apos;s circulate books!
        </Typography>

        {/* Subtitle */}
        <Typography level="title-md">
          A Peer-to-Peer Book Exchange Platform for anyone and everyone.
        </Typography>

        {/* Login & Sign Up Buttons */}
        <Grid container spacing={2} sx={{ mt: 5, width: '100%', maxWidth: 400 }}>
          <Grid xs={6}>
            <Button
              variant="solid"
              color="primary"
              component="a"
              href="/signin"
              sx={{ width: '100%' }}
            >
              Login
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button
              variant="solid"
              color="neutral"
              component="a"
              href="/signup"
              sx={{ width: '100%' }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </CssVarsProvider>
  );
}
