import { useState } from "react";
import { Button } from "@chakra-ui/react";

export default function ConnectWalletButton() {
  const [connectedAddress, setConnectedAddress] = useState("");

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        setConnectedAddress(accounts[0]);
        console.log(`Connected to wallet with address: ${accounts[0]}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Metamask not installed.");
    }
  };

  return (
    <Button
    as={'a'}
    display={{ base: 'none', md: 'inline-flex' }}
    fontSize={'sm'}
    fontWeight={600}
    color={'white'}
    bg={'pink.400'}
    _hover={{
      bg: 'pink.300',
    }}
    onClick={handleConnectWallet}>
    {connectedAddress ? `Connected: ${connectedAddress}` : "Connect Wallet"}
  </Button>
  );
}
