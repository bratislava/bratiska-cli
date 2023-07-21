import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from './../types';
import { print_info } from '../helpers';

export function show_label_info(label: string, options: Options) {
  const step = helpers.step(options);
  helpers.line(`(${step}) Showing label info...\n`);
  helpers.spacer_line(`App: `);
  helpers.print_important_info(`${options.deployment}`);
  helpers.spacer_line(`Label: `);

  //check if label contains = sign
  if (label.includes('=')) {
    helpers.print_important_info(`${label}`);
    options.label_key = label.split('=')[0];
    options.label_value = label.split('=')[1];
    options.label = options.label_key + '=' + options.label_value;
  } else {
    throw new Error(
      `Label is in wrong format! It needs to be in a format: key=value like app=super-duper!`,
    );
  }
  helpers.spacer_line(`Recursive: `);
  helpers.print_important_info(`${options.recursive}`);
  if (options.recursive) {
    helpers.print_warning(
      helpers.double_spacer() + 'Please note that recursive will restart pods!',
    );
  }
  helpers.spacer_line(`Resources:\n`);
  if (options.resources === false) {
    helpers.print_warning(
      helpers.double_spacer() +
        'We are using a default list of resources. If you want to specify your own list of resources, please use the --resources flag. Example: --resources deployments,secrets',
    );
    options.resources = [
      'pods',
      'deployments',
      'statefulsets',
      'persistentvolumeclaims',
      'services',
      'endpoints',
      'ingresses',
      'configmaps',
      'sealedsecrets',
      'secrets',
    ];
  } else if (typeof options.resources === 'string') {
    options.resources = options.resources.split(',');
  } else {
    throw new Error(`There was an issue obtaining list of resources!`);
  }
  helpers.spacer_line(helpers.spacer());
  helpers.print_important_info(
    `${options.resources.join('\n' + helpers.double_spacer())}`,
  );
  helpers.spacer_line(`Secrets:\n`);
  if (options.secrets === false) {
    helpers.print_warning(
      helpers.double_spacer() +
        'We are using a default list of secrets. Don`t worry, if a secret is not present in kubernetes, nothing will happen. If you want to specify your own list of secretes, please use the --secrets flag. Example: --secrets database-secret',
    );

    //TODO feel free to add more secrets here. In the future we want to dynamically obtain all secrets
    options.secrets = [
      'tls',
      'database-secret',
      'general-secret',
      'mailgun-secret',
      'azure-secret',
      'internals-secret',
      'meilisearch-secret',
      'plugin-preview-secret',
      'cognito-secret',
      'magproxy-secret',
      'scanner-secret',
      'forms-secret',
      'app-secret',
      'mapbox-secret',
      'msal-secret',
      'ginis-secret',
    ];
  } else if (typeof options.secrets === 'string') {
    options.secrets = options.secrets.split(',');
  } else {
    throw new Error(`There was an issue obtaining list of secrets!`);
  }
  helpers.spacer_line(helpers.spacer());
  helpers.print_important_info(
    `${options.secrets.join('\n' + helpers.double_spacer())}`,
  );

  return options;
}
