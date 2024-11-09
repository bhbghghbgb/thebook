// src/hooks/useFetchData.ts
import { useQuery } from '@tanstack/react-query';
import {fetchData}  from '../service/api/fetchData.ts';
import axios from "axios";
import { Book } from "../models/Book";

const fetchBooks = async (): Promise<Book[]> => {
    const response = await axios.get("http://localhost:5024/api/Book");
    return response.data;
};

const useFetchData = (url: string) => {
    return useQuery([url], () => fetchData(url));
};

const useFetchBooks = () => {
    return useQuery<Book[], Error>("books", fetchBooks);
};

export {useFetchData, useFetchBooks}