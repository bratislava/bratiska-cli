"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Common = void 0;
const show_version_1 = require("./common/show_version");
const show_options_1 = require("./common/show_options");
const check_kubernetes_cluster_1 = require("./common/check_kubernetes_cluster");
const check_kubernetes_enviroment_1 = require("./common/check_kubernetes_enviroment");
const get_git_user_info_1 = require("./common/get_git_user_info");
const get_git_commits_1 = require("./common/get_git_commits");
const check_git_repo_name_1 = require("./common/check_git_repo_name");
const get_git_branch_1 = require("./common/get_git_branch");
const get_git_current_branch_1 = require("./common/get_git_current_branch");
const get_git_fetch_1 = require("./common/get_git_fetch");
const get_git_pull_1 = require("./common/get_git_pull");
const get_git_status_1 = require("./common/get_git_status");
const check_git_merge_status_1 = require("./common/check_git_merge_status");
const get_git_tags_1 = require("./common/get_git_tags");

class Common {
  show_options(options) {
    (0, show_options_1.show_options)(options);
  }

  show_version(options, version) {
    (0, show_version_1.show_version)(options, version);
  }

  get_git_tags(options) {
    (0, get_git_tags_1.get_git_tags)(options);
  }

  check_git_merge_status(options) {
    (0, check_git_merge_status_1.check_git_merge_status)(options);
  }

  get_git_status(options) {
    (0, get_git_status_1.get_git_status)(options);
  }

  get_git_fetch(options) {
    (0, get_git_fetch_1.get_git_fetch)(options);
  }

  get_git_pull(options) {
    (0, get_git_pull_1.get_git_pull)(options);
  }

  get_git_branch(options) {
    (0, get_git_branch_1.get_git_branch)(options);
  }

  get_git_current_branch(options) {
    (0, get_git_current_branch_1.get_git_current_branch)(options);
  }

  check_git_repo_name(options) {
    (0, check_git_repo_name_1.check_git_repo_name)(options);
  }

  get_git_commits(options) {
    (0, get_git_commits_1.get_git_commits)(options);
  }

  get_git_user_info(options) {
    (0, get_git_user_info_1.get_git_user_info)(options);
  }

  check_kubernetes_cluster(options) {
    (0, check_kubernetes_cluster_1.check_kubernetes_cluster)(options);
  }

  check_kubernetes_enviroment(options) {
    (0, check_kubernetes_enviroment_1.check_kubernetes_enviroment)(options);
  }
}
exports.Common = Common;
