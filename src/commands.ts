import cp, { execSync } from 'child_process';
import * as helpers from './helpers';
import chalk from 'chalk';
import request from 'sync-request';
import { Bash, Options } from './types';

export function pwd(): string {
  let pwd = execSync('pwd', {
    encoding: 'utf8',
  });

  pwd = pwd.trim();
  return pwd.replace(/\s/g, '\\ ');
}

export function cd(path: string): string {
  const cd = execSync(`cd ${path}`, {
    encoding: 'utf8',
  });
  return cd.trim();
}

export function git_user_name(): Bash {
  const result = cp.spawnSync('git', ['config', 'user.name'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_user_email(): Bash {
  const result = cp.spawnSync('git', ['config', 'user.email'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_current_branch(): Bash {
  const result = cp.spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_branch_from_commit(commit: string): Bash {
  const result = cp.spawnSync(
    'git',
    [
      'branch',
      '--no-color',
      '--list',
      '--format',
      '"%(refname:lstrip=2)"',
      '--no-column',
      `--contains`,
      commit,
    ],
    {
      encoding: 'utf8',
    },
  );
  let res = result.stdout.trim();
  res = res.replace(/"/g, '');
  return { res: res, err: result.stderr };
}

export function git_repository_url(): Bash {
  const result = cp.spawnSync('git', ['config', '--get', 'remote.origin.url'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_fetch_origin(): Bash {
  const result = cp.spawnSync('git', ['fetch', 'origin'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_pull_origin(): Bash {
  const result = cp.spawnSync('git', ['pull', 'origin'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_current_commit(): Bash {
  const result = cp.spawnSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_current_commit_short(): Bash {
  const result = cp.spawnSync('git', ['rev-parse', '--short', 'HEAD'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_commit_tag(commit: string): Bash {
  const result = cp.spawnSync('git', ['tag', '--contains', commit], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_add_tag(tag: string): Bash {
  const result = cp.spawnSync('git', ['tag', '-a', tag, '-m', tag], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_delete_tag(tag: string): Bash {
  const result = cp.spawnSync('git', ['tag', '-d', tag], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_delete_tag_origin(tag: string): Bash {
  const result = cp.spawnSync('git', ['push', '--delete', 'origin', tag], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_push_tag(tag: string): Bash {
  const result = cp.spawnSync('git', ['push', 'origin', tag], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_origin_commit_tag(tag: string): Bash {
  const result = cp.spawnSync(
    'git',
    ['ls-remote', 'origin', '--contains', `"refs/tags/${tag}"`],
    {
      encoding: 'utf8',
    },
  );
  console.log(`"refs/tags/${tag}"`);
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_get_last_remote_tags(
  options: Options,
  tag_format: string,
): string {
  helpers.print_if_debug(options, `tag_format: ${tag_format}`);

  const cmd = `git ls-remote origin --contains "refs\/tags\/${tag_format}" | grep ".*[^}]$" | cut -f 2 | sort -V | tail -n1 | awk '{gsub(/refs\\/tags\\//,"")}1'`;
  helpers.print_if_debug(options, cmd);

  const last_tag = execSync(cmd, { encoding: 'utf8' });
  return last_tag.trim();
}

export function git_list_of_brnaches_with_refs(refs: string): Bash {
  const result = cp.spawnSync(
    'git',
    ['branch', '-r', '--contains', `${refs}`],
    {
      encoding: 'utf8',
    },
  );
  let res = result.stdout.trim();
  res = res.replace(/"/g, '');
  return { res: res, err: result.stderr };
}

export function git_current_status(options: Options): Bash {
  const result = cp.spawnSync('git', ['status', '-s'], {
    encoding: 'utf8',
  });
  helpers.print_if_debug(options, 'Untracked changes: ' + result.stdout.trim());
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_repo_name(options: Options): string {
  const cmd = 'basename `git rev-parse --show-toplevel`';
  helpers.print_if_debug(options, cmd);
  const name = execSync(cmd, { encoding: 'utf8' });
  return name.trim();
}

export function git_check_commit_remote(commit: string, branch?: string) {
  if (typeof branch === 'undefined') {
    branch = 'master';
  }

  //check if branch contains origin already
  if (branch.indexOf('origin/') === -1) {
    branch = `origin/${branch}`;
  }

  const result = cp.spawnSync(
    'git',
    ['branch', `--contains=${commit}`, `--points-at=${branch}`],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_cluster(): Bash {
  const result = cp.spawnSync('kubectl', ['config', 'current-context'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_pods_admin(options: Options): Bash {
  const result = cp.spawnSync(
    'kubectl',
    ['get', 'pods', '-n', 'kube-system', '--request-timeout=3'],
    {
      encoding: 'utf8',
    },
  );
  helpers.print_if_debug(
    options,
    `kubectl get pods admin: ${result.stdout}\n ${result.stderr}`,
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_pods(options: Options): Bash {
  const result = cp.spawnSync(
    'kubectl',
    ['get', 'pods', '-n', <string>options.namespace, '--request-timeout=3'],
    {
      encoding: 'utf8',
    },
  );

  helpers.print_if_debug(
    options,
    `kubectl get pods: ${result.stdout}\n ${result.stderr}`,
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_service_account(options: Options): Bash {
  const result = cp.spawnSync(
    'kubectl',
    [
      'get',
      'serviceAccounts',
      'default',
      '-n',
      <string>options.namespace,
      '--request-timeout=3',
    ],
    {
      encoding: 'utf8',
    },
  );
  /*
  helpers.print_if_debug(
    options,
    `kubectl get serviceAccounts default -n ${<string>(
      options.namespace
    )} --request-timeout=3: ${result.stdout}\n ${result.stderr}`,
  );
 */
  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_pull_secret(options: Options): Bash {
  const result = cp.spawnSync(
    'kubectl',
    [
      'get',
      'secret',
      helpers.pull_secret_name(options),
      `--namespace=${options.namespace}`,
    ],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker(): Bash {
  const result = cp.spawnSync('docker', ['-v'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_build(options: Options) {
  const cmd = `docker buildx build --platform=linux/amd64 --tag=${helpers.image_tag(
    options,
  )} --target=prod . `;
  helpers.print_if_debug(options, `docker build command: ${cmd}`);

  execSync(cmd, {
    stdio: 'inherit',
  });
}

export function docker_tag(sourcetag: string, targettag: string) {
  const result = cp.spawnSync('docker', ['tag', sourcetag, targettag], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_check_image(options: Options) {
  const result = cp.spawnSync(
    'docker',
    ['image', `inspect`, helpers.image_tag(options)],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_delete_image(options: Options) {
  const result = cp.spawnSync(
    'docker',
    ['image', `rm`, helpers.image_tag(options)],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_push_image(options: Options, tag: string) {
  cp.spawnSync('docker', ['push', tag], {
    stdio: 'inherit',
  });
}

export function docker_check_image_in_registry(
  options: Options,
  imagetag: string,
) {
  if (options.image) {
    imagetag = <string>options.image;
  }

  const result = cp.spawnSync('docker', ['manifest', 'inspect', imagetag], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_login(options: Options) {
  const result = cp.spawnSync('docker', ['login', options.registry], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_running(options: Options) {
  const result = cp.spawnSync('docker', ['info'], {
    encoding: 'utf8',
  });

  return {
    res: result.stdout.trim(),
    err: result.stderr,
    status: result.status,
  };
}

export function get_bratiska_cli_git_package_json() {
  const package_url =
    'https://raw.githubusercontent.com/bratislava/bratiska-cli/master/package.json';

  const res = request('GET', package_url);
  if (res.statusCode !== 200) {
    throw new Error(
      `We had problems with internet connection to bratiska-cli github repo. Status code: ${res.statusCode}. Error getting package.json from ${package_url}. `,
    );
  }
  return res.getBody('utf8');
}

export function kustomize_build_manifest(options: Options) {
  let path = helpers.kustomize_folder_path(options);

  if (options.kustomize) {
    path = <string>options.kustomize;
  }

  const cmd = `kustomize build --load-restrictor LoadRestrictionsNone ${path} | envsubst > ${helpers.manifest(
    options,
  )}`;

  //helpers.print_if_debug(options, cmd);
  execSync(cmd, { encoding: 'utf8' });
}

export function kubect_apply_to_kubernetes(manifest_path: string) {
  helpers.log(chalk.reset(''));

  const result = cp.spawnSync('kubectl', ['apply', `-f=${manifest_path}`], {
    encoding: 'utf8',
  });

  return { res: result.stdout, err: result.stderr };
}

export function kubectl_deploy_status_stdio(kind: string, options: Options) {
  helpers.log(chalk.reset(''));
  cp.spawnSync(
    'kubectl',
    [
      'rollout',
      'status',
      kind,
      `${options.deployment}-${helpers.kind_to_app(kind)}`,
      `--namespace=${options.namespace}`,
      `--timeout=${options.kubectl_timeout}s`,
    ],
    {
      stdio: 'inherit',
    },
  );
}

export function kubectl_deploy_status_utf8(kind: string, options: Options) {
  helpers.log(chalk.reset(''));
  const result = cp.spawnSync(
    'kubectl',
    [
      'rollout',
      'status',
      kind,
      `${options.deployment}-${helpers.kind_to_app(kind)}`,
      `--namespace=${options.namespace}`,
      `--timeout=${options.kubectl_timeout}s`,
    ],
    {
      encoding: 'utf8',
    },
  );

  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_deploy_events(kind: string, options: Options) {
  helpers.log(chalk.reset(''));

  const cmd = `kubectl get events --namespace=${
    options.namespace
  } --sort-by='.metadata.creationTimestamp' | grep -i ${
    options.deployment
  }-${helpers.kind_to_app(kind)}`;
  helpers.print_if_debug(options, `kubectl deploy logs: ${cmd}`);

  execSync(cmd, {
    stdio: 'inherit',
  });
}

export function kubect_get_deployment(options: Options): Bash {
  const result = cp.spawnSync(
    'kubectl',
    [
      'get',
      'deployment',
      `${options.deployment}-app`,
      `-n=${options.namespace}`,
    ],
    {
      encoding: 'utf8',
    },
  );

  return { res: result.stdout, err: result.stderr };
}

export function kubectl_label_resources(options: Options) {
  helpers.log(chalk.reset(''));

  //check if options.resources is an array
  if (!Array.isArray(options.resources)) {
    throw new Error(
      `options.resources is not an array. It is ${typeof options.resources}`,
    );
  }
  const resources_imp = options.resources.join(',');

  let dryrun = '';
  if (options.dryrun) {
    dryrun = '--dry-run=client';
  }
  const cmd = `kubectl label ${resources_imp} -l "app=${options.deployment}" -n=${options.namespace} ${options.label} app=${options.deployment} --overwrite ${dryrun}`;
  helpers.print_if_debug(options, `label command: ${cmd}`);

  execSync(cmd, {
    stdio: 'inherit',
  });
}

export function kubectl_label_secrets(options: Options) {
  helpers.log(chalk.reset(''));

  //check if options.resources is an array
  if (!Array.isArray(options.secrets)) {
    throw new Error(
      `options.secrets is not an array. It is ${typeof options.secrets}`,
    );
  }
  let dryrun = '';
  if (options.dryrun) {
    dryrun = '--dry-run=client';
  }

  //loop through secrets and label them
  options.secrets.forEach((secret) => {
    try {
      const cmd = `kubectl label secrets ${options.deployment}-${secret} -n=${options.namespace} ${options.label} app=${options.deployment} --overwrite ${dryrun}`;
      helpers.print_if_debug(options, `label command: ${cmd}`);

      execSync(cmd, {
        stdio: 'inherit',
      });
    } catch (error) {
      helpers.print_warning(`secret ${secret} does not exist. Skipping...`);
    }
  });
}

export function envsubst(options: Options): Bash {
  const cmd = `envsubst`;
  const result = cp.spawnSync(cmd, {
    encoding: 'utf8',
  });

  return { res: result.stdout, err: result.stderr };
}

export function kustomize(options: Options): Bash {
  const cmd = `kustomize`;
  const result = cp.spawnSync(cmd, {
    encoding: 'utf8',
  });

  return { res: result.stdout, err: result.stderr };
}

export function kubectl(options: Options): Bash {
  const cmd = `kubectl`;
  const result = cp.spawnSync(cmd, {
    encoding: 'utf8',
  });

  return { res: result.stdout, err: result.stderr };
}

export function git(options: Options): Bash {
  const cmd = `git`;
  const result = cp.spawnSync(cmd, {
    encoding: 'utf8',
  });

  return { res: result.stdout, err: result.stderr };
}

export function kubectl_get_latest_pod(kind: string, options: Options) {
  const result = cp.spawnSync(
    'kubectl',
    [
      'get',
      'pods',
      '-l',
      `app=${options.deployment},service=${helpers.kind_to_app(kind)}`,
      `--namespace=${options.namespace}`,
      `--sort-by=.metadata.creationTimestamp`,
      `-o`,
      `jsonpath='{.items[-1:].metadata.name}'`,
    ],
    {
      encoding: 'utf8',
    },
  );

  return { res: result.stdout, err: result.stderr };
}

export function kubectl_get_log_for_pod(pod: string, options: Options) {
  const cmd = `kubectl logs --all-containers --namespace=${options.namespace} pod/${pod} -f --request-timeout=30s`;
  helpers.log(chalk.white('\n'));
  execSync(cmd, {
    stdio: 'inherit',
  });
}
