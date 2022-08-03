import {useWeb3Contract} from "react-moralis"
import {abi, contractAddresses} from "../constants"
import {useMoralis} from "react-moralis"
import {useEffect, useState} from "react"

export default function LotteryEntrance() {
    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState("0")

    const {runContractFunction: enterRaffle} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        msgValue: entranceFee,
        params: {}
    })

    const {runContractFunction: getEntranceFee} = useWeb3Contract({abi: abi, contractAddress: raffleAddress, functionName: "getEntranceFee", params: {}})

    async function updateUI() {
        const entranceFeeFromCall = await getEntranceFee()
        setEntranceFee(entranceFeeFromCall.toString())
        console.log(entranceFee)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            Hi From lottery entrance!
            <div>{entranceFee}</div>
        </div>
    )
}
