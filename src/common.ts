import { Options } from './types';

import { show_version } from './common/show_version';
import { show_options } from './common/show_options';
import { check_kubernetes_cluster } from './common/check_kubernetes_cluster';
import { check_kubernetes_enviroment } from './common/check_kubernetes_enviroment';
import { get_git_user_info } from './common/get_git_user_info';
import { get_git_commits } from './common/get_git_commits';
import { check_git_repo_name } from './common/check_git_repo_name';
import { get_git_branch } from './common/get_git_branch';
import { get_git_current_branch } from './common/get_git_current_branch';
import { get_git_fetch } from './common/get_git_fetch';
import { get_git_pull } from './common/get_git_pull';
import { get_git_status } from './common/get_git_status';
import { check_git_merge_status } from './common/check_git_merge_status';
import { get_git_tags } from './common/get_git_tags';

export class Common {
  show_options(env: string, options: Options) {
    show_options(env, options);
  }

  show_version(options: Options, version: string) {
    show_version(options, version);
  }

  get_git_tags(options: Options) {
    get_git_tags(options);
  }

  check_git_merge_status(options: Options) {
    check_git_merge_status(options);
  }

  get_git_status(options: Options) {
    get_git_status(options);
  }

  get_git_fetch(options: Options) {
    get_git_fetch(options);
  }

  get_git_pull(options: Options) {
    get_git_pull(options);
  }

  get_git_branch(options: Options) {
    get_git_branch(options);
  }

  get_git_current_branch(options: Options) {
    get_git_current_branch(options);
  }

  check_git_repo_name(options: Options) {
    check_git_repo_name(options);
  }

  get_git_commits(options: Options) {
    get_git_commits(options);
  }

  get_git_user_info(options: Options) {
    get_git_user_info(options);
  }

  check_kubernetes_cluster(options: Options) {
    check_kubernetes_cluster(options);
  }

  check_kubernetes_enviroment(options: Options) {
    check_kubernetes_enviroment(options);
  }
}
