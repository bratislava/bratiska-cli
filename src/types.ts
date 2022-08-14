//type Options = Record<string, string | number | boolean>;
interface Options extends Record<string, string | number | boolean> {
  cluster: string;
  repository_uri: string;
  deployment: string;
  deployment_env: string;
  env: string;
  host: string;
  commit: string;
  namespace: string;
  app_port: string;
  step: number;
  registry: string;
}
