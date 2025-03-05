import { Injectable } from '@nestjs/common';
import { ethers, Wallet } from 'ethers';
import { ABI } from './abi';
import 'dotenv/config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendWishes(wishes: any) {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://bsc-testnet-rpc.publicnode.com',
    );
    console.log(process.env.PRIVATE_KEY);
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new Wallet(privateKey, provider);
    const birthdayContract = new ethers.Contract(
      '0x2e16a8aD6A73ece9Ee5c6307E34fa55074808F99',
      ABI,
      wallet,
    );

    const tx = await birthdayContract.sendWishes(wishes.message, {
      value: ethers.utils.parseEther('0'),
    });

    return tx.hash;
  }
}
