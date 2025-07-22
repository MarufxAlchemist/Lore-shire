import { supabase } from '../Supabase/supabaseClient';

// Fetch all posts from the "posts" table
export const getAllPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*');

  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }

  return data;
};