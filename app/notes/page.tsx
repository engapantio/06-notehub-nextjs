// app/notes/page.tsx

//import NoteList from '@/components/NoteList/NoteList';

// const Notes = async () => {
//   const response = await getNotes();

//   return (
//     <section>
//       <h1>Notes List</h1>
//       {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
//     </section>
//   );
// };

// export default Notes;

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const Notes = async () => {
  const queryClient = new QueryClient();

  const perPage = 12;
  const search = '';
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ['note'],
    queryFn: () => fetchNotes(search, page, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />;
    </HydrationBoundary>
  );
};

export default Notes;
