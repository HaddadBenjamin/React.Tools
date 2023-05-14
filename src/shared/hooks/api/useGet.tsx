import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import HttpStatus from '../../constants/httpStatus';

interface IOnUseGetSuccessParameters<TData, TOnFinishGetParameters = void> {
  data : TData,
  parameters?: TOnFinishGetParameters,
  status?: HttpStatus
}

interface IOnUseGetErrorParameters<TOnFinishGetParameters = void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error : any,
  parameters?: TOnFinishGetParameters,
  status?: HttpStatus
}

export interface IUseGetParameters<TData, TOnFinishGetParameters = void>
{
  url?: string,
  config?: AxiosRequestConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies? : any[],
  onSuccess? : (parameters : IOnUseGetSuccessParameters<TData, TOnFinishGetParameters>) => void,
  onError? : (parameters : IOnUseGetErrorParameters<TOnFinishGetParameters>) => void,
  onFinish?: () => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  onBeforeGet? : (parameters?: TOnFinishGetParameters) => void,
  httpClient? : AxiosInstance,
  enabled?: boolean
}

interface IUseGetResponse<TData, TOnFinishGetParameters = void>
{
  // eslint-disable-next-line
  data? : TData,
  isLoading : boolean,
  isFetched: boolean,
  // eslint-disable-next-line
  error?: any,
  isNotFound: boolean,
  status?: HttpStatus,
  refetch : (refetchParameters? : IRefetchParameters<TOnFinishGetParameters>) => IOnUseGetSuccessParameters<TData, TOnFinishGetParameters> | undefined
}

interface IRefetchParameters<TData, TOnFinishGetParameters = void> {
  refetchUrl? : string,
  refetchConfig? : AxiosRequestConfig
  callbacksParameters?: TOnFinishGetParameters // paramètres applicable à onSuccess, onError, onBeforeGet
  onSuccess? : (parameters : IOnUseGetSuccessParameters<TData, TOnFinishGetParameters>) => void,
  onError? : (parameters : IOnUseGetErrorParameters<TOnFinishGetParameters>) => void,
  onFinish?: () => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  onBeforeGet? : (parameters?: TOnFinishGetParameters) => void,
}

const useGet = <TData, TOnFinishGetParameters = void>(
  {
    url,
    config,
    dependencies = [],
    onSuccess,
    onError,
    onFinish,
    onBeforeGet,
    httpClient,
    enabled = true,
  } : IUseGetParameters<TData, TOnFinishGetParameters>,
) => {
  const [response, setResponse] = useState<IUseGetResponse<TData, TOnFinishGetParameters>>({
    isLoading: false,
    isFetched: false,
    isNotFound: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    refetch: () => undefined,
  });

  // eslint-disable-next-line consistent-return
  const refetch = async (refetchParameters? : IRefetchParameters<TData, TOnFinishGetParameters>): Promise<IOnUseGetSuccessParameters<TData, TOnFinishGetParameters> | undefined> => {
    try {
      onBeforeGet?.(refetchParameters?.callbacksParameters);
      refetchParameters?.onBeforeGet?.(refetchParameters?.callbacksParameters);

      setResponse({
        ...response,
        error: undefined,
        isLoading: true,
      });

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { data, status } = await (httpClient ?? axios).get((refetchParameters?.refetchUrl ?? url)!, refetchParameters?.refetchConfig ?? config);

      onSuccess?.({ data, parameters: refetchParameters?.callbacksParameters, status });
      refetchParameters?.onSuccess?.({ data, parameters: refetchParameters?.callbacksParameters, status });

      setResponse({
        ...response,
        isLoading: false,
        status,
        isNotFound: false,
        data,
        isFetched: true,
      });

      onFinish?.();
      refetchParameters?.onFinish?.();

      return {
        data,
        status,
        parameters: refetchParameters?.callbacksParameters,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      const status = error?.response?.status;

      onError?.({ error, parameters: refetchParameters?.callbacksParameters, status });
      refetchParameters?.onError?.({ error, parameters: refetchParameters?.callbacksParameters, status });

      setResponse({
        ...response,
        isLoading: false,
        isNotFound: status === HttpStatus.NOT_FOUND,
        status,
        data: undefined,
        error,
      });
    } finally {
      onFinish?.();
      refetchParameters?.onFinish?.();
    }
  };

  useEffect(() => {
    if (enabled) refetch();
    // eslint-disable-next-line
  }, [enabled, ...dependencies]);

  return { ...response, refetch };
};

export default useGet;
