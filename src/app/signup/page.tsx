'use client'
import * as React from 'react';
import { useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import signUp from "@/firebase/(auth)/signup";
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import AlertStatus from '@/components/AlertStatus';
import Input from "@mui/joy/Input";
import { CssVarsProvider } from '@mui/joy/styles';
import theme from "@/theme";
import { CssBaseline, FormHelperText } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import { checkEmailExists, checkUsernameExists } from "@/services/UserService";
import { FirebaseError } from '@firebase/util';
import LightDarkMode from "@/components/sidebar/LightDarkMode";
import lorshireLogo from '../../../public/loreshire-logo.png';
import cozyForestBg from '../../../public/cozy_forest_bg.png';

const debounce = (func: Function, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func(...args), delay);
    };
};

function Page() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const router = useRouter();

    const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { result, error } = await signUp(email, password, firstName, lastName, username);

        if (username.includes('.')) {
            setUsernameError('Username cannot contain a dot (.)');
            return;
        }

        if (error instanceof FirebaseError) {
            console.log(error);
            setError(error.message);
            if (error.code === 'auth/weak-password')
                setAlert({ show: true, success: false, message: 'Password should have at least 6 characters.' });
            if (error.code === 'auth/invalid-email')
                setAlert({ show: true, success: false, message: 'Please use a valid email address.' });
            if (error.code === 'auth/email-already-in-use')
                setAlert({ show: true, success: false, message: 'Account with email already exists.' });
            if (error.code === 'auth/username-already-exists')
                setAlert({ show: true, success: false, message: 'Username is already taken.' });
            return;
        }

        console.log(result);
        setAlert({ show: true, success: true, message: 'Sign up successful!' });
        router.push("/home");
    };

    const checkUsername = useCallback(debounce(async (username: string) => {
        if (!username) return;
        try {
            const check = await checkUsernameExists(username);
            check ? setUsernameError("Username is already taken.") : setUsernameError('');
        } catch (error) {
            console.error("Error checking username:", error);
        }
    }, 500), []);

    useEffect(() => { checkUsername(username); }, [username, checkUsername]);

    const checkEmail = useCallback(debounce(async (email: string) => {
        if (!email) return;
        try {
            const check = await checkEmailExists(email);
            check ? setEmailError("Account with email already made.") : setEmailError('');
        } catch (error) {
            console.error("Error checking email:", error);
        }
    }, 500), []);

    useEffect(() => { checkEmail(email); }, [email, checkEmail]);

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

                .su-root {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-size: cover;
                    background-position: center;
                    overflow-y: auto;
                    padding: 20px 0;
                    transition: background-image 0.4s ease, background-color 0.4s ease;
                }

                html[data-joy-color-scheme="dark"] .su-root,
                html:not([data-joy-color-scheme]) .su-root {
                    background-color: #060a07;
                    background-image: url('/cozy_forest_bg.png');
                }

                html[data-joy-color-scheme="light"] .su-root {
                    background-color: #e8dfc8;
                    background-image: url('/light_forest_bg.png');
                }

                .su-vignette {
                    position: fixed;
                    inset: 0;
                    background: radial-gradient(ellipse at center, transparent 20%, rgba(4,9,5,0.72) 100%);
                    pointer-events: none;
                }

                .su-toggle {
                    position: fixed;
                    top: 18px;
                    right: 22px;
                    z-index: 10;
                }

                .su-card {
                    position: relative;
                    z-index: 2;
                    width: min(420px, 92vw);
                    padding: 28px 32px 32px;
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
                }

                .su-logo {
                    max-height: 100px;
                    width: auto;
                    display: block;
                    margin-bottom: 10px;
                    filter: drop-shadow(0 0 10px rgba(201,162,39,0.18));
                }

                .su-ornament {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    width: 100%;
                    margin-bottom: 12px;
                    opacity: 0.4;
                }
                .su-orn-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(201,162,39,0.6), transparent); }
                .su-orn-gem  { width: 6px; height: 6px; background: rgba(201,162,39,0.7); transform: rotate(45deg); }

                .su-title {
                    font-family: 'Cinzel', serif;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: #ebd588;
                    text-shadow: 0 0 14px rgba(201,162,39,0.18);
                    margin-bottom: 4px;
                    letter-spacing: 0.05em;
                }

                .su-note {
                    font-family: 'Crimson Text', serif;
                    font-size: 0.82rem;
                    font-style: italic;
                    color: rgba(220,200,160,0.5);
                    margin-bottom: 16px;
                    text-align: center;
                }

                .su-input-wrap {
                    width: 100%;
                    margin-bottom: 10px;
                }

                .su-row {
                    display: flex;
                    gap: 10px;
                    width: 100%;
                    margin-bottom: 10px;
                }

                .su-btn-submit {
                    width: 100%;
                    margin-top: 6px;
                    margin-bottom: 14px;
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
                .su-btn-submit:hover:not(:disabled) {
                    filter: brightness(1.08) !important;
                    transform: translateY(-1px) !important;
                }

                .su-link {
                    font-family: 'Crimson Text', serif;
                    font-size: 0.9rem;
                    color: rgba(201,162,39,0.6) !important;
                    text-decoration: none;
                    transition: color 0.2s ease;
                    text-align: right;
                    display: block;
                    width: 100%;
                }
                .su-link:hover { color: rgba(201,162,39,0.9) !important; }
            `}</style>

            <div className="su-root">
                <div className="su-vignette" />

                <div className="su-toggle">
                    <LightDarkMode />
                </div>

                <div className="su-card">
                    <Link href="/">
                        <img src={lorshireLogo.src} alt="Loreshire Logo" className="su-logo" />
                    </Link>

                    <div className="su-ornament">
                        <div className="su-orn-line" />
                        <div className="su-orn-gem" />
                        <div className="su-orn-line" />
                    </div>

                    <div className="su-title">Create Account</div>
                    <div className="su-note">Username & email cannot be changed after sign up.</div>

                    {(error || alert) && (
                        <Box sx={{ mb: 1.5, width: '100%' }}>
                            {alert.show && <AlertStatus success={alert.success} message={alert.message} />}
                        </Box>
                    )}

                    <Box component="form" onSubmit={handleForm} sx={{ width: '100%' }}>
                        <div className="su-row">
                            <Input
                                placeholder="First Name"
                                autoComplete="given-name"
                                name="firstName"
                                required
                                id="firstName"
                                autoFocus
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                sx={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.15)', color: 'rgba(240,220,180,0.9)', '&:focus-within': { borderColor: 'rgba(201,162,39,0.45)' } }}
                            />
                            <Input
                                placeholder="Last Name"
                                required
                                id="lastName"
                                name="lastName"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                sx={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.15)', color: 'rgba(240,220,180,0.9)', '&:focus-within': { borderColor: 'rgba(201,162,39,0.45)' } }}
                            />
                        </div>

                        <div className="su-input-wrap">
                            <FormControl>
                                <Input
                                    placeholder="Username"
                                    required
                                    fullWidth
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    error={usernameError !== ""}
                                    sx={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.15)', color: 'rgba(240,220,180,0.9)', '&:focus-within': { borderColor: 'rgba(201,162,39,0.45)' } }}
                                />
                                <FormHelperText sx={{ color: 'rgba(220,100,100,0.8)', fontSize: '0.78rem' }}>
                                    {usernameError}
                                </FormHelperText>
                            </FormControl>
                        </div>

                        <div className="su-input-wrap">
                            <FormControl>
                                <Input
                                    placeholder="Email"
                                    required
                                    fullWidth
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={emailError !== ''}
                                    sx={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.15)', color: 'rgba(240,220,180,0.9)', '&:focus-within': { borderColor: 'rgba(201,162,39,0.45)' } }}
                                />
                                <FormHelperText sx={{ color: 'rgba(220,100,100,0.8)', fontSize: '0.78rem' }}>
                                    {emailError}
                                </FormHelperText>
                            </FormControl>
                        </div>

                        <div className="su-input-wrap">
                            <Input
                                placeholder="Password"
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,162,39,0.15)', color: 'rgba(240,220,180,0.9)', '&:focus-within': { borderColor: 'rgba(201,162,39,0.45)' } }}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={usernameError !== '' || emailError !== ''}
                            className="su-btn-submit"
                        >
                            Sign Up
                        </Button>

                        <Link href="/signin" className="su-link">Already have an account?</Link>
                    </Box>
                </div>
            </div>
        </CssVarsProvider>
    );
}

export default Page;
