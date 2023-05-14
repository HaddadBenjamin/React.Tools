import React from 'react';
import useConfiguration from '../../shared/domains/configuration/hooks/useConfiguration';

const ConfigurationSample = () => {
  const configuration = useConfiguration();

  return (
    <>
      <h2>Configuration par variables d&apos;environnements</h2>
      <div>{JSON.stringify(configuration)}</div>
    </>
  );
};

export default ConfigurationSample;
