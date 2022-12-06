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
  // let tag_format = "v[0-9]\.[0-9]\.[0-9]*"
  const cmd = `git ls-remote origin --contains "refs\/tags\/${tag_format}" | grep ".*[^}]$" | cut -f 2 | tail -n1 | awk '{gsub(/refs\\/tags\\//,"")}1'`;
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

  helpers.print_if_debug(options, `docker image manifest inspect ${imagetag}`);
  const result = cp.spawnSync('docker', ['manifest', 'inspect', imagetag], {
    encoding: 'utf8',
  });
  helpers.print_if_debug(options, `Res: ${result.stdout.trim()}`);
  helpers.print_if_debug(options, `Err: ${result.stderr}`);
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_login(options: Options) {
  helpers.print_if_debug(options, `docker login ${options.registry}`);
  const result = cp.spawnSync('docker', ['login', options.registry], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_running(options: Options) {
  helpers.print_if_debug(options, `docker running`);
  const result = cp.spawnSync('docker', ['info'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function get_bratiska_cli_git_package_json() {
  const package_url =
    'https://raw.githubusercontent.com/bratislava/bratiska-cli/master/package.json';

  const res = request('GET', package_url);
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

  helpers.print_if_debug(options, cmd);
  execSync(cmd, { encoding: 'utf8' });
}

export function kubect_apply_to_kubernetes(manifest_path: string) {
  helpers.log(chalk.reset(''));
  cp.spawnSync('kubectl', ['apply', `-f=${manifest_path}`], {
    stdio: 'inherit',
  });
}

export function kubectl_deployment_status_stdio(options: Options) {
  helpers.log(chalk.reset(''));
  cp.spawnSync(
    'kubectl',
    [
      'rollout',
      'status',
      'deployment',
      `${options.deployment}-app`,
      `--namespace=${options.namespace}`,
      `--timeout=${options.kubectl_timeout}s`,
    ],
    {
      stdio: 'inherit',
    },
  );
}

export function kubectl_deployment_status_utf8(options: Options) {
  helpers.log(chalk.reset(''));
  const result = cp.spawnSync(
    'kubectl',
    [
      'rollout',
      'status',
      'deployment',
      `${options.deployment}-app`,
      `--namespace=${options.namespace}`,
      `--timeout=${options.kubectl_timeout}s`,
    ],
    {
      encoding: 'utf8',
    },
  );

  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_deployment_events(options: Options) {
  helpers.log(chalk.reset(''));

  const cmd = `kubectl get events --namespace=${options.namespace} --sort-by='.metadata.creationTimestamp' | grep -i ${options.deployment}-app`;
  helpers.print_if_debug(options, `kubectl deployment logs: ${cmd}`);

  execSync(cmd, {
    stdio: 'inherit',
  });
}

export function kubectl_deployment_logs(options: Options) {
  helpers.log(chalk.reset(''));
  cp.spawnSync(
    'kubectl',
    [
      'logs',
      '-f',
      `deployment/${options.deployment}-app`,
      `--namespace=${options.namespace}`,
    ],
    {
      stdio: 'inherit',
    },
  );
}
