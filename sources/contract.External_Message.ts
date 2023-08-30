import { Address, beginCell, toNano, TonClient4, Cell, contractAddress } from "ton";
import { mnemonicToWalletKey, sign } from "ton-crypto";
import { TactWallet, storeSendParameters, SendParameters } from "./output/sample_TactWallet";
// import { fill_send_parameters, send_ext_message } from "./helpers";
import { readFileSync } from "fs";

(async () => {
    let client4 = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });

    let mnemonics = readFileSync("secret.txt").toString().split(",");
    let pair = mnemonicToWalletKey(mnemonics);

    let owner = Address.parse("Your Address"); // 🌟🌟🌟
    let new_receiver = Address.parse("ADDRESS"); // 🌟🌟🌟

    let wallet = client4.open(await TactWallet.fromInit(BigInt("0x" + (await pair).publicKey.toString("hex")), owner));
    let params = fill_send_parameters(
        new_receiver, // New Receiver
        toNano("0.05"),
        beginCell().storeUint(0, 32).storeStringTail("Hello").endCell(),
        1n
    );
    await send_ext_message(wallet, (await pair).secretKey, BigInt((await client4.getLastBlock()).now + 20), params);
    console.log("=== Transaction sent ===");
})();

export function fill_send_parameters(
    to: Address,
    value: bigint,
    body: Cell,
    mode: bigint = 1n,
    bounce: boolean = true,
    code: Cell | null = null,
    data: Cell | null = null
): SendParameters {
    return { $$type: "SendParameters", to, value, body, mode, bounce, code, data };
}

export async function send_ext_message(wallet: any, secretKey: Buffer, valid_until: bigint, params: SendParameters) {
    let parameters_b = beginCell();
    storeSendParameters(params)(parameters_b);
    let seqno = await wallet.getSeqno();
    let hash = beginCell()
        .storeUint(seqno, 32)
        .storeUint(valid_until, 32)
        .storeRef(parameters_b.endCell())
        .endCell()
        .hash();
    wallet.sendExternal({
        $$type: "ExtMessage",
        signature: sign(hash, secretKey),
        seqno,
        valid_until,
        message_parameters: params,
    });
}
