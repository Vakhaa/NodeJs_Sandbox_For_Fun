import IRequest from '../interfaces/IRequest.js';
import IResponse from '../interfaces/IResponse.js';
import { TNext } from './TMiddlewareNext.js';

export type TMiddleware =
  (req: IRequest, res: IResponse, next: TNext) => Promise<void> | void;
