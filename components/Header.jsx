import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            Decentralized OnChain Lottery
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
