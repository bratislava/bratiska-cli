import cp, { execSync } from 'child_process';
import * as helpers from './helpers';
import chalk from 'chalk';

export interface Bash {
  res: string;
  err: string;
}

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

export function git_current_branch(): Bash {
  const result = cp.spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
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

export function git_current_commit(): Bash {
  const result = cp.spawnSync('git', ['rev-parse', 'HEAD'], {
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

export function git_origin_commit_tag(tag: string): Bash {
  const result = cp.spawnSync(
    'git',
    ['ls-remote', 'origin', '--contains', `refs/tags/${tag}`],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_current_status(options: any): Bash {
  const result = cp.spawnSync('git', ['status', '-s'], {
    encoding: 'utf8',
  });
  helpers.print_if_debug(options, 'Untracked changes: ' + result.stdout.trim());
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_repo_name(options: any): string {
  const cmd = 'basename `git rev-parse --show-toplevel`';
  helpers.print_if_debug(options, cmd);
  const name = execSync(cmd, { encoding: 'utf8' });
  return name.trim();
}

export function git_check_commit_remote(commit: string, branch?: string) {
  if (typeof branch === 'undefined') {
    branch = 'master';
  }

  const result = cp.spawnSync(
    'git',
    ['branch', `--contains=${commit}`, `--points-at=origin/${branch}`],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function git_user(): Bash {
  const result = cp.spawnSync('git', ['config', 'user.email'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_cluster(): Bash {
  const result = cp.spawnSync('kubectl', ['config', 'current-context'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function kubectl_pods_admin(options: any): Bash {
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

export function kubectl_pods(options: any): Bash {
  const result = cp.spawnSync(
    'kubectl',
    ['get', 'pods', '-n', options.namespace, '--request-timeout=3'],
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

export function kubectl_pull_secret(options: any): Bash {
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

export function docker_build(options: any) {
  const cmd = `docker buildx build --platform=linux/amd64 --tag=${helpers.image_tag(
    options,
  )} --target=prod . `;

  execSync(cmd, {
    stdio: 'inherit',
  });

  helpers.print_if_debug(options, cmd);
}

export function docker_check_image(options: any) {
  const result = cp.spawnSync(
    'docker',
    ['image', `inspect`, helpers.image_tag(options)],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_delete_image(options: any) {
  const result = cp.spawnSync(
    'docker',
    ['image', `rm`, helpers.image_tag(options)],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_push_image(options: any) {
  cp.spawnSync('docker', ['push', helpers.image_tag(options)], {
    stdio: 'inherit',
  });
}

export function docker_check_image_in_registry(options: any) {
  helpers.print_if_debug(
    options,
    `docker manifest inspect ${helpers.image_tag(options)}`,
  );
  const result = cp.spawnSync(
    'docker',
    ['manifest', 'inspect', helpers.image_tag(options)],
    {
      encoding: 'utf8',
    },
  );
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_login(options: any) {
  helpers.print_if_debug(options, `docker login ${options.registry}`);
  const result = cp.spawnSync('docker', ['login', options.registry], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function docker_running(options: any) {
  helpers.print_if_debug(options, `docker running`);
  const result = cp.spawnSync('docker', ['info'], {
    encoding: 'utf8',
  });
  return { res: result.stdout.trim(), err: result.stderr };
}

export function kustomize_build_manifest(options: any) {
  let path = helpers.kustomize_folder_path(options);

  if (options.kustomize) {
    path = options.kustomize;
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

export function kubectl_deployment_status(options: any) {
  helpers.log(chalk.reset(''));
  cp.spawnSync(
    'kubectl',
    [
      'rollout',
      'status',
      'deployment',
      `${options.deployment}-app`,
      `--namespace=${options.namespace}`,
    ],
    {
      stdio: 'inherit',
    },
  );
}
