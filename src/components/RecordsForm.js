import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function RecordsForm({ handler }) {
  return (
    <form className="flex flex-col gap-4 mb-4" onSubmit={handler}>
      <FormControl id="artist" isRequired>
        <FormLabel>Artist</FormLabel>
        <Input placeholder="artist" name="artist" />
      </FormControl>
      <FormControl id="album" isRequired>
        <FormLabel>Album</FormLabel>
        <Input placeholder="Album" name="album" />
      </FormControl>
      <FormControl id="year" isRequired>
        <FormLabel>Year</FormLabel>
        <Input placeholder="year" name="year" />
      </FormControl>

      <Button colorScheme="green" type="submit" className="max-w-xs">
        Add Record
      </Button>
    </form>
  );
}

RecordsForm.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default RecordsForm;
