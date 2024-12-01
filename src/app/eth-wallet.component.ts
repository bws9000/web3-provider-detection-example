import { Component } from '@angular/core';
import { EthereumProvider } from '../types/global';

/*
https://eips.ethereum.org/EIPS/eip-1193
*/

@Component({
  selector: 'eth-wallet-com',
  templateUrl: './eth-wallet.component.html',
  styleUrls: ['./eth-wallet.component.scss'],
})
export class EthWalletComponent {
  constructor() {
    this.detectProvider();
  }

  async detectProvider() {
    if (typeof window.ethereum !== 'undefined') {
      const ethereum = window.ethereum as EthereumProvider;
      console.log('ethereum provider detected...');
      try {
        const supportedMethods = ['eth_accounts', 'eth_chainId'];
        const providers = ethereum.providers || [ethereum];

        for (const [index, provider] of providers.entries()) {
          console.log(`checking provider ${index + 1}...`);
          const results = await Promise.all(
            supportedMethods.map((method) =>
              provider
                .request({ method })
                .then(() => `${method}: supported`)
                .catch(() => `${method}: not supported`)
            )
          );

          console.log(`provider ${index + 1} supports:`, results);
          results.forEach((result, i) => {
            if (result.includes('not supported')) {
              console.warn(
                `provider ${index + 1} not support: ${supportedMethods[i]}`
              );
            }
          });
        }
      } catch (error) {
        console.error('error detecting provider methods:', error);
      }
    } else {
      console.error('no eth provider detected.');
    }
  }
}
