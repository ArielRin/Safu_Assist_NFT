import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig, Chain } from "wagmi"; // Import 'Chain' from 'wagmi'
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";

const maxxChain: Chain = {
  id: 10201,
  name: 'Maxx Chain',
  network: 'maxxchain',
  nativeCurrency: {
    decimals: 18,
    name: 'Power',
    symbol: 'PWR',
  },
  rpcUrls: {
    default: 'https://rpc.maxxchain.org',
  },
  blockExplorers: {
    default: { name: 'Maxx Explorer', url: 'https://scan.maxxchain.org' },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [maxxChain],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://rpc.maxxchain.org",
        };
      },
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "SafuMaxx Reward NFT",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  </React.StrictMode>
);
