import axios, { AxiosResponse } from 'axios';
import {
  backOfficeApiConfiguration,
  httpConfiguration,
} from '../../shared/shared.configuration';
import { FeatureFlag } from './featureFlag.model';
import { routes } from './featureFlag.configuration';

export const baseUrl = `${backOfficeApiConfiguration.baseUrl}${routes.api}`;

export const getFeatureFlags = async (): Promise<
  AxiosResponse<FeatureFlag[]>
> => (await axios.get(baseUrl, httpConfiguration.default)).data;
