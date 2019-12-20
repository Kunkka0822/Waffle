import {providers, Wallet} from 'ethers';
import {createMockProvider, getWallets} from './provider';

type Fixture<T> = (provider: providers.Provider, wallets: Wallet[]) => Promise<T>;
interface Snapshot<T> {
  fixture: Fixture<T>;
  data: T;
  id: string;
  provider: providers.Web3Provider;
  wallets: Wallet[];
}

export const loadFixture = createFixtureLoader();

export function createFixtureLoader(overrideProvider?: providers.Web3Provider, overrideWallets?: Wallet[]) {
  const snapshots: Snapshot<any>[] = [];

  return async function load<T>(fixture: Fixture<T>): Promise<T> {
    const snapshot = snapshots.find((snapshot) => snapshot.fixture === fixture);
    if (snapshot) {
      await snapshot.provider.send('evm_revert', [snapshot.id]);
      snapshot.id = await snapshot.provider.send('evm_snapshot', []);
      return snapshot.data;
    } else {
      const provider = overrideProvider || createMockProvider();
      const wallets = overrideWallets || getWallets(provider);

      const data = await fixture(provider, wallets);
      const id = await provider.send('evm_snapshot', []);

      snapshots.push({fixture, data, id, provider, wallets});
      return data;
    }
  };
}
