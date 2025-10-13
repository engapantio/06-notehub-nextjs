// lib/api.ts

import axios from 'axios';
import { Note } from '../types/note';

// export type Note = {
//   id: string;
//   title: string;
//   content: string;
//   tag: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type NoteListResponse = {
//   notes: Note[];
//   totalPages: number;
// };

// export const getNotes = async () => {
//   await delay(2000);
//   const res = await axios.get<NoteListResponse>('/notes');
//   return res.data;
// };

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNoteProps {
  title: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  content: string;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] =
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(
    `/notes?search=${search}&page=${page}&perPage=${perPage}`
  );

  return response.data;
};

export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
  const response = await axios.post<Note>('/notes', newNote);

  return response.data;
};

export const deleteNote = async (id: Note['id']): Promise<Note> => {
  const response = await axios.delete<Note>(`notes/${id}`);
  return response.data;
};
