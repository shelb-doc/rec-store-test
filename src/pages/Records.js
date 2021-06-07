import { Text } from '@chakra-ui/react';
import api from 'api';
import Form from 'components/RecordsForm';
import Table from 'components/RecordsTable';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const fetchRecords = async () => await api.index();

function Records() {
  const { status, data, error } = useQuery('records', fetchRecords);

  const addRecord = useMutation(payload => api.create(payload));

  const queryClient = useQueryClient();

  const handleSubmit = event => {
    event.preventDefault();
    addRecord.mutate(Object.fromEntries(new FormData(event.target)), {
      onSuccess: () => {
        queryClient.invalidateQueries('records');
      },
    });
  };

  switch (status) {
    case 'loading':
      return <Text>Loading...</Text>;
    case 'error':
      return <Text color="tomato">{error.message}</Text>;
    default:
      return (
        <main className="container mx-auto">
          <Table records={data} />
          <Form handler={handleSubmit} />
        </main>
      );
  }
}

export default Records;
