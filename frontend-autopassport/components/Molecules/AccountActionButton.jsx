import { Button } from "@chakra-ui/react";

export default function AccountActionButton(props) {

  const { href, children } = props;

  return (
    <Button
    as={'a'}
    href={href}
    display={{ base: 'none', md: 'inline-flex'}}
    fontSize={'sm'}
    fontWeight={600}
    color={'pink.400'}
    bg={'white'}
    _hover={{
      bg: 'pink.100',
    }}>
      {children}
  </Button>
  );
}
