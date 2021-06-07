import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import api from 'api';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import EditableText from './EditableText';

function RecordsTable({ records }) {
  const updateRecord = useMutation(({ payload, id }) =>
    api.update(payload, id)
  );

  const deleteRecord = useMutation(id => api.delete(id));

  const queryClient = useQueryClient();

  function handleUpdate(event) {
    const updatedRecord = {
      ...records.find(
        ({ id }) =>
          id ===
          // Make sure to check as a number!
          Number(event.target.dataset.id)
      ),
      ...{ [event.target.dataset.key]: event.target.value },
    };

    updateRecord.mutate({
      payload: updatedRecord,
      id: event.target.dataset.id,
    });
  }

  function handleDelete(event) {
    console.log('Gonna delete the record with id ' + event.target.dataset.id);
    deleteRecord.mutate(event.target.dataset.id, {
      onSuccess: async () => {
        console.log('OK');
        queryClient.invalidateQueries('records');
      },
    });
  }

  return (
    <Table variant="simple">
      <TableCaption>Click on any data to edit 📝 it.</TableCaption>
      <Thead>
        <Tr>
          <Th>Artist</Th>
          <Th>Album</Th>
          <Th>Year</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {records.map(({ id, artist, album, year }) => (
          <Tr key={id} data-id={id}>
            <Td>
              <EditableText
                value={artist}
                handler={handleUpdate}
                recordKey="artist"
                id={id}
              />
            </Td>
            <Td>
              <EditableText
                value={album}
                handler={handleUpdate}
                recordKey="album"
                id={id}
              />
            </Td>
            <Td>
              <EditableText
                value={year}
                handler={handleUpdate}
                recordKey="year"
                id={id}
              />
            </Td>
            <Td>
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="teal"
                variant="solid"
                size="xs"
                onClick={handleDelete}
                data-id={id}
              >
                Delete 🔥
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

RecordsTable.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.exact({
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};

export default RecordsTable;
