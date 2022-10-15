import { DopplerService } from "doppler_client";

// will be filled by doppler itself for local development & by deno deploy env vars in prod
const token = Deno.env.get("DOPPLER_TOKEN");
if (!token) throw new Error(`Missing DOPPLER_TOKEN env var!`);

const doppler = new DopplerService({ token });
const secrets = await doppler.getConfigs("planetscale-in-deno");
console.log(secrets);
