/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver } from '@nestjs/graphql';
import { TradeRequestImage } from './trade-request-image';

@Resolver((of) => TradeRequestImage)
export class TradeRequestImageResolver {}
