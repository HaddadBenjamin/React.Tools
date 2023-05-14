import { AxiosRequestConfig } from 'axios';

export const apiConfiguration = {
  baseUrl: 'http://localhost:3001',
};

export const backOfficeApiConfiguration = {
  baseUrl: 'http://localhost:3001',
};

export const httpConfiguration = {
  default: {
    headers: { 'Content-Type': 'application/json' },
  } as AxiosRequestConfig,
  platform: {
    headers: {
      'Content-Type': 'application/json',
      PLATFORM: 'FR',
    },
  } as AxiosRequestConfig,
};
