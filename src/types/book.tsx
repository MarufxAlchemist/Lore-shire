export type BookId = string;
export type Title = string;
export type Author = string;

export type Category = 
    | "Academics"
    | "Adventure"
    | "Art"
    | "Biography"
    | "Children's"
    | "Classics"
    | "Comics"
    | "Contemporary"
    | "Crime"
    | "Drama"
    | "Fantasy"
    | "Film & TV"
    | "Historical Fiction"
    | "Horror"
    | "Magzines"
    | "Mystery"
    | "Non-fiction"
    | "Poetry"
    | "Romance"
    | "Science Fiction"
    | "Thriller"
    | "Young Adult";
    
export type ImageUrl = string;
export type Location = string;
export type Rating = number;
export type OwnerUsername = string;

export type Book = {
    bookId: BookId;
    title: Title;
    author: Author;
    category: Category;
    image: ImageUrl;
    location: Location;
    rating: Rating;
    ownerUsername: OwnerUsername;
};
