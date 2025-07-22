import { supabase } from '@/Supabase/supabaseClient';
import { User, UserProfile } from '@/types/user';
import { escapeEmail, unescapeEmail } from '@/utils/escaping';

// Helper to ensure only plain objects are returned
function sanitizeUser(data: any): User {
  return {
    email: data.email ?? '',
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    username: data.username ?? '',
    gender: data.gender,
    interests: data.interests ?? [],
    lookingFor: data.lookingFor ?? [],
    chats: data.chats ?? {},
    friends: data.friends ?? {},
    profile: data.profile ?? '',
    online: data.online ?? false,
    booksListed: data.booksListed ?? {},
    booksExchanged: data.booksExchanged ?? {},
    booksLiked: data.booksLiked ?? {}
  };
}

const filterRecordByValue = (record: Record<string, string>, target: string): Record<string, string> => {
  const filteredRecord: Record<string, string> = {};
  Object.entries(record).forEach(([key, value]) => {
    if (value === target) filteredRecord[key] = value;
  });
  return filteredRecord;
};

export function createUser(email: string, firstName: string, lastName: string, username: string): User {
  return { email, firstName, lastName, username, friends: {} };
}

export async function addNewUser(user: User): Promise<void> {
  const { error } = await supabase.from('users').insert(user);
  if (error) throw error;
}

export async function retrieveUser(email: string): Promise<User> {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error || !data) throw new Error('User not found');
  return sanitizeUser(data);
}

export async function refreshUser(email: string): Promise<User> {
  return retrieveUser(email);
}

export async function getAllUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data.map(sanitizeUser);
}

export async function retrieveUserFriends(email: string): Promise<string[]> {
  const user = await retrieveUser(email);
  const friends = user.friends ?? {};
  const friendEmails = Object.keys(filterRecordByValue(friends, 'Friend')).map(unescapeEmail);
  const allUsers = await getAllUsers();
  return allUsers.filter(u => friendEmails.includes(u.email)).map(u => u.username);
}

export async function retrieveUserFriendsUsers(email: string): Promise<User[]> {
  const user = await retrieveUser(email);
  const friends = user.friends ?? {};
  const friendEmails = Object.keys(filterRecordByValue(friends, 'Friend')).map(unescapeEmail);
  const allUsers = await getAllUsers();
  return allUsers.filter(u => friendEmails.includes(u.email));
}

export async function retrieveFriendRequests(email: string): Promise<User[]> {
  const user = await retrieveUser(email);
  const friends = user.friends ?? {};
  const friendEmails = Object.keys(filterRecordByValue(friends, 'Pending')).map(unescapeEmail);
  const allUsers = await getAllUsers();
  return allUsers.filter(u => friendEmails.includes(u.email));
}

export async function retrieveFriendRequestsCount(email: string): Promise<number> {
  const user = await retrieveUser(email);
  const friends = user.friends ?? {};
  return Object.keys(filterRecordByValue(friends, 'Pending')).length;
}

export async function updateUserData(user: User): Promise<void> {
  const { error } = await supabase.from('users').update(user).eq('email', user.email);
  if (error) throw error;
}

export async function retrieveUserFromUsername(username: string): Promise<User | null> {
  const { data, error } = await supabase.from('users').select('*').eq('username', username).single();
  if (error || !data) return null;
  return sanitizeUser(data);
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase.from('users').select('email').eq('email', email);
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

export async function checkUsernameExists(username: string): Promise<boolean> {
  const { data, error } = await supabase.from('users').select('username').eq('username', username);
  if (error) throw error;
  return (data?.length ?? 0) > 0;
}

export async function checkRelationship(currentEmail: string, otherEmail: string): Promise<string> {
  const user = await retrieveUser(currentEmail);
  const escaped = escapeEmail(otherEmail);
  const friends = user.friends ?? {};
  return friends[escaped] ?? 'None';
}

export async function sendFriendRequest(currentEmail: string, otherEmail: string): Promise<void> {
  const relationship = await checkRelationship(currentEmail, otherEmail);
  const currentUser = await retrieveUser(currentEmail);
  const otherUser = await retrieveUser(otherEmail);

  const escapedCurrent = escapeEmail(currentEmail);
  const escapedOther = escapeEmail(otherEmail);

  const currentFriends = { ...(currentUser.friends ?? {}) };
  const otherFriends = { ...(otherUser.friends ?? {}) };

  if (relationship === 'None') {
    currentFriends[escapedOther] = 'Requested';
    otherFriends[escapedCurrent] = 'Pending';
  } else if (relationship === 'Pending') {
    currentFriends[escapedOther] = 'Friend';
    otherFriends[escapedCurrent] = 'Friend';
  }

  await updateUserData({ ...currentUser, friends: currentFriends });
  await updateUserData({ ...otherUser, friends: otherFriends });
}

export async function acceptFriendRequest(currentEmail: string, otherEmail: string): Promise<void> {
  const relationship = await checkRelationship(currentEmail, otherEmail);
  if (relationship !== 'Pending') return;

  const currentUser = await retrieveUser(currentEmail);
  const otherUser = await retrieveUser(otherEmail);

  const escapedCurrent = escapeEmail(currentEmail);
  const escapedOther = escapeEmail(otherEmail);

  const currentFriends = { ...(currentUser.friends ?? {}) };
  const otherFriends = { ...(otherUser.friends ?? {}) };

  currentFriends[escapedOther] = 'Friend';
  otherFriends[escapedCurrent] = 'Friend';

  await updateUserData({ ...currentUser, friends: currentFriends });
  await updateUserData({ ...otherUser, friends: otherFriends });
}

// ✅ NEW FUNCTION for NavigationBar, etc.
export async function getUserProfile(email: string): Promise<UserProfile> {
  const { data, error } = await supabase
    .from('users')
    .select('username, email, profile')
    .eq('email', email)
    .single();

  if (error || !data) throw new Error('User profile not found');
  return {
    username: data.username ?? '',
    email: data.email ?? '',
    profile: data.profile ?? '',
  };
}
