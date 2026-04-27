import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
 try {
 const [nurseCareers, supportBundles, bundleIssues, pleaserPhases, socialProofSeeds] = await Promise.all([
 db.getNurseCareers(),
 db.getSupportBundles(),
 db.getBundleIssues(),
 db.getPleaserPhases(),
 db.getSocialProofSeeds()
 ]);

 return NextResponse.json({
 nurseCareers,
 supportBundles,
 bundleIssues,
 pleaserPhases,
 socialProofSeeds
 });
 } catch (error) {
 console.error('Error fetching constants:', error);
 return NextResponse.json({ error: 'Failed to fetch constants' }, { status: 500 });
 }
}
