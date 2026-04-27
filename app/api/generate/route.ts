import { NextResponse } from"next/server";
import { db } from"@/lib/db";
import { GoogleGenAI, Type, ThinkingLevel } from"@google/genai";
import fs from"fs";
import path from"path";

const getAI = () => {
 const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
 
 if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
 throw new Error("Gemini API key is not configured. Please set GOOGLE_GENAI_API_KEY in your environment.");
 }
 return new GoogleGenAI({ apiKey });
};

const modelId ="gemini-3-flash-preview";

export async function POST(req: Request) {
 try {
 const { action, bundle, issue, context, email } = await req.json();

 if (!email) {
 return NextResponse.json({ error:"Email is required for rate limiting" }, { status: 400 });
 }

 // Check rate limit (600 generations per month)
 const user = await db.getUser(email);
 if (user) {
 const now = new Date();
 const currentMonth = now.getMonth();
 const currentYear = now.getFullYear();
 
 let currentCount = user.generations_count || 0;
 let lastResetDate = user.last_generation_reset ? new Date(user.last_generation_reset) : null;

 if (!lastResetDate || lastResetDate.getMonth() !== currentMonth || lastResetDate.getFullYear() !== currentYear) {
 currentCount = 0;
 lastResetDate = new Date(currentYear, currentMonth, 1);
 }

 if ((!user.tier || user.tier.toLowerCase() === 'free') && currentCount >= 600) {
 return NextResponse.json({ error:"Monthly generation limit reached. Please upgrade to continue generating." }, { status: 429 });
 }

 // Increment count
 await db.updateProfile(email, { 
 generationsCount: currentCount + 1,
 lastGenerationReset: lastResetDate.toISOString()
 });
 }

 if (action ==="checkLimit") {
 return NextResponse.json({ success: true });
 }

 if (action ==="generatePlan") {
 const ai = getAI();
 const response = await ai.models.generateContent({
 model: modelId,
 contents: `Develop a premium support strategy for a nurse facing this challenge:"${issue}" in the context of"${bundle}". 
 Context:"${context || 'General nurse workplace setting'}".`,
 config: {
 systemInstruction: `You are a Senior Clinical Nurse Specialist. Develop a robust, high-value strategy. 
 Be concise and impactful. Avoid unnecessary fluff. 
 Provide:
 1. The"Why": Professional ethics and burnout prevention rationale.
 2. The Scripts: 3 distinct word-for-word assertive scripts (Casual, Managerial, Formal).
 3. Psychological Insight: Analysis of behavioral patterns.
 4. Personal Story: A relatable victory anecdote.
 5. Hierarchy Pushbacks: 3 common pushbacks with neutralizer scripts.
 6. Premium Insights: 3 advanced tips.
 7. Clinical Rationale: Patient care protection.
 8. Long Term Impact: Career-saving potential.`,
 thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
 responseMimeType:"application/json",
 responseSchema: {
 type: Type.OBJECT,
 properties: {
 strategy: { type: Type.STRING },
 scripts: { 
 type: Type.ARRAY, 
 items: { 
 type: Type.OBJECT,
 properties: {
 text: { type: Type.STRING },
 why: { type: Type.STRING }
 },
 required: ["text","why"]
 }
 },
 psychologicalInsight: { type: Type.STRING },
 personalStory: { type: Type.STRING },
 objections: {
 type: Type.ARRAY,
 items: {
 type: Type.OBJECT,
 properties: {
 objection: { type: Type.STRING },
 objectionExplanation: { type: Type.STRING },
 rebuttal: { type: Type.STRING },
 rebuttalExplanation: { type: Type.STRING }
 },
 required: ["objection","objectionExplanation","rebuttal","rebuttalExplanation"]
 }
 },
 premiumInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
 clinicalRationale: { type: Type.STRING },
 longTermImpact: { type: Type.STRING }
 },
 required: ["strategy","scripts","psychologicalInsight","personalStory","objections","premiumInsights","clinicalRationale","longTermImpact"]
 }
 }
 });

 let text = response.text ||"{}";
 if (text.startsWith("\`\`\`json")) {
 text = text.replace(/^\`\`\`json\n/,"").replace(/\n\`\`\`$/,"");
 }
 return NextResponse.json(JSON.parse(text));
 }

 if (action ==="regenerateScripts") {
 const ai = getAI();
 const response = await ai.models.generateContent({
 model: modelId,
 contents: `Generate 3 NEW and different professional scripts for a nurse dealing with"${issue}" in the context of ${bundle}. 
 Context:"${context}".`,
 config: {
 systemInstruction:"Generate 3 highly assertive and professionally worded scripts: 1. Casual/Peer 2. Managerial 3. Formal/Escalation. Be concise.",
 thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
 responseMimeType:"application/json",
 responseSchema: {
 type: Type.ARRAY,
 items: { 
 type: Type.OBJECT,
 properties: {
 text: { type: Type.STRING },
 why: { type: Type.STRING }
 },
 required: ["text","why"]
 }
 }
 }
 });

 let text = response.text ||"[]";
 if (text.startsWith("\`\`\`json")) {
 text = text.replace(/^\`\`\`json\n/,"").replace(/\n\`\`\`$/,"");
 }
 return NextResponse.json(JSON.parse(text));
 }

 return NextResponse.json({ error:"Invalid action" }, { status: 400 });
 } catch (error: any) {
 console.error("Generate API Error:", error.message || error, error.stack);
 return NextResponse.json({ 
 error: error.message ||"Internal server error"
 }, { status: 500 });
 }
}
