import * as fs from "fs";
import * as path from "path";
import { mnemonicNew, mnemonicToWalletKey } from "ton-crypto";
import { beginCell, contractAddress, toNano, Cell, Address } from "ton";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";
// ================================================================= //
import { TactWallet } from "./output/sample_TactWallet";
// ================================================================= //

(async () => {
    let testnet = true;
    let mnemonics = await mnemonicNew();
    fs.writeFileSync("secret.txt", mnemonics.toLocaleString());
    let pair = await mnemonicToWalletKey(mnemonics);

    // ===== Parameters =====
    let owner = Address.parse("Your Address"); // 🌟 Replace owner with your address

    let init = await TactWallet.init(BigInt("0x" + pair.publicKey.toString("hex")), owner);
    let address = contractAddress(0, init);
    let deployAmount = toNano("0.1");

    // Do deploy
    await deploy(init, deployAmount, "", testnet);
    printHeader("sample_Contract");
    printAddress(address);
})();
