import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="container mx-auto px-4 py-8">
                <Link href="/" className="text-2xl font-bold text-blue-600">Read Masters</Link>
            </header>

            <main className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">About Read Masters</h1>
                <p className="text-xl mb-8 max-w-3xl">
                    Read Masters is dedicated to fostering a love for reading in children.
                    Our platform combines technology with education to create an engaging
                    and rewarding reading experience for young minds.
                </p>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="mb-8">
                    To empower children through literature, encouraging lifelong learning
                    and imagination while providing parents and educators with valuable
                    insights into reading progress.
                </p>
                <Button asChild>
                    <Link href="/register">Join Read Masters</Link>
                </Button>
            </main>
        </div>
    );
}