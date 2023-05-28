export interface Configuration {
  api: ApiConfiguration;
  backOfficeApi: BackOfficeApiConfiguration;
}

export interface ApiConfiguration {
  baseUrl: string;
  fakeSecret: string;
}

export interface BackOfficeApiConfiguration {
  baseUrl: string;
  mergeConfigurationKey: string;
}
