import { ValidatorOptions } from 'class-validator';

export interface ValidatorPipeOptions extends ValidatorOptions {
  enableDebugMessages: true;
}
