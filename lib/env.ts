import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  APP_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Variáveis de ambiente inválidas", parsed.error.flatten().fieldErrors);
  if (process.env.NODE_ENV === "production") {
    throw new Error("Configuração inválida do ambiente.");
  }
}

export const env = parsed.success
  ? parsed.data
  : {
      APP_URL: "http://localhost:3000",
      NODE_ENV: "development" as const
    };
