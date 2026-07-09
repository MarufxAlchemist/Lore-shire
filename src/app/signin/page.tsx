'use client'

import signIn from "@/firebase/(auth)/signIn";
import { useRouter } from 'next/navigation';
import { useState, type JSX } from "react";
import AlertStatus from "@/components/AlertStatus";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from '@mui/joy/Link';
import Stack from "@mui/joy/Stack";
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from "@mui/joy";
import theme from "@/theme";
import { FirebaseError } from '@firebase/util';
import LightDarkMode from "@/components/sidebar/LightDarkMode";
import lorshireLogo from '../../../public/loreshire-logo.png';
import cozyForestBg from '../../../public/cozy_forest_bg.png';

function Page(): JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });
    const router = useRouter();

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { result, error } = await signIn(email, password);

        if (error instanceof FirebaseError) {
            console.log(error);
            setError(error.message);
            if (error.code === 'auth/invalid-email')
                setAlert({ show: true, success: false, message: 'Please use a valid email address.' });
            if (error.code === 'auth/wrong-password')
                setAlert({ show: true, success: false, message: 'Incorrect password.' });
            if (error.code === 'auth/user-not-found')
                setAlert({ show: true, success: false, message: 'User not found.' });
            if (error.code === 'auth/missing-password')
                setAlert({ show: true, success: false, message: 'Please enter a password.' });
            if (error.code === 'auth/invalid-credential')
                setAlert({ show: true, success: false, message: 'Invalid credential.' });
            return;
        }

        console.log(result);
        setAlert({ show: true, success: true, message: 'Sign in successful!' });
        router.push("/home");
    };

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');

                html, body { height: 100%; overflow: hidden; margin: 0; padding: 0; }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                .si-root {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-size: cover;
                    background-position: center;
                    font-family: 'Crimson Text', serif;
                    transition: background-image 0.4s ease, background-color 0.4s ease;
                }

                html[data-joy-color-scheme="dark"] .si-root,
                html:not([data-joy-color-scheme]) .si-root {
                    background-color: #060a07;
                    background-image: url('/cozy_forest_bg.png');
                }

                html[data-joy-color-scheme="light"] .si-root {
                    background-color: #e8dfc8;
                    background-image: url('/light_forest_bg.png');
                }

                .si-vignette {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse at center, transparent 20%, rgba(4,9,5,0.72) 100%);
                    pointer-events: none;
                }

                .si-toggle {
                    position: absolute;
                    top: 18px;
                    right: 22px;
                    z-index: 10;
                }

                .si-card {
                    position: relative;
                    z-index: 2;
                    width: min(400px, 90vw);
                    padding: 32px 36px 36px;
                    background: rgba(18, 24, 18, 0.45);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border: 1px solid rgba(201,162,39,0.14);
                    border-radius: 16px;
                    box-shadow: 0 8px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04);
                    animation: fadeInUp 0.9s ease forwards;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0;
                }

                .si-logo {
                    max-height: 120px;
                    width: auto;
                    display: block;
                    margin-bottom: 12px;
                    filter: drop-shadow(0 0 12px rgba(201,162,39,0.2));
                }

                .si-ornament {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                    margin-bottom: 14px;
                    opacity: 0.4;
                }
                .si-orn-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(201,162,39,0.6), transparent); }
                .si-orn-gem  { width: 6px; height: 6px; background: rgba(201,162,39,0.7); transform: rotate(45deg); }

                .si-title {
                    font-family: 'Cinzel', serif;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #ebd588;
                    text-shadow: 0 0 16px rgba(201,162,39,0.2);
                    margin-bottom: 20px;
                    letter-spacing: 0.05em;
                }

                .si-input {
                    width: 100%;
                    margin-bottom: 12px;
                    background: rgba(255,255,255,0.06) !important;
                    border: 1px solid rgba(201,162,39,0.15) !important;
                    color: rgba(240,220,180,0.9) !important;
                    border-radius: 8px !important;
                    font-family: 'Crimson Text', serif !important;
                    font-size: 1rem !important;
                    transition: border-color 0.2s ease !important;
                }
                .si-input:focus-within {
                    border-color: rgba(201,162,39,0.45) !important;
                    background: rgba(255,255,255,0.08) !important;
                }

                .si-btn-submit {
                    width: 100%;
                    margin-top: 8px;
                    margin-bottom: 16px;
                    padding: 11px 0 !important;
                    background: linear-gradient(135deg, #b89220, #d4ab2a) !important;
                    border: none !important;
                    color: #08120a !important;
                    font-family: 'Cinzel', serif !important;
                    font-size: 0.82rem !important;
                    font-weight: 700 !important;
                    letter-spacing: 0.12em !important;
                    border-radius: 8px !important;
                    cursor: pointer;
                    transition: filter 0.2s ease, transform 0.2s ease !important;
                }
                .si-btn-submit:hover {
                    filter: brightness(1.08) !important;
                    transform: translateY(-1px) !important;
                }

                .si-links {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                .si-link {
                    font-family: 'Crimson Text', serif;
                    font-size: 0.9rem;
                    color: rgba(201,162,39,0.6) !important;
                    text-decoration: none;
                    transition: color 0.2s ease;
                }
                .si-link:hover {
                    color: rgba(201,162,39,0.95) !important;
                }
            `}</style>

            <div className="si-root">
                <div className="si-vignette" />

                {/* Light/Dark toggle */}
                <div className="si-toggle">
                    <LightDarkMode />
                </div>

                <div className="si-card">
                    <a href="/">
                        <img src={lorshireLogo.src} alt="Loreshire Logo" className="si-logo" />
                    </a>

                    <div className="si-ornament">
                        <div className="si-orn-line" />
                        <div className="si-orn-gem" />
                        <div className="si-orn-line" />
                    </div>

                    <div className="si-title">Login</div>

                    {(error || alert) && (
                        <Box sx={{ mb: 1.5, width: '100%' }}>
                            {alert.show && <AlertStatus success={alert.success} message={alert.message} />}
                        </Box>
                    )}

                    <Box component="form" onSubmit={handleForm} noValidate sx={{ width: '100%' }}>
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
                            className="si-input"
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
                            className="si-input"
                        />

                        <Button type="submit" className="si-btn-submit">
                            Sign In
                        </Button>

                        <Stack direction="row" justifyContent="space-between">
                            <a href="#" className="si-link">Forgot password?</a>
                            <a href="/signup" className="si-link">Sign up</a>
                        </Stack>
                    </Box>
                </div>
            </div>
        </CssVarsProvider>
    );
}

export default Page;
