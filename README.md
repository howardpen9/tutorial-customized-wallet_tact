# Example Template for Customized Wallet in Tact language

```bash
yarn build # To build contract
yarn test # To run test cases
yarn deploy # To deploy contract
yarn external # Send and executre the external message to contract
```

=> Remember to change the parameters in `depoly.ts` file!

# Content

This repo is dedicated to teach people how to create a new Wallet in TON. (Since all the wallet in TON is a contract). You can customized the wallet to any you want, especially to trigged the external message in here.

這個代碼倉庫可以自己去延伸。就是示範外部訊息的操作方式。

## Process

People can get the Secret Key first to deploy the contract. Then, they can use the Secret Key to send the external message to the contract.

腳本運行後會生成私鑰，然後用私鑰部署合約，部署後可以用私鑰發送外部消息。
然而，只有一開始設置的 Admin 管理員可以提幣。

## More

[https://docs.tact-lang.org/_next/static/media/banner.0c18b672.jpeg]

For more information about this GitHub repository, or if you have any questions related to Tact, feel free to visit:

-   https://t.me/ton101
-   https://t.me/tactlang
-   https://t.me/tondev
-   https://tact-lang.org/
-   https://docs.tact-lang.org/
