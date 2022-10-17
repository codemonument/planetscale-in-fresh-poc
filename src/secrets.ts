import { DopplerService } from "doppler_client";
import { signal } from "@preact/signals";

export const secretsMap = signal<Map<string, string> | undefined>(undefined);

export async function triggerSecretLoading(forceRefresh?: boolean) {
  // DOPPLER_TOKEN will be filled by doppler itself for local development,
  // but by deno deploy env vars in prod
  const token = Deno.env.get("DOPPLER_TOKEN");
  if (!token) throw new Error(`Missing DOPPLER_TOKEN env var!`);

  if (secretsMap.value === undefined && forceRefresh !== true) {
    console.warn(
      `triggerSecretLoading: secretsMap is already available, but forceRefresh is false. Doing nothing.`,
    );
    return;
  }

  const DOPPLER_PROJECT = "planetscale-in-deno";

  const doppler = new DopplerService({ token });
  const { configs } = await doppler.getConfigs(DOPPLER_PROJECT);

  const rootConfig = configs.find((config) => config.root === true) ||
    configs[0];

  // updating the value property of the signal updates the whole signal :)
  secretsMap.value = await doppler.getSecretsMap(
    DOPPLER_PROJECT,
    rootConfig.name,
  );
}
