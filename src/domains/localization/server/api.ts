// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import axios, { AxiosResponse } from 'axios';
import {
  backOfficeApiConfiguration,
} from '../../../shared/shared.configuration';
import routes from './configuration';

export const baseUrl = `${backOfficeApiConfiguration.baseUrl}${routes.api}`;

export const getLocalizedString = (language : string): Promise<AxiosResponse<string>> => axios.get(baseUrl, {
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': language,
  },
});
