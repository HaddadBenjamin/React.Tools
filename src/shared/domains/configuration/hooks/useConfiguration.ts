import { deepMerge } from '../../../utilities/type/any/deepMerge';
import { Configuration } from '../configuration.model';

// ITS UNSAFE DONT DO THAT
let configuration: Configuration | undefined;
export default (): Configuration => {
  if (!configuration) {
    configuration = deepMerge(
      JSON.parse(process.env.REACT_APP_CONFIGURATION_BASE as string),
      JSON.parse(process.env.REACT_APP_CONFIGURATION_CURRENT as string),
    ) as Configuration;
  }

  return configuration;
};
