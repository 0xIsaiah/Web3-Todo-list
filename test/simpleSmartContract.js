const SimpleSmartContract = artifacts.require('SimpleSmartContract');

contract('simpleSmartContract', () => {
  it('should deploy smart contract properly', async () => {
    const simpleSmartContract = await SimpleSmartContract.deployed();
    assert(simpleSmartContract.address !== '');
  });
});
