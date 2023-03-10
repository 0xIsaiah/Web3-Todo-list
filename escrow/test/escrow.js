// this code block allows us to test if a function code results in an error within the smart-contract
const Escrow = artifacts.require('Escrow');

const assertError = async (promise, error) => {
    try {
      await promise;
    } catch(e) {
      assert(e.message.includes(error))
      return;
    }
    assert(false);
  }

contract('Escrow', (accounts) => {
  let escrow = null;
  const [lawyer, payer, recipient] = accounts;
  beforeEach(async () => {
    escrow = await Escrow.deployed();
  });

  it('Should deposit', async () => {
    await escrow.deposit({from: payer, value: 900})
    const escrowBalance = parseInt(await web3.eth.getBalance(escrow.address));
    assert(escrowBalance === 900)
  });

  it('should not deposit if the sender is not the payer', async () => {
    assertError(
        escrow.deposit({from: accounts[5], value: 100}),
        'Sender must be the payer'
    );
  });

  it('should not deposit if transfer exceed amount', async () => {
    assertError(
        escrow.deposit({from: payer, value: 2000}),
        'Cant send more than escrow amount'
    );
  });

  it('should not release funds if the full amount has not been recieved', async () => {
    assertError(
        escrow.release({from: lawyer}),
        'cannot release funds before full amount is sent'
    );
  });

  it('should not release funds if the sender is not the lawyer', async () => {
    escrow.deposit({from: payer, value: 100});
    assertError(
        escrow.release({from: accounts[5]}),
        'only lawyer can release funds'
    );
  });

  it('should release funds', async () => {
    const balanceRecipientBefore = web3.utils.toBN(await web3.eth.getBalance(recipient));
    await escrow.release({from: lawyer});
    const balanceRecipientAfter = web3.utils.toBN(await web3.eth.getBalance(recipient));
    assert(balanceRecipientAfter.sub(balanceRecipientBefore).toNumber() === 1000);
  });
});