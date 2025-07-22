import { supabase } from "@/Supabase/supabaseClient";
import { Book } from "@/types/book";
import { v4 as uuidv4 } from "uuid";

// Generate unique book ID
export function generateBookId(): string {
  return uuidv4();
}

// Add new book
export async function addNewBook(bookData: Book): Promise<Book> {
  const { error } = await supabase
    .from("books")
    .insert([{ ...bookData }]);

  if (error) {
    console.error("Error adding book:", error);
    throw error;
  }

  return bookData;
}

// Retrieve a book by ID
export async function retrieveBook(bookId: string): Promise<Book> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("bookId", bookId)
    .single();

  if (error || !data) {
    console.error("Error retrieving book:", error);
    throw error || new Error("Book not found");
  }

  return data;
}

// Update book
export async function updateBook(bookId: string, updatedData: Partial<Book>): Promise<void> {
  const { error } = await supabase
    .from("books")
    .update(updatedData)
    .eq("bookId", bookId);

  if (error) {
    console.error("Error updating book:", error);
    throw error;
  }
}

// Update user's listed books (adds bookId to user's array)
export async function updateListedBookRecords(userEmail: string, bookId: string) {
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("booksListed")
    .eq("email", userEmail)
    .single();

  if (userError || !userData) {
    throw userError || new Error("User not found");
  }

  const updatedList = [...(userData.booksListed || []), bookId];

  const { error: updateError } = await supabase
    .from("users")
    .update({ booksListed: updatedList })
    .eq("email", userEmail);

  if (updateError) {
    console.error("Error updating booksListed:", updateError);
    throw updateError;
  }
}

// Get all books
export async function getAllBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*");

  if (error) {
    console.error("Error fetching books:", error);
    throw error;
  }

  return data;
}

// Get all listed books by user
export async function getListedBooks(userEmail: string): Promise<Book[]> {
  const { data: user, error } = await supabase
    .from("users")
    .select("booksListed")
    .eq("email", userEmail)
    .single();

  if (error || !user) {
    console.error("Error fetching user's booksListed:", error);
    throw error || new Error("User not found");
  }

  const bookIds: string[] = user.booksListed || [];

  const books: Book[] = [];

  for (const bookId of bookIds) {
    try {
      const book = await retrieveBookById(bookId);
      books.push(book);
    } catch {
      // skip if not found
    }
  }

  return books;
}

// Retrieve single book
export async function retrieveBookById(bookId: string): Promise<Book> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("bookId", bookId)
    .single();

  if (error || !data) {
    throw error || new Error("Book not found");
  }

  return data;
}
