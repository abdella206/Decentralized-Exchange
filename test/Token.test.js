import { tokens, EVM_REVERT } from './helpers'
const Token = artifacts.require('./Token')
require('chai').use(require('chai-as-promised')).should()





contract('Token', ([deployer, receiver]) => {
    const name = 'Black Wall Street'
    const symbol = 'BWS'
    const decimals = '18'
    const totalSupply = tokens(1000000).toString()
    let token;

    beforeEach(async () => {
        // Fetch token from blockchain
        token = await Token.new()

    })

    describe('deployment', () => {

        it('tracks the name', async () => {
            // Read token name...
            const result = await token.name()

            // Check the token name is 'My name'
            result.should.equal(name)
        })

        it('tracks the symbol', async () => {
            // Read token symbol...
            const result = await token.symbol()

            // Check the token symbol is 'My name'
            result.should.equal(symbol)
        })

        it('tracks the decimal', async () => {
            // Read token symbol...
            const result = await token.decimals()

            // Check the token symbol is 'My name'
            result.toString().should.equal(decimals)
        })

        it('tracks the total supply', async () => {
            // Read token symbol...
            const result = await token.totalSupply()

            // Check the token symbol is 'My name'
            result.toString().should.equal(totalSupply)
        })

        it('assigns the total supply to the deployer', async () => {

            const result = await token.balanceOf(deployer)
            result.toString().should.equal(totalSupply)
        })

















    })

    describe('sending tokens', () => {
        let result;
        let amount;

        describe('success', async () => {

            beforeEach(async () => {
                // Transfer 
                amount = tokens(100)
                result = await token.transfer(receiver, amount, { from: deployer })
            })

            it('transfer token balances', async () => {
                let balanceOf
                // After transfer
                balanceOf = await token.balanceOf(deployer)
                balanceOf.toString().should.equal(tokens(999900).toString())
                //=================================================================
                balanceOf = await token.balanceOf(receiver)
                balanceOf.toString().should.equal(tokens(100).toString())
            })

            it('emits a transfer event', () => {
                const log = result.logs[0]
                log.event.should.equal('Transfer')
                const event = log.args
                event.from.toString().should.equal(deployer, 'from is correct')
                event.to.should.equal(receiver, 'to is correct')
                event.value.toString().should.equal(amount.toString(), 'value is correct')
            })

        })


        describe('failure', async () => {

            it('rejects insufficient balances', async () => {
                let invalidAmount
                invalidAmount = tokens(100000000) // 100 million - greater than total supply
                await token.transfer(receiver, invalidAmount, { from: deployer }).should.be.rejectedWith(EVM_REVERT)

            })

            it('rejects invalid recipients', async () => {
                await token.transfer(0x0, amount, { from: deployer }).should.be.rejected
              })

        })




    })
























})