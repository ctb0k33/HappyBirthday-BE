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
      'https://bsc-rpc.publicnode.com',
    );
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new Wallet(privateKey, provider);
    const birthdayContract = new ethers.Contract(
      '0x81e9A5040759193DA699254848D246950D03751C',
      ABI,
      wallet,
    );

    const tx = await birthdayContract.sendWishes(wishes.message, {
      value: ethers.utils.parseEther('0'),
    });

    return tx.hash;
  }
}
