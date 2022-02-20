import { ethers } from "ethers";
import Web3 from "web3";
import abi from "./abi";
import BlocknativeSdk from 'bnc-sdk'
import Steps from "./steps";
import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/solid";
import { ThreeDots } from 'react-loader-spinner'
const url = process.env.REACT_APP_INFURA_ROPSTEN_URL;
const key = process.env.REACT_APP_TEST_WALLET_KEY;
const userAddress = "0x22bBF6fe9488e4154bd23E51bD84E8a063C08153"
const proxyAddress = "0x770aA9CB58410C39Be4aF881583ed9240c103d07"

export default function Scaffold() {
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

    const connectWallet = async () => {
        const metamaskProv = new ethers.providers.Web3Provider(window.ethereum);
        const metamaskSign = await metamaskProv.getSigner();

        const metamaskContract = new ethers.Contract("0xFab46E002BbF0b4509813474841E0716E6730136", abi, metamaskSign);
        metamaskContract.approve(proxyAddress, ethers.utils.parseUnits("10000000000000"))
    }

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
        <div style={{ backgroundImage: `url(${"/background.png"})` }} className="h-screen" >

            <div className="z-10 max-w-2xl py-20 mx-auto">
                <div className="bg-white border rounded-lg shadow-md">
                    <div className="m-8 space-y-4">
                        <p className="text-3xl font-bold">WELCOME, REBEL HACKER</p>
                        <p className="text-lg">
                            You have just stolen the private key to the Empire's funds on Tattooine.
                            You are now responsible for transporting their tokens to our crypto vault in Coruscant.
                        </p>
                        <p className="mb-4 text-lg">
                            Fly with caution. There have been reports of the Death Star in this area.
                        </p>
                        <div className="flex justify-between">
                            <div>
                                <ShoppingBagIcon className="w-20 text-blue-600" />
                            </div>
                            <div className="inline space-x-6">
                                {page == 1 ?
                                    <div className="my-6">
                                        <button
                                            onClick={() => connectWallet()}
                                            type="button"
                                            className="inline-flex items-center px-4 py-1 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            BEGIN THE TRANSFER
                                        </button>
                                    </div>

                                    :
                                    <>
                                        <ThreeDots color="#3E59EB" />
                                        <ThreeDots color="#3E59EB" />
                                        <ThreeDots color="#3E59EB" />
                                    </>}
                            </div>
                            <div>
                                <ShoppingBagIcon className="w-20 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-8 space-y-8">
                            <div className="space-y-4">
                                <p className="text-xl">Step 1: Approve the bot</p>
                                <button
                                    onClick={() => connectWallet()}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 space-y-8">
                            <div className="space-y-4">
                                <p className="text-xl">Step 2: Attempt to send your tokens and watch your transaction fail!</p>
                                <button
                                    onClick={() => scrape()}
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Begin scraping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}