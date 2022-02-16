import { ethers } from "ethers";
import Web3 from "web3";
import abi from "./abi";
import BlocknativeSdk from 'bnc-sdk'
const url = process.env.REACT_APP_INFURA_ROPSTEN_URL;

export default function Scraper() {

    const options = {
        dappId: "4742117e-34ba-4e33-9910-1cd5fd4355da",
        networkId: 3,
        transactionHandlers: [(event) => {
            /* contractCall shape
                
            */
            const { contractCall, status } = event.transaction;
            
        }],
    }
    const myAddress = "0x22bBF6fe9488e4154bd23E51bD84E8a063C08153";
    
    const scrape = async () => {
        const blocknative = new BlocknativeSdk(options);
        blocknative.account(myAddress);
    }
    return(
    <>
        <p>Scraped</p>
        <button onClick={() => scrape()}>adsf</button>
    </>
    )
}