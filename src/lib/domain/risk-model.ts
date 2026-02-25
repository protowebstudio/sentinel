export type RiskLevel =
    | "low"
    | "medium"
    | "high"
    | "critical";

/**
 * Deterministic Risk Threshold Mapping
 * Single source of truth for score classification.
 */
export function getRiskLevel(score: number): RiskLevel {
    if (score >= 80) return "critical";
    if (score >= 60) return "high";
    if (score >= 40) return "medium";
    return "low";
}

export interface RiskMeta {
    label: string;
    color: string;
    severityWeight: number;
}

/**
 * Risk Metadata Mapping
 * UI must consume this instead of hardcoding styles.
 */
export function getRiskMeta(level: RiskLevel): RiskMeta {
    switch (level) {
        case "critical":
            return {
                label: "Critical",
                color: "red",
                severityWeight: 4,
            };
        case "high":
            return {
                label: "High",
                color: "orange",
                severityWeight: 3,
            };
        case "medium":
            return {
                label: "Medium",
                color: "yellow",
                severityWeight: 2,
            };
        case "low":
        default:
            return {
                label: "Low",
                color: "green",
                severityWeight: 1,
            };
    }
}