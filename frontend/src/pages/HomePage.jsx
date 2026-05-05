import { useEffect, useState } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import ChatToggle from "../components/ChatWidget/ChatToggle";
import ChatPanel from "../components/ChatWidget/ChatPanel";
import CRMToggle from "../components/CRMToggle"; // New import

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const CRM_URL = "https://crm-saurabh-singh-rathore.onrender.com";

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const [isChatOpen, setIsChatOpen] = useState(false);

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	// Pre-warm CRM backend - fires immediately on mount
	useEffect(() => {
		const warmUpCRM = async () => {
			try {
				// Fire-and-forget fetch to wake up the backend
				// Using no-cors to avoid CORS issues, just need to hit the server
				fetch(CRM_URL, { 
					mode: 'no-cors',
					// Short timeout so it doesn't hang
					signal: AbortSignal.timeout(5000) 
				}).catch(() => {
					// Silently fail - we just want to trigger the cold start
				});
			} catch (error) {
				// Ignore errors, this is just a warm-up
			}
		};
		
		warmUpCRM();
	}, []);

	// Modified CRM click handler with pre-check and redirect
	const handleCRMClick = async () => {
		// Open in new tab immediately for better UX
		const crmWindow = window.open(CRM_URL, '_blank');
		
		// If popup blocked, fallback to same tab
		if (!crmWindow) {
			window.location.href = CRM_URL;
		}
	};

	return (
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>

			{/* Chat Widget */}
			<ChatToggle isOpen={isChatOpen} onClick={() => setIsChatOpen(true)} />
			<ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
			
			{/* CRM Button - New Addition */}
			<CRMToggle onClick={handleCRMClick} />
		</div>
	);
};
export default HomePage;
