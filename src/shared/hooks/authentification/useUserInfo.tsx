import { IGetUserInfoResponse } from '../../domains/authentification/authentification.model';
import useGet from '../api/useGet';
import authenticatedApiClient from '../../domains/authentification/authentification.api-client';
import { GET_USER_INFO_ENDPOINT } from '../../domains/authentification/authentification.constant';

const useUserInfo = (enabled = true) : IGetUserInfoResponse | undefined => {
  const { data: userInfo } = useGet<IGetUserInfoResponse>({
    url: GET_USER_INFO_ENDPOINT,
    httpClient: authenticatedApiClient,
    enabled,
  });

  return userInfo;
};

export default useUserInfo;
