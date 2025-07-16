type QueriesParameters = Record<string, string | null | undefined>;

const isSSR = (): boolean => typeof window === 'undefined';

export default class UrlHelper {
  // From URL
  static getUrl = (): string | undefined =>
    isSSR() ? undefined : window.location.href;

  static containsSegmentFromUrl = (segment: string): boolean =>
    isSSR() ? false : window.location.pathname.split('/').includes(segment);

  static getQueriesParametersFromUrl = (options?: {
    whitelist?: string[];
    blacklist?: string[];
  }): QueriesParameters => {
    if (isSSR()) return {};

    const params = new URLSearchParams(window.location.search);
    const entries = Array.from(params.entries());
    const { whitelist, blacklist } = options ?? {};

    return Object.fromEntries(
      entries.filter(([key]) => {
        const isAllowed = !whitelist || whitelist.includes(key);
        const isBlocked = blacklist?.includes(key) ?? false;
        return isAllowed && !isBlocked;
      })
    );
  };

  static getQueryParameterValueFromUrl = (
    queryParameter: string
  ): string | undefined =>
    isSSR()
      ? undefined
      : new URLSearchParams(window.location.search).get(queryParameter) ?? null;

  static hasQueryParameterValueFromUrl = (queryParameter: string): boolean =>
    isSSR()
      ? false
      : UrlHelper.getQueryParameterValueFromUrl(queryParameter) != null;

  static isQueryParameterHasValueFromUrl = (
    queryParameter: string,
    value: string
  ): boolean =>
    isSSR()
      ? false
      : UrlHelper.getQueryParameterValueFromUrl(queryParameter) === value;

  static addOrReplaceQueriesParametersFromUrl(
    queryParams: QueriesParameters,
    overrideUrl = false
  ): string | undefined {
    if (isSSR()) return undefined;

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    if (overrideUrl) searchParams.forEach((_, key) => searchParams.delete(key));

    for (const [key, value] of Object.entries(queryParams)) {
      if (value == null) searchParams.delete(key);
      else searchParams.set(key, value);
    }

    url.search = searchParams.toString();
    return url.toString();
  }

  static removeQueriesParametersFromUrl(
    queryParams: QueriesParameters,
    overrideUrl?: boolean
  ): string | undefined {
    if (isSSR()) return undefined;

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    if (overrideUrl) {
      const keysToKeep = new Set(Object.keys(queryParams));
      searchParams.forEach((_, key) => {
        if (!keysToKeep.has(key)) searchParams.delete(key);
      });
    } else {
      for (const key of Object.keys(queryParams)) {
        searchParams.delete(key);
      }
    }

    url.search = searchParams.toString();
    return url.toString();
  }

  // From String
  static containsSegmentFromString = (url: string, segment: string): boolean =>
    url
      .split('?')[0]
      .split('/')
      .includes(segment);

  static getQueryParameterValueFromString(
    url: string,
    queryParameter: string
  ): string | undefined {
    const query = url.split('?')[1]?.split('#')[0];
    if (!query) return undefined;

    for (const param of query.split('&')) {
      const [key, value] = param.split('=');
      if (decodeURIComponent(key) === queryParameter) {
        return value !== undefined ? decodeURIComponent(value) : null;
      }
    }

    return null;
  }

  static hasQueryParameterValueFromString(
    url: string,
    queryParameter: string
  ): boolean {
    return (
      UrlHelper.getQueryParameterValueFromString(url, queryParameter) !==
      undefined
    );
  }

  static isQueryParameterHasValueFromString(
    url: string,
    queryParameter: string,
    value: string
  ): boolean {
    const query = url.split('?')[1]?.split('#')[0];
    if (!query) return false;

    return query.split('&').some(param => {
      const [key, val] = param.split('=');
      return (
        decodeURIComponent(key) === queryParameter &&
        decodeURIComponent(val ?? '') === value
      );
    });
  }

  static addOrReplaceQueriesParametersFromString(
    url: string,
    queryParams?: QueriesParameters
  ): string {
    if (!queryParams || Object.keys(queryParams).length === 0) return url;

    const [baseAndQuery, hash] = url.split('#', 2);
    const [base, query] = baseAndQuery.split('?', 2);

    const currentParams: Record<string, string> = {};
    if (query) {
      query.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key)
          currentParams[decodeURIComponent(key)] = value
            ? decodeURIComponent(value)
            : '';
      });
    }

    for (const key in queryParams) {
      const value = queryParams[key];
      if (value == null) delete currentParams[key];
      else currentParams[key] = value;
    }

    const newQuery = Object.entries(currentParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');

    return `${base}${newQuery ? `?${newQuery}` : ''}${hash ? `#${hash}` : ''}`;
  }

  static removeQueriesParametersFromString(
    url: string,
    queryParams?: QueriesParameters
  ): string {
    if (!queryParams || Object.keys(queryParams).length === 0) return url;

    const [baseAndQuery, hash] = url.split('#', 2);
    const [base, query] = baseAndQuery.split('?', 2);

    const currentParams: Record<string, string> = {};
    if (query) {
      query.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key)
          currentParams[decodeURIComponent(key)] = value
            ? decodeURIComponent(value)
            : '';
      });
    }

    for (const key in queryParams) {
      delete currentParams[key];
    }

    const newQuery = Object.entries(currentParams)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');

    return `${base}${newQuery ? `?${newQuery}` : ''}${hash ? `#${hash}` : ''}`;
  }

  static getQueriesParametersFromString(
    url: string,
    options?: {
      whitelist?: string[];
      blacklist?: string[];
    }
  ): QueriesParameters {
    const [, queryAndHash] = url.split('?', 2);
    if (!queryAndHash) return {};

    const [query] = queryAndHash.split('#', 2);
    const { whitelist, blacklist } = options ?? {};
    const result: QueriesParameters = {};

    query.split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (!key) return;

      const decodedKey = decodeURIComponent(key);

      if (whitelist && !whitelist.includes(decodedKey)) return;
      if (blacklist && blacklist.includes(decodedKey)) return;

      result[decodedKey] = value ? decodeURIComponent(value) : '';
    });

    return result;
  }
}
