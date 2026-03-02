export const PROOF_SOURCES = {
  apiHealth: "https://api.protowebstudio.com/api/health"
} as const;

export type ProofSourceKey = keyof typeof PROOF_SOURCES;
