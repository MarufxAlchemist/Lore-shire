'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { User } from '@supabase/supabase-js';

export default function Page() {
  const { user } = useAuthContext(); // Assumes AuthContext provides { user: User | null }
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth context to load
    if (user === undefined) return;

    if (!user) {
      router.push('/signin'); // redirect to login page
    } else {
      setLoading(false); // auth confirmed
    }
  }, [user, router]);

  if (loading) return null; // or <LoadingSpinner /> if you want

  return <Dashboard />;
}
