import type { Metadata } from"next";
import App from"../../components/App";

export const metadata: Metadata = {
 title:"Admin Dashboard | Nurse Boundaries Builder",
 description:"Secure management portal for pricing, stats, and user accounts.",
};

export const dynamic = 'force-dynamic';

export default function AdminPage() {
 return <App initialPage="admin" />;
}
