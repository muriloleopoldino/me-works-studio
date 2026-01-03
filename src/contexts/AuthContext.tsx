import { createContext, useContext, useEffect, useState } from 'react';
<<<<<<< HEAD
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
=======
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
>>>>>>> 623414328bf953ddbe0ff5cdd4f71acfd2fbe0b2
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
<<<<<<< HEAD
=======
      setSession(session);
>>>>>>> 623414328bf953ddbe0ff5cdd4f71acfd2fbe0b2
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
<<<<<<< HEAD
      setUser(session?.user ?? null);
=======
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
>>>>>>> 623414328bf953ddbe0ff5cdd4f71acfd2fbe0b2
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
<<<<<<< HEAD
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
=======
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
>>>>>>> 623414328bf953ddbe0ff5cdd4f71acfd2fbe0b2
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
<<<<<<< HEAD
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
=======
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
>>>>>>> 623414328bf953ddbe0ff5cdd4f71acfd2fbe0b2
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
<<<<<<< HEAD
};
=======
}
>>>>>>> 623414328bf953ddbe0ff5cdd4f71acfd2fbe0b2
