import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <header className="container mx-auto px-4 py-8">
                <Link href="/" className="text-2xl font-bold text-blue-600">Read Masters</Link>
            </header>

            <main className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <p className="text-xl mb-8">
                    Have questions or feedback? We'd love to hear from you!
                </p>
                <form className="max-w-md space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2">Name</label>
                        <Input id="name" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2">Email</label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2">Message</label>
                        <Textarea id="message" placeholder="Your message here..." />
                    </div>
                    <Button type="submit">Send Message</Button>
                </form>
            </main>
        </div>
    );
}