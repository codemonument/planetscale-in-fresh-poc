import { DopplerService } from "doppler_client";

let secretsMemo: any;

export async function secrets(forceRefresh?: boolean) {
  if (!forceRefresh && secretsMemo) return secretsMemo;

  // will be filled by doppler itself for local development & by deno deploy env vars in prod
  const token = Deno.env.get("DOPPLER_TOKEN");
  if (!token) throw new Error(`Missing DOPPLER_TOKEN env var!`);

  const DOPPLER_PROJECT = "planetscale-in-deno";

  const doppler = new DopplerService({ token });
  const { configs } = await doppler.getConfigs(DOPPLER_PROJECT);

  const rootConfig = configs.find((config) => config.root === true) ||
    configs[0];

  const { secrets }: any = await doppler.getSecrets(
    DOPPLER_PROJECT,
    rootConfig.name,
  );

  // memoize secrets
  secretsMemo = secrets;
  return secrets;
}
