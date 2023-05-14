/* eslint-disable no-tabs, no-mixed-spaces-and-tabs */
import React, { ReactElement, useEffect } from 'react';
import useGet, { IUseGetParameters } from '../../../hooks/api/useGet';
import HttpStatus from '../../../constants/httpStatus';

interface Props<TData, TOnFinishGetParameters = void> extends IUseGetParameters<TData, TOnFinishGetParameters>
{
	successRender?: (data : TData) => ReactElement,
	emptyComponent?: ReactElement,
	loadingComponent?: ReactElement,
	errorComponent?: ReactElement,
	onDataChange?: (data?: TData) => void,
	onLoadingChange?: (loading: boolean) => void,
	onErrorChange?: (error: boolean) => void
	onStatusChange?: (status: HttpStatus | undefined) => void
}

// Un wrappeur sur le useGet qui permet d'affiche différent composant en fonction de s'il y a une donnée, si il y a une erreur, si ça charge ou si il n'y a pas de données.
const Get = <TData, TOnFinishGetParameters = void>(props: Props<TData, TOnFinishGetParameters>) => {
  const {
    data,
    isLoading,
    error,
    status,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } = useGet<TData>(props);

  const {
    successRender,
    loadingComponent,
    emptyComponent,
    errorComponent,
    onDataChange,
    onLoadingChange,
    onErrorChange,
    onStatusChange,
  } = props;

  useEffect(() => { onDataChange?.(data); }, [data]);
  useEffect(() => { onLoadingChange?.(isLoading); }, [isLoading]);
  useEffect(() => { onErrorChange?.(error); }, [error]);
  useEffect(() => { onStatusChange?.(status); }, [status]);

  const isEmpty = data && Array.isArray(data) && data?.length === 0;

  return (
    <>
      { isEmpty && emptyComponent }
      { data && !isEmpty && successRender?.(data) }
      { isLoading && loadingComponent }
      { error && errorComponent }
    </>
  );
};

export default Get;
