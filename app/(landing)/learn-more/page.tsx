import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LearnMorePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="container mx-auto px-4 py-8">
                <Link href="/" className="text-2xl font-bold text-blue-600">Read Masters</Link>
            </header>

            <main className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">Learn More About Read Masters</h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                    <p className="mb-4">
                        Read Masters provides a simple yet effective way for children to engage with books:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 mb-4">
                        <li>Parents create an account and add their children's profiles.</li>
                        <li>Children browse our extensive catalog and choose books to read.</li>
                        <li>As they read, children or parents log their progress.</li>
                        <li>Children earn points and badges for their reading achievements.</li>
                        <li>Parents can monitor progress and encourage reading habits.</li>
                    </ol>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Encourages regular reading habits</li>
                        <li>Provides a safe, curated reading environment</li>
                        <li>Offers insights into reading preferences and progress</li>
                        <li>Motivates children through a rewarding system</li>
                        <li>Facilitates parent-child engagement in reading activities</li>
                    </ul>
                </section>

                <Button asChild>
                    <Link href="/register">Get Started Today</Link>
                </Button>
            </main>
        </div>
    );
}