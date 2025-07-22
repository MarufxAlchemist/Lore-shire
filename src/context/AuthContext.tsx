// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User as SupabaseAuthUser } from '@supabase/supabase-js';
import { supabase } from '@/Supabase/supabaseClient';
import { checkEmailExists, createUser, addNewUser } from '@/services/UserService';

interface AuthContextProps {
  user: SupabaseAuthUser | null;
  session: Session | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseAuthUser | null>(null);

  useEffect(() => {
    const setupSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const email = session.user.email!;
        const exists = await checkEmailExists(email);
        if (!exists) {
          const metadata = session.user.user_metadata;
          const firstName = metadata?.full_name?.split(' ')[0] ?? 'User';
          const lastName = metadata?.full_name?.split(' ')[1] ?? '';
          const username = metadata?.username ?? email.split('@')[0];

          const newUser = createUser(email, firstName, lastName, username);
          await addNewUser(newUser);
        }
      }
    };

    setupSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (event === 'SIGNED_IN' && newSession?.user) {
        const email = newSession.user.email!;
        const exists = await checkEmailExists(email);
        if (!exists) {
          const metadata = newSession.user.user_metadata;
          const firstName = metadata?.full_name?.split(' ')[0] ?? 'User';
          const lastName = metadata?.full_name?.split(' ')[1] ?? '';
          const username = metadata?.username ?? email.split('@')[0];

          const newUser = createUser(email, firstName, lastName, username);
          await addNewUser(newUser);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Renamed this hook to match your component usage
export const useAuthContext = () => useContext(AuthContext);
