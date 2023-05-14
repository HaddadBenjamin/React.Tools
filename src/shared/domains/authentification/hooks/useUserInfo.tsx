import { GET_USER_INFO_ENDPOINT } from '../authentification.constant';
import useGet from '../../../hooks/api/useGet';
import authenticatedApiClient from '../authentification.api-client';
import { IGetUserInfoResponse } from '../authentification.model';

const useUserInfo = (enabled = true) => {
  const { data: userInfo } = useGet<IGetUserInfoResponse>({
    url: GET_USER_INFO_ENDPOINT,
    httpClient: authenticatedApiClient,
    enabled,
  });

  return userInfo;
};

export default useUserInfo;
