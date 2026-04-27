'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BundleType, PleaserPhase } from '../types';
import { 
 DEFAULT_CAREERS, 
 DEFAULT_BUNDLES, 
 DEFAULT_BUNDLE_ISSUES, 
 DEFAULT_PLEASER_PHASES,
 DEFAULT_SOCIAL_PROOF_SEEDS
} from '../lib/db';

interface Constants {
 nurseCareers: string[];
 supportBundles: BundleType[];
 bundleIssues: Record<string, string[]>;
 pleaserPhases: PleaserPhase[];
 socialProofEntries: any[];
 isLoading: boolean;
}

const ConstantsContext = createContext<Constants | undefined>(undefined);

function generateSocialProof(seeds: any) {
 if (!seeds || !seeds.firstNames?.length || !seeds.cities?.length || !seeds.plans?.length) return [];
 const entries = [];
 for (let i = 0; i < 500; i++) {
 const name = seeds.firstNames[Math.floor(Math.random() * seeds.firstNames.length)];
 const city = seeds.cities[Math.floor(Math.random() * seeds.cities.length)];
 const plan = seeds.plans[Math.floor(Math.random() * seeds.plans.length)];
 
 const type = Math.random();
 let timeText ="";
 if (type < 0.3) timeText = `${Math.floor(Math.random() * 59) + 1} mins ago`;
 else if (type < 0.7) timeText = `${Math.floor(Math.random() * 23) + 1} hours ago`;
 else timeText = `${Math.floor(Math.random() * 2) + 1} days ago`;

 entries.push({ name, city, plan, timeText });
 }
 return entries;
}

export function ConstantsProvider({ children }: { children: ReactNode }) {
 const [data, setData] = useState<Omit<Constants, 'isLoading' | 'socialProofEntries'>>({
 nurseCareers: DEFAULT_CAREERS,
 supportBundles: DEFAULT_BUNDLES as BundleType[],
 bundleIssues: DEFAULT_BUNDLE_ISSUES,
 pleaserPhases: DEFAULT_PLEASER_PHASES,
 });
 const [socialProofEntries, setSocialProofEntries] = useState<any[]>(generateSocialProof(DEFAULT_SOCIAL_PROOF_SEEDS));
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
 async function fetchConstants() {
 try {
 const response = await fetch('/api/constants');
 if (response.ok) {
 const result = await response.json();
 setData({
 nurseCareers: result.nurseCareers || DEFAULT_CAREERS,
 supportBundles: (result.supportBundles as BundleType[]) || (DEFAULT_BUNDLES as BundleType[]),
 bundleIssues: result.bundleIssues || DEFAULT_BUNDLE_ISSUES,
 pleaserPhases: result.pleaserPhases || DEFAULT_PLEASER_PHASES,
 });
 
 // Generate social proof entries from seeds if they exist
 const seeds = result.socialProofSeeds || DEFAULT_SOCIAL_PROOF_SEEDS;
 setSocialProofEntries(generateSocialProof(seeds));
 }
 } catch (error) {
 console.error("Failed to fetch constants:", error);
 // Fallback already set in initial state
 } finally {
 setIsLoading(false);
 }
 }
 fetchConstants();
 }, []);

 return (
 <ConstantsContext.Provider value={{ ...data, socialProofEntries, isLoading }}>
 {children}
 </ConstantsContext.Provider>
 );
}

export function useConstants() {
 const context = useContext(ConstantsContext);
 if (context === undefined) {
 return {
 nurseCareers: [],
 supportBundles: [],
 bundleIssues: {},
 pleaserPhases: [],
 socialProofEntries: [],
 isLoading: true
 };
 }
 return context;
}
