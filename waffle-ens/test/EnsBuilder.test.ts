import {expect} from 'chai';
import {constants, utils} from 'ethers';
import {MockProvider} from '@ethereum-waffle/provider';
import {createENSBuilder, ENSBuilder} from '../src/index';

const {AddressZero} = constants;
const {namehash} = utils;
const noExistingNode = '0x0000000000000000000000000000000000000000000000000000000000000001';

describe('INTEGRATION: Deploy Ens', async () => {
  const provider = new MockProvider();
  const [wallet] = provider.getWallets();
  let ensBuilder: ENSBuilder;

  before(async () => {
    ensBuilder = await createENSBuilder(wallet);
  });

  it('ENS deployed', async () => {
    expect(await ensBuilder.ens.owner(noExistingNode)).to.equal(AddressZero);
  });

  it('PublicResolver deployed and setup', async () => {
    expect(await ensBuilder.ens.resolver(namehash('resolver'))).to.eq(ensBuilder.resolver.address);
    expect(await ensBuilder.ens.owner(namehash('resolver'))).to.eq(wallet.address);
    expect(await ensBuilder.resolver.addr(namehash('resolver'))).to.eq(ensBuilder.resolver.address);
  });

  it('Create top level domain', async () => {
    await ensBuilder.createTopLevelDomain('test');
    expect(await ensBuilder.ens.owner(namehash('test'))).to.eq(ensBuilder.registrars['test'].address);
  });

  it('Create sub domain', async () => {
    await ensBuilder.createSubDomain('ethworks.test');
    expect(await ensBuilder.ens.owner(namehash('ethworks.test'))).to.eq(ensBuilder.registrars['ethworks.test'].address);
    expect(await ensBuilder.ens.resolver(namehash('ethworks.test'))).to.eq(ensBuilder.resolver.address);
  });

  it('Set address', async () => {
    await ensBuilder.setAddress('vlad.ethworks.test', ensBuilder.wallet.address);
    expect(await ensBuilder.ens.owner(namehash('vlad.ethworks.test'))).to.eq(ensBuilder.wallet.address);
    expect(await ensBuilder.resolver.addr(namehash('vlad.ethworks.test'))).to.eq(ensBuilder.wallet.address);
    expect(await ensBuilder.ens.resolver(namehash('vlad.ethworks.test'))).to.eq(ensBuilder.resolver.address);
  });
});
