import { useQuery } from "@apollo/client";
import { GET_NOTES, NOTEByIdQuery } from "./queries";

export function useNotes(q, page) {
  const { data, loading, error } = useQuery(GET_NOTES, {
    variables: { q, page },
  });
  return {
    notes: data?.notes.notes,
    loading,
    error: error,
    totalPages: data?.notes.totalPages,
  };
}

export function useNoteById(id) {
  const { data, loading, error } = useQuery(NOTEByIdQuery, {
    variables: { id },
  });
  return { note: data?.note?.note, loading, error: Boolean(error) };
}
