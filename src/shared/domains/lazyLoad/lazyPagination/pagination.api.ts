import axios from 'axios';
import qs from 'qs';
import { IPaginateResponse } from './pagination.model';
import {
  apiConfiguration,
  httpConfiguration,
} from '../../../shared.configuration';
import routes from '../../../../samples/pagination/lazyPagination/ids.configuration';

export const baseUrl = `${apiConfiguration.baseUrl}${routes.api}`;

export const getPaginateIds = async (
  page: number,
  pageSize: number,
): Promise<IPaginateResponse<number>> => {
  const response = await axios.get(
    `${baseUrl}?${qs.stringify({ page, limit: pageSize })}`,
    httpConfiguration.default,
  );
  const linkHeader = response.headers.link;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const linkNumbers = linkHeader.match(/\d+/g)!;
  const lastPage = Number(linkNumbers[linkNumbers.length - 2]);
  const itemsCount = Number(response.headers['x-total-count']);

  return { items: response.data, lastPage, itemsCount };
};

export const getIds = async (): Promise<number[]> => (await getPaginateIds(1, Number.MAX_SAFE_INTEGER)).items;
