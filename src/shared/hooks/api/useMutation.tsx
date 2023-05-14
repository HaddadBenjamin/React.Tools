import { useEffect, useState } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import HttpStatus from '../../constants/httpStatus';

interface IOnUseMutationSuccessParameters<TData, TOnFinishGetParameters = void> {
  data : TData,
  parameters?: TOnFinishGetParameters,
  status?: HttpStatus
}

interface IOnUseMutationErrorParameters<TOnFinishGetParameters = void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error : any,
  parameters?: TOnFinishGetParameters,
  status?: HttpStatus
}

interface IUseMutationRequest<TData, TOnFinishGetParameters = void>
{
  httpClient? : AxiosInstance,
  config?: AxiosRequestConfig,
  onSuccess? : (parameters: IOnUseMutationSuccessParameters<TData, TOnFinishGetParameters>) => void,
  onError? : (parameters : IOnUseMutationErrorParameters<TOnFinishGetParameters>) => void,
  onFinish?: () => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  onBeforeMutate? : (parameters?: TOnFinishGetParameters) => void,
  mutateOnMount?: boolean
  enabled?: boolean,
}

interface IUseMutationResponse<TData, TOnFinishGetParameters>
{
  mutate : (mutateParameters?: IMutateParameters<TOnFinishGetParameters>) => IOnUseMutationSuccessParameters<TData, TOnFinishGetParameters> | undefined
  data? : TData,
  isCalled: boolean,
  isLoading : boolean,
  // eslint-disable-next-line
  error?: any,
  isNotFound?: boolean,
  status?: HttpStatus,
}

export interface IMutateParameters<TData, TOnFinishGetParameters = void> {
  config?: AxiosRequestConfig,
  url? : string,
  callbacksParameters?: TOnFinishGetParameters // paramètres applicable à onSuccess, onError, onBeforeMutate
  onSuccess? : (parameters: IOnUseMutationSuccessParameters<TData, TOnFinishGetParameters>) => void,
  onError? : (parameters : IOnUseMutationErrorParameters<TOnFinishGetParameters>) => void,
  onFinish?: () => void,
  // Nécéssaire pour réaliser de l'UI optimiste : c’est à dire partir du principe que votre requête va fonctionner et la rollback en cas d’erreur, cela permet de mettre à jour votre UI tout de suite sans devoir à attendre que votre requête se termine. On peut utiliser de l’UI optimiste que dans les cas on peut prévoir à l’avance le résultat de la réponse de succès. C’est également une alternative à ajouter des loadeurs lorsque la requête est entrain de se lancer.
  onBeforeMutate? : (parameters?: TOnFinishGetParameters) => void,

}

const UseMutation = <TData, TOnFinishGetParameters = void>({
  config,
  onSuccess,
  onError,
  onFinish,
  onBeforeMutate,
  httpClient,
  mutateOnMount,
  enabled,
} : IUseMutationRequest<TData, TOnFinishGetParameters>) => {
  const [response, setResponse] = useState<IUseMutationResponse<TData, TOnFinishGetParameters>>({
    // eslint-disable-next-line no-promise-executor-return
    mutate: () => undefined,
    isCalled: false,
    isLoading: false,
  });

  // eslint-disable-next-line consistent-return
  async function mutate(mutateParameters? : IMutateParameters<TData, TOnFinishGetParameters>) : Promise<IOnUseMutationSuccessParameters<TData, TOnFinishGetParameters> | undefined> {
    try {
      onBeforeMutate?.(mutateParameters?.callbacksParameters);
      mutateParameters?.onBeforeMutate?.(mutateParameters?.callbacksParameters);

      setResponse({
        ...response,
        error: undefined,
        isLoading: true,
        isNotFound: false,
        isCalled: false,
      });

      const data = await (httpClient ?? axios).request(
        {
          ...config,
          ...mutateParameters?.config,
          url: mutateParameters?.url ?? mutateParameters?.config?.url ?? config?.url,
        },
      );

      onSuccess?.({ data: data?.data, parameters: mutateParameters?.callbacksParameters, status: data?.status });
      mutateParameters?.onSuccess?.({ data: data?.data, parameters: mutateParameters?.callbacksParameters, status: data?.status });

      setResponse({
        ...response,
        data: data?.data,
        isCalled: true,
        isLoading: false,
        isNotFound: false,
        status: data?.status,
        error: false,
      });

      onFinish?.();
      mutateParameters?.onFinish?.();

      return {
        data: data?.data,
        status: data?.status,
        parameters: mutateParameters?.callbacksParameters,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const status = error?.response?.status;

      onError?.({ error, parameters: mutateParameters?.callbacksParameters, status });
      mutateParameters?.onError?.({ error, parameters: mutateParameters?.callbacksParameters, status });

      setResponse({
        ...response,
        data: undefined,
        isLoading: false,
        isNotFound: status === HttpStatus.NOT_FOUND,
        status,
        error,
      });
    } finally {
      onFinish?.();
      mutateParameters?.onFinish?.();
    }
  }

  useEffect(() => { if (mutateOnMount) mutate(); }, []);
  useEffect(() => { if (enabled) mutate(); }, [enabled]);

  return {
    ...response,
    mutate,
  };
};

export default UseMutation;
