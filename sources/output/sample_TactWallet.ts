import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ExtMessage = {
    $$type: 'ExtMessage';
    signature: Buffer;
    seqno: bigint;
    valid_until: bigint;
    message_parameters: SendParameters;
}

export function storeExtMessage(src: ExtMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3240438462, 32);
        b_0.storeBuffer(src.signature);
        b_0.storeUint(src.seqno, 32);
        b_0.storeUint(src.valid_until, 32);
        let b_1 = new Builder();
        b_1.store(storeSendParameters(src.message_parameters));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadExtMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3240438462) { throw Error('Invalid prefix'); }
    let _signature = sc_0.loadBuffer(64);
    let _seqno = sc_0.loadUintBig(32);
    let _valid_until = sc_0.loadUintBig(32);
    let sc_1 = sc_0.loadRef().beginParse();
    let _message_parameters = loadSendParameters(sc_1);
    return { $$type: 'ExtMessage' as const, signature: _signature, seqno: _seqno, valid_until: _valid_until, message_parameters: _message_parameters };
}

function loadTupleExtMessage(source: TupleReader) {
    let _signature = source.readBuffer();
    let _seqno = source.readBigNumber();
    let _valid_until = source.readBigNumber();
    const _message_parameters = loadTupleSendParameters(source.readTuple());
    return { $$type: 'ExtMessage' as const, signature: _signature, seqno: _seqno, valid_until: _valid_until, message_parameters: _message_parameters };
}

function storeTupleExtMessage(source: ExtMessage) {
    let builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeNumber(source.seqno);
    builder.writeNumber(source.valid_until);
    builder.writeTuple(storeTupleSendParameters(source.message_parameters));
    return builder.build();
}

function dictValueParserExtMessage(): DictionaryValue<ExtMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExtMessage(src)).endCell());
        },
        parse: (src) => {
            return loadExtMessage(src.loadRef().beginParse());
        }
    }
}

 type TactWallet_init_args = {
    $$type: 'TactWallet_init_args';
    publicKey: bigint;
    admin: Address;
}

function initTactWallet_init_args(src: TactWallet_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.publicKey, 257);
        b_0.storeAddress(src.admin);
    };
}

async function TactWallet_init(publicKey: bigint, admin: Address) {
    const __code = Cell.fromBase64('te6ccgECGwEABKUAART/APSkE/S88sgLAQIBIAIDAgFIBAUCdvLbPFUC2zwwyPhDAcx/AcoAVSBQI8sfy/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UExQC4NAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUS2zzy4ILI+EMBzH8BygBVIFAjyx/L/wEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ7VQTBgIBIAkKAmrtou37AZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwklt/4MAA4wAwIHCAQnBVIG1tbds8fwcZA9Qg+QGC8NREwy+bOV6H8cGztnKTMY10GFCQOeG6X+hNNm49v1YUuo8lMPhBbyQQI18DIYIAhkICxwXy9HCBAIKII1Ugf1UwbW3bPH/bMeAg10nCH46UgCDXITAgcIBCcFUgbW1t2zx/2zHgCBkZAAwAAAAAT0sCASALDAIBIA8QAhG7Oc2zzbPGwxgTDQIRuMl9s82zxsMYEw4AAiEAAiIAlbu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSAIBSBESABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWJGallwb0I2am5xS2dFQURpOWVLOG1YZzRrN05oR2pHN0JUc0g3SDNpc2dLggAdLtRNDUAfhj0gABjifTH9P/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwbBPg+CjXCwqDCbry4ImBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEB2zwVATBwIddJwh+VMCDXCx/eghDBJSq+uuMCMHAWAARwWQPm0x8BghDBJSq+uvLggYMI1xjTH9Mf1AHQ2zw3EHoQeRB4VQVsGoEs71O2xwXy9CjIyx9SgMsfVHdlVHdlJ8hVYNs8yQHMyfkAgSVpUb35EBry9IF3LFGMuhjy9IEvAfgjUAe7FvL0+AAJpBA2RRlEQ9s8fxcYGQCS0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAgQEB1wDSAAGR1JJtAeLSAAGR1JJtAeLSAAGR1JJtAeJVYAC4UGfKAFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AgQEBzwAhbrOVfwHKAMyUcDLKAOIhbrOVfwHKAMyUcDLKAOIhbrOVfwHKAMyUcDLKAOIByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAGgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzA==');
    const __system = Cell.fromBase64('te6cckECHQEABK8AAQHAAQEFoMNXAgEU/wD0pBP0vPLICwMCASAJBAJ28ts8VQLbPDDI+EMBzH8BygBVIFAjyx/L/wEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJ7VQbBQEwcCHXScIflTAg1wsf3oIQwSUqvrrjAjBwBgPm0x8BghDBJSq+uvLggYMI1xjTH9Mf1AHQ2zw3EHoQeRB4VQVsGoEs71O2xwXy9CjIyx9SgMsfVHdlVHdlJ8hVYNs8yQHMyfkAgSVpUb35EBry9IF3LFGMuhjy9IEvAfgjUAe7FvL0+AAJpBA2RRlEQ9s8fwgHGAC4UGfKAFAEINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AgQEBzwAhbrOVfwHKAMyUcDLKAOIhbrOVfwHKAMyUcDLKAOIhbrOVfwHKAMyUcDLKAOIAktIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAIEBAdcA0gABkdSSbQHi0gABkdSSbQHi0gABkdSSbQHiVWACAUgVCgIBIBALAgEgDwwCAUgODQB1sm7jQ1aXBmczovL1FtYkZqWXBvQjZqbnFLZ0VBRGk5ZUs4bVhnNGs3TmhHakc3QlRzSDdIM2lzZ0uCAAEbCvu1E0NIAAYACVu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAgEgExECEbjJfbPNs8bDGBsSAAIiAhG7Oc2zzbPGwxgbFAACIQLg0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLggsj4QwHMfwHKAFUgUCPLH8v/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVBsWAmrtou37AZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwklt/4MAA4wAwIHCAQnBVIG1tbds8fxcYA9Qg+QGC8NREwy+bOV6H8cGztnKTMY10GFCQOeG6X+hNNm49v1YUuo8lMPhBbyQQI18DIYIAhkICxwXy9HCBAIKII1Ugf1UwbW3bPH/bMeAg10nCH46UgCDXITAgcIBCcFUgbW1t2zx/2zHgGhgYAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABkAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwADAAAAABPSwHS7UTQ1AH4Y9IAAY4n0x/T//pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwT4Pgo1wsKgwm68uCJgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEgLRAds8HAAEcFn3vy8k');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTactWallet_init_args({ $$type: 'TactWallet_init_args', publicKey, admin })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TactWallet_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    9577: { message: `Invalid Signature` },
    11503: { message: `can only send message to the admin` },
    12033: { message: `Invalid Time` },
    30508: { message: `Invalid Seqno` },
    34370: { message: `Only admin can withdraw` },
}

const TactWallet_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ExtMessage","header":3240438462,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"seqno","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"valid_until","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"message_parameters","type":{"kind":"simple","type":"SendParameters","optional":false}}]},
]

const TactWallet_getters: ABIGetter[] = [
    {"name":"seqno","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"get_public_key","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const TactWallet_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"any"}},
    {"receiver":"external","message":{"kind":"typed","type":"ExtMessage"}},
    {"receiver":"internal","message":{"kind":"text","text":"W"}},
]

export class TactWallet implements Contract {
    
    static async init(publicKey: bigint, admin: Address) {
        return await TactWallet_init(publicKey, admin);
    }
    
    static async fromInit(publicKey: bigint, admin: Address) {
        const init = await TactWallet_init(publicKey, admin);
        const address = contractAddress(0, init);
        return new TactWallet(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TactWallet(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TactWallet_types,
        getters: TactWallet_getters,
        receivers: TactWallet_receivers,
        errors: TactWallet_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | string | Slice | 'W') {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (message === 'W') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async sendExternal(provider: ContractProvider, message: ExtMessage) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExtMessage') {
            body = beginCell().store(storeExtMessage(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.external(body);
        
    }
    
    async getSeqno(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('seqno', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetPublicKey(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_public_key', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}