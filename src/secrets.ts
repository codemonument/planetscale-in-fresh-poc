import { DopplerService } from "doppler_client";

export const secrets: Promise<Map<string, string>> = loadSecrets();

async function loadSecrets() {
  // DOPPLER_TOKEN will be filled by doppler itself for local development,
  // but by deno deploy env vars in prod
  const token = Deno.env.get("DOPPLER_TOKEN");
  if (!token) throw new Error(`Missing DOPPLER_TOKEN env var!`);

  const DOPPLER_PROJECT = "planetscale-in-deno";

  const doppler = new DopplerService({ token });
  const { configs } = await doppler.getConfigs(DOPPLER_PROJECT);

  const rootConfig = configs.find((config) => config.root === true) ||
    configs[0];

  return await doppler.getSecretsMap(
    DOPPLER_PROJECT,
    rootConfig.name,
  );
}
