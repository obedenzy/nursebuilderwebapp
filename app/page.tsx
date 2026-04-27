import type { Metadata } from"next";
import App from"../components/App";

export const metadata: Metadata = {
 title:"Nurse Boundaries Builder",
 description:"A transformative burnout recovery tool designed for nurses to master professional boundaries through high-impact scripts, psychological insights, and interactive support.",
};

export const dynamic = 'force-dynamic';

export default function Home() {
 return <App />;
}
