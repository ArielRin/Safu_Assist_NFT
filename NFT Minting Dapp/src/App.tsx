import {
  Button,
  Container,
  Text,
  Box,
  Link,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import abiFile from './abiFile.json';

const CONTRACT_ADDRESS = '0xfA0644C86D8bC887496ea2A53aB470f6E85A0f27';

const getOpenSeaURL = (tokenId: string) =>
  `https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS}/${tokenId}`;

function App() {
  const contractConfig = {
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: abiFile,
  };

  const [imgURL, setImgURL] = useState('');
  const { writeAsync: mint, error: mintError } = useContractWrite({
    ...contractConfig,
    functionName: 'mint',
  });
  const [mintLoading, setMintLoading] = useState(false);
  const { address } = useAccount();
  const isConnected = !!address;
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);
  const [mintAmount, setMintQuantity] = useState(1);

  const calculateTotalPrice = () => {
    const pricePerToken = 1.0; // Adjust the price per token as needed
    return ethers.utils.parseEther((mintAmount * pricePerToken).toString());
  };

  const handleIncrement = () => {
    setMintQuantity((prevQuantity) => Math.min(prevQuantity + 1, 5));
  };

  const handleDecrement = () => {
    setMintQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const onMintClick = async () => {
    try {
      setMintLoading(true);
      const totalPrice = calculateTotalPrice();

      const tx = await mint({
        args: [mintAmount, { value: totalPrice }],
      });

      await tx.wait(); // Wait for the transaction to be mined

      // Assume the tokenId is returned directly from the contract
      const tokenId = ''; // Replace with the actual way you get the tokenId
      setMintedTokenId(tokenId);
    } catch (error) {
      console.error(error);
    } finally {
      setMintLoading(false);
    }
  };

  return (
    <Container paddingY='10'>
      <ConnectButton />

      <Text marginTop='4'>SafuMaxx Reward NFT</Text>
      <Text marginTop='4'>Only 200 for purchase</Text>
      <Text marginTop='4'>2500PWR per NFT</Text>

      <Box marginTop='4' display='flex' alignItems='center'>
        <Button
          onClick={handleDecrement}
          disabled={!isConnected || mintLoading || mintAmount === 1}
        >
          -
        </Button>
        <Text marginX='2'>{mintAmount}</Text>
        <Button
          onClick={handleIncrement}
          disabled={!isConnected || mintLoading || mintAmount === 5}
        >
          +
        </Button>
      </Box>

      <Button
        disabled={!isConnected || mintLoading}
        marginTop='6'
        onClick={onMintClick}
        textColor='white'
        bg='blue.500'
        _hover={{
          bg: 'blue.700',
        }}
      >
        {isConnected ? `Mint ${mintAmount} Now` : ' Mint on (Connect Wallet)'}
      </Button>

      {mintError && (
        <Text marginTop='4'>⛔️ Mint unsuccessful! Error message:</Text>
      )}

      {mintError && (
        <pre style={{ marginTop: '8px', color: 'red' }}>
          <code>{JSON.stringify(mintError, null, ' ')}</code>
        </pre>
      )}
      {mintLoading && <Text marginTop='2'>Minting... please wait</Text>}

      {mintedTokenId && (
        <Text marginTop='2'>
          Mint successful! You can view your NFT{' '}
          <Link
            isExternal
            href={getOpenSeaURL(mintedTokenId)}
            color='blue'
            textDecoration='underline'
          >
            Soon!
          </Link>
        </Text>
      )}
    </Container>
  );
}

export default App;
