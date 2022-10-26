//type Options = Record<string, string | number | boolean>;
export interface Options
  extends Record<string, string | number | boolean | string[]> {
  cluster: string;
  repository_uri: string;
  deployment: string;
  deployment_env: string;
  env: string;
  host: string;
  commit: string;
  app_port: string;
  step: number;
  registry: string;
}

export interface Bash {
  res: string;
  err: string;
}
