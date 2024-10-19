
export interface Book {
    id: string,
    title: string;
    description: string;
    cover_image: string;
    file_path: string;
    published_year: number;
    language: string;
    created_at: string;
    updated_at: string;
    authors: string[];
    coins: number;
}
