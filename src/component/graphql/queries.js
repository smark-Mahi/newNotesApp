import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  concat,
  gql,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new createHttpLink({
  uri: "https://mind-castle-gql-server.csproject.org/graphql/notes",
});

export function getAccessToken() {
  const token =JSON.parse(localStorage.getItem("token") || "{access: ''}")
  return token
}
// console.log(getAccessToken(),'getaccess')
const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken()?.accessToken;
  if (accessToken) {
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
});

export const GET_NOTES = gql`
  query getNotes($q: String, $page: Int) {
    notes(q: $q, page: $page) {
      notes {
        id
        title
        detail
        createdAt
      }
      totalPages
    }
  }
`;

export const ADD_Note = gql`
  mutation addNote($title: String!, $detail: String!) {
    addNote(title: $title, detail: $detail) {
      id
      title
      detail
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($id: Int!) {
    deleteNote(id: $id)
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($id: Int!, $title: String!, $detail: String!) {
    updateNote(id: $id, title: $title, detail: $detail) {
      id
      title
      detail
    }
  }
`;

export const NOTEByIdQuery = gql`
  query noteById($id: Int!) {
    note(id: $id) {
      note {
        title
        detail
        createdAt
        owner {
          username
        }
      }
    }
  }
`;