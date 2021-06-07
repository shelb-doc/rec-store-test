import { Text } from '@chakra-ui/react';

function Footer() {
  return (
    <footer className="container mx-auto py-2">
      <Text fontSize="xs">
        {new Date().getFullYear()} Mimikyu Records &copy;
      </Text>
    </footer>
  );
}

export default Footer;
