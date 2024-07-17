import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
			<header className="container mx-auto px-4 py-8 flex justify-between items-center">
				<h1 className="text-3xl font-bold text-pink-600">Read Masters</h1>
				<nav>
					<ul className="flex space-x-4">
						<li><Link href="/about" className="text-pink-600 hover:text-pink-800 text-xl">About</Link></li>
						<li><Link href="/contact" className="text-pink-600 hover:text-pink-800 text-xl">Contact</Link></li>
						<li><Link href="/login" className="text-pink-600 hover:text-pink-800 text-xl">Login</Link></li>
					</ul>
				</nav>
			</header>
 
			<main className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-5xl font-bold mb-6">Empower Young Minds Through Reading</h2>
				<p className="text-xl mb-8 max-w-2xl mx-auto">
					Read Masters is a revolutionary platform that encourages children to explore the world of books,
					track their reading progress, and earn rewards for their literary achievements.
				</p>
				<div className="space-x-4">
					<Button asChild>
						<Link href="/register">Get Started</Link>
					</Button>
					<Button variant="outline" asChild>
						<Link href="/learn-more">Learn More</Link>
					</Button>
				</div>
			</main>

			<section className="bg-white py-16">
				<div className="container mx-auto px-4">
					<h3 className="text-3xl font-bold mb-8 text-center">Key Features</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<FeatureCard
							title="Extensive Book Catalog"
							description="Access a vast collection of age-appropriate books across various genres."
						/>
						<FeatureCard
							title="Progress Tracking"
							description="Monitor your child's reading habits and improvements over time."
						/>
						<FeatureCard
							title="Rewards System"
							description="Motivate young readers with points and badges for their accomplishments."
						/>
					</div>
				</div>
			</section>

			<footer className="bg-slate-500 text-white py-8">
				<div className="container mx-auto px-4 text-center">
					<p>&copy; 2023 Read Masters. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}

function FeatureCard({ title, description }: { title: string; description: string }) {
	return (
		<div className="bg-blue-50 p-6 rounded-lg">
			<h4 className="text-xl font-semibold mb-2">{title}</h4>
			<p>{description}</p>
		</div>
	);
}