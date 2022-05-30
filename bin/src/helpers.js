'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.initialize_options =
  exports.assign_env_vars =
  exports.map_cluster_to_env =
  exports.check_ports =
  exports.capitalize =
  exports.pull_secret_name =
  exports.manifest_path =
  exports.manifest =
  exports.tag =
  exports.image_tag =
  exports.image =
  exports.message =
  exports.print_line_if_debug =
  exports.print_if_debug =
  exports.print_debug =
  exports.print_info_line =
  exports.print_info =
  exports.print_warning =
  exports.print_important_info_line =
  exports.print_important_info =
  exports.print_command =
  exports.br =
  exports.finished =
  exports.skipping =
  exports.ok =
  exports.line =
  exports.log =
    void 0;
const chalk_1 = __importDefault(require('chalk'));
const pack = __importStar(require('../package.json'));
const crypto_1 = __importDefault(require('crypto'));
const clear_1 = __importDefault(require('clear'));
const figlet_1 = __importDefault(require('figlet'));
exports.log = console.log.bind(console);
function line(content) {
  process.stdout.write('\x1b[37m' + content);
}
exports.line = line;
function ok() {
  (0, exports.log)(chalk_1.default.green(' OK'));
}
exports.ok = ok;
function skipping() {
  (0, exports.log)(chalk_1.default.yellow(' SKIPPING'));
}
exports.skipping = skipping;
function finished() {
  (0, exports.log)(chalk_1.default.green(' FINISHED'));
}
exports.finished = finished;
function br() {
  (0, exports.log)('\n');
}
exports.br = br;
function print_command(cmd) {
  (0, exports.log)(chalk_1.default.yellow(cmd));
}
exports.print_command = print_command;
function print_important_info(cmd) {
  (0, exports.log)(chalk_1.default.green(cmd));
}
exports.print_important_info = print_important_info;
function print_important_info_line(cmd) {
  process.stdout.write(chalk_1.default.green(cmd));
}
exports.print_important_info_line = print_important_info_line;
function print_warning(cmd) {
  (0, exports.log)(chalk_1.default.yellow(cmd));
}
exports.print_warning = print_warning;
function print_info(cmd) {
  (0, exports.log)(chalk_1.default.grey(cmd));
}
exports.print_info = print_info;
function print_info_line(cmd) {
  process.stdout.write(chalk_1.default.grey(cmd));
}
exports.print_info_line = print_info_line;
function print_debug(cmd) {
  process.stdout.write(chalk_1.default.cyan(`\nDEBUG: ${cmd}\n`));
}
exports.print_debug = print_debug;
function print_if_debug(options, cmd) {
  if (options.debug) {
    print_debug(cmd);
  }
}
exports.print_if_debug = print_if_debug;
function print_line_if_debug(options, content) {
  if (options.debug) {
    process.stdout.write('\x1b[37m' + content);
  }
}
exports.print_line_if_debug = print_line_if_debug;
function message(content) {
  (0, exports.log)(chalk_1.default.white(content));
}
exports.message = message;
function image(options) {
  return `${options.registry}/${options.namespace}/${options.deployment}`;
}
exports.image = image;
function image_tag(options) {
  if (options.image) {
    return options.image;
  }
  return `${image(options)}:${tag(options)}`;
}
exports.image_tag = image_tag;
function tag(options) {
  if (options.image) {
    const tmp_split = options.image.split(':');
    return tmp_split[1];
  }
  let untracked = '';
  let branch = '-' + options.branch;
  if (options.untracked) {
    untracked = '-untracked';
  }
  if (options.branch === 'origin/master') {
    branch = '';
  }
  branch = branch.replace(/\//g, '');
  return `bratiska-cli-${options.commit}${branch}${untracked}`;
}
exports.tag = tag;
function manifest(options) {
  return `manifest-${tag(options)}.yaml`;
}
exports.manifest = manifest;
function manifest_path(options) {
  return `${options.pwd}/${manifest(options)}`;
}
exports.manifest_path = manifest_path;
function pull_secret_name(options) {
  return `harbor-secret-${options.env}-${options.namespace}-bratiska-cli`;
}
exports.pull_secret_name = pull_secret_name;
function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
exports.capitalize = capitalize;
function check_ports(options) {
  if (typeof process.env['PORT'] === 'undefined') {
    options.app_port = 3000;
    line(` using default app port `);
    print_important_info_line(`'PORT' = '${options.app_port}'`);
    line(`...`);
  } else {
    options.app_port = process.env['PORT'];
    line(` using app port from env `);
    print_important_info_line(`'PORT' = '${options.app_port}'`);
    line(`...`);
  }
}
exports.check_ports = check_ports;
function map_cluster_to_env(cluster) {
  cluster = cluster.trim();
  if (cluster.trim() === 'tkg-master') {
    throw new Error(
      'Deploying to cluster tkg-master is not supported! Sorry :(',
    );
  }
  const parts = cluster.split('-');
  return parts[2];
}
exports.map_cluster_to_env = map_cluster_to_env;
function assign_env_vars(options) {
  if (options.image) {
    options.repository_uri = 'using_external_image';
    options.commit = 'using_external_image';
  }
  if (!options.repository_uri) {
    throw new Error('Git repository uri cannot be false!');
  }
  if (!options.commit) {
    throw new Error('Git Commit  cannot be false!');
  }
  if (!options.deployment) {
    throw new Error(
      'Deployment name have to be filled! Please use --deployment <deployment_name> for defining deployment name.',
    );
  }
  if (!options.host) {
    throw new Error(
      'Host have to be filled! Please use --host <host> for deployment url host.',
    );
  }
  if (!options.registry) {
    throw new Error(
      'Registry have to be filled! Please use --registry <registry_url>.',
    );
  }
  if (!options.namespace) {
    throw new Error(
      'Namespace have to be filled! Please use --namespace <namespace>.',
    );
  }
  if (image_tag(options) === '//') {
    throw new Error('Image have to be filled! Please use --image <image_tag>.');
  }
  process.env['BUILD_REPOSITORY_URI'] = options.repository_uri;
  process.env['BUILD_REPOSITORY_NAME'] = options.deployment;
  process.env['HOSTNAME'] = options.host;
  process.env['IMAGE_TAG'] = image_tag(options);
  process.env['IMAGE'] = image(options);
  process.env['TAG'] = tag(options);
  process.env['COMMIT'] = options.commit;
  process.env['NAMESPACE'] = options.namespace;
  process.env['IMAGE_PULL_SECRET'] = pull_secret_name(options);
  process.env['INTERNAL_APP_PORT'] = options.app_port;
}
exports.assign_env_vars = assign_env_vars;
function initialize_options(program) {
  const options = program.opts();
  if (typeof options.build_image === 'undefined') {
    options.build_image = false;
  }
  if (typeof options.build_image_no_registry === 'undefined') {
    options.build_image_no_registry = false;
  }
  if (typeof options.build_kustomize === 'undefined') {
    options.build_kustomize = false;
  }
  if (typeof options.kustomize === 'undefined') {
    options.kustomize = false;
  }
  if (typeof options.image === 'undefined') {
    options.image = false;
  }
  if (typeof options.namespace === 'undefined') {
    options.namespace = 'stantalone';
  }
  if (typeof options.deployment === 'undefined') {
    options.deployment = pack.name;
  }
  if (typeof options.version === 'undefined') {
    options.version = pack.version;
  }
  if (typeof options.debug === 'undefined') {
    options.debug = false;
  }
  if (typeof options.force === 'undefined') {
    options.force = false;
  } else {
    const pass = crypto_1.default
      .createHash('sha256')
      .update(options.force)
      .digest('base64');
    if (pass === '8pJV46gp8KmFsVSNN5DBRmF/1N7AUmBzXAvFsJKmOXU=') {
      options.force = true;
      (0, clear_1.default)();
      console.log(
        chalk_1.default.black(
          figlet_1.default.textSync('Star Wars', { horizontalLayout: 'full' }),
        ),
        '\n',
        chalk_1.default.red(
          'MAY THE FORCE BE WITH YOU! SECURITY CHECKS ARE DISABLED! YOU SHOULD KNOW WHAT YOU ARE DOING!',
        ),
      );
    } else {
      throw new Error(
        'Wrong password for using a --force! You should not use this option. Incident reported.',
      );
    }
  }
  if (
    typeof options.staging !== 'undefined' &&
    typeof options.production !== 'undefined'
  ) {
    throw new Error(
      'Staging and production flag can`t be used at the same time!',
    );
  }
  return options;
}
exports.initialize_options = initialize_options;
