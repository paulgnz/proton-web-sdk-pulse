import ProtonRNSDK, {ProtonLink} from '@proton/react-native-sdk';
import type {LinkSession} from '@proton/react-native-sdk';

class ProtonSDK {
  chainId;
  endpoints;
  requestAccount;
  session: LinkSession | null | undefined;
  link: ProtonLink | null;

  constructor() {
    this.chainId =
      '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0';
    this.endpoints = ['https://proton.greymass.com']; // Multiple for fault tolerance
    this.requestAccount = 'taskly'; // optional
    this.session = null;
    this.link = null;
  }

  login = async () => {
    const {session, link} = await ProtonRNSDK({
      linkOptions: {
        chainId: this.chainId,
        endpoints: this.endpoints,
      },
      transportOptions: {
        requestAccount: this.requestAccount,
        getReturnUrl: () => 'example://main',
      },
    });

    this.link = link;
    this.session = session;

    console.log('Auth: ', this.session?.auth);
  };

  transfer = async () => {
    if (!this.session) {
      return;
    }

    return this.session.transact(
      {
        transaction: {
          actions: [
            {
              account: 'eosio.token',
              name: 'transfer',
              authorization: [this.session.auth],
              data: {
                from: this.session.auth.actor,
                to: 'token.burn',
                quantity: '0.0001 XPR',
                memo: '',
              },
            },
          ],
        } as never,
      },
      {
        broadcast: true,
      },
    );
  };

  logout = async () => {
    if (this.link && this.session) {
      await this.link.removeSession(
        this.requestAccount,
        this.session.auth,
        this.chainId as any,
      );

      this.link = null;
      this.session = undefined;
    }
  };
}

export const sdk = new ProtonSDK();
