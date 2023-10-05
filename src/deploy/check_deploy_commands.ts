import * as helpers from '../helpers';
import * as commands from '../commands';
import { Options } from '../types';

export function check_deploy_commands(options: Options) {
  helpers.line(
    `(${helpers.step(options)}) Checking required deploy commands... \n`,
  );

  const git_bash = commands.git(options);
  if (git_bash.err !== '') {
    helpers.print_if_debug_bash(options, 'git', git_bash);
    throw new Error(
      `git command is not available on your computer! Please run installation command: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git`,
    );
  } else {
    helpers.spacer_line(`git:`);
    helpers.print_important_info(`       installed`);
  }

  const envsubst_bash = commands.envsubst(options);
  if (envsubst_bash.err !== '') {
    helpers.print_if_debug_bash(options, 'envsubst', envsubst_bash);
    throw new Error(
      `envsubst command is not available on your computer! Please run installation command: 'brew install gettext'`,
    );
  } else {
    helpers.spacer_line(`envsubst:`);
    helpers.print_important_info(`  installed`);
  }

  const kustomize_bash = commands.kustomize(options);
  if (kustomize_bash.err !== '') {
    helpers.print_if_debug_bash(options, 'kustomize', kustomize_bash);
    throw new Error(
      `kustomize command is not available on your computer! Please check installation instructions: https://kubectl.docs.kubernetes.io/installation/kustomize/`,
    );
  } else {
    helpers.spacer_line(`kustomize:`);
    helpers.print_important_info(` installed`);
  }

  const kubectl_bash = commands.kubectl(options);
  if (kubectl_bash.err !== '') {
    helpers.print_if_debug_bash(options, 'kubectl', kubectl_bash);
    throw new Error(
      `kubectl command is not available on your computer! Please check installation instructions: https://kubernetes.io/docs/tasks/tools/`,
    );
  } else {
    helpers.spacer_line(`kubectl: `);
    helpers.print_important_info(`  installed`);
  }

  const docker_bash = commands.docker();
  if (docker_bash.err !== '') {
    helpers.print_if_debug_bash(options, 'docker', docker_bash);
    throw new Error(
      `docker command is not available on your computer! Please check installation instructions: https://docs.docker.com/engine/install`,
    );
  } else {
    helpers.spacer_line(`docker: `);
    helpers.print_important_info(`   installed`);
  }
}
