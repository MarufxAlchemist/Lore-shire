'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import signIn from '@/Supabase/auth/signIn';

import AlertStatus from '@/components/AlertStatus';
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';
import theme from '@/theme';

import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import Container from '@mui/material/Container';
import Image from 'next/image';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({
    show: false,
    success: false,
    message: '',
  });

  const router = useRouter();

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      setError(error.message);

      setAlert({
        show: true,
        success: false,
        message: error.message || 'Login failed.',
      });

      return;
    }

    setAlert({
      show: true,
      success: true,
      message: 'Sign in successful! Redirecting...',
    });

    // Wait a bit for user to see the message, then redirect
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={350} height={150} />
          </Link>

          <Typography level="h3" marginTop={3}>
            Login
          </Typography>

          {(error || alert.show) && (
            <Box sx={{ mt: 2, width: '80%' }}>
              {alert.show && (
                <AlertStatus success={alert.success} message={alert.message} />
              )}
            </Box>
          )}

          <Box component="form" onSubmit={handleForm} noValidate width="80%">
            <Input
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <Input
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              sx={{ mt: 2 }}
            />

            <div className="grid text-center gap-5 lg:text-center mt-5 mb-5">
              <Button type="submit">Sign In</Button>
            </div>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              spacing={1}
            >
              <Link href="#" level="body-sm">
                Forgot password?
              </Link>
              <Link href="/signup" level="body-sm">
                Sign up
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
