// src/services/ChatService.ts
import { supabase } from "@/Supabase/supabaseClient";

// Create or get existing chat between users
export async function getOrCreateChat(participants: string[]) {
  const { data: existing, error } = await supabase
    .from('chats')
    .select('*')
    .contains('participants', participants)
    .maybeSingle();

  if (existing) return existing;

  const { data: newChat, error: createError } = await supabase
    .from('chats')
    .insert({ participants })
    .select()
    .single();

  return newChat;
}

// Send a message
export async function sendMessage(chat_id: string, sender_id: string, content: string) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ chat_id, sender_id, content });

  return { data, error };
}

// Fetch messages
export async function getMessages(chat_id: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chat_id)
    .order('timestamp', { ascending: true });

  return { data, error };
}
