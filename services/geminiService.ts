
import { BundleType } from "../types";

export const generateBoundaryPlan = async (bundle: BundleType, issue: string, context: string, email: string) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "generatePlan", bundle, issue, context, email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate boundary plan");
  }

  return await response.json();
};

export const regenerateScriptsOnly = async (bundle: BundleType, issue: string, context: string, email: string) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "regenerateScripts", bundle, issue, context, email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to regenerate scripts");
  }

  return await response.json();
};
