message ExtMessage {
    signature: Slice as bytes64;
    seqno: Int as uint32;
    valid_until: Int as uint32;
    message_parameters: SendParameters;
}



contract TactWallet {
    seqno: Int as uint32 = 0;
    publicKey: Int as uint256;
    admin: Address;

    init(publicKey: Int, admin: Address) {
        self.publicKey = publicKey;
        self.admin = admin;
    }

    receive() {}

    receive(str: String) {
        send(SendParameters{
            to: self.admin, 
            value: 0, 
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: false
        });
    }

    receive(slice: Slice) {
        send(SendParameters{
            to: self.admin, 
            value: 0, 
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: false
        });
    }

    external(msg: ExtMessage) {
        require(msg.message_parameters.to == self.admin, "can only send message to the admin");
        let hash: Int = beginCell().storeUint(msg.seqno, 32).storeUint(msg.valid_until, 32).storeRef(msg.message_parameters.toCell()).endCell().hash();

        // Check the signature, make sure only the people who has the private key enable to sign the message
        require(checkSignature(hash, msg.signature, self.publicKey), "Invalid Signature");

        // make sure the seqno is correct
        require(msg.seqno == self.seqno, "Invalid Seqno");

        // make sure the message is not expired, avoid replay attack
        require(now() <= msg.valid_until, "Invalid Time");

        // accept the message
        acceptMessage();
        self.seqno = self.seqno + 1;
        send(msg.message_parameters);
    }

    receive("W") {
        let ctx: Context = context();
        require(ctx.sender == self.admin, "Only admin can withdraw");
        send(SendParameters{
            to: self.admin,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors,
            body: "OK".asComment()
        });
    }

    get fun seqno(): Int {
        return self.seqno;
    }

    get fun get_public_key(): Int {
        return self.publicKey;
    }
}