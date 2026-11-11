import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'StudyForge — Your AI study workspace', description: 'Turn lecture materials into a structured, exam-ready knowledge base.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
