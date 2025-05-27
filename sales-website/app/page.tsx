"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import ProductShowcase from "@/components/product-showcase"
import FeaturesSection from "@/components/features-section"
import TestimonialsSection from "@/components/testimonials-section"
import PricingSection from "@/components/pricing-section"
import ContactSection from "@/components/contact-section"
import EnhancedNavigation from "@/components/enhanced-navigation"
import ParticleBackground from "@/components/particle-background"
import LoadingScreen from "@/components/loading-screen"
import Footer from "@/components/footer"
import ShoppingCart from "@/components/shopping-cart"
import ProductModal from "@/components/product-modal"
import ScrollProgress from "@/components/scroll-progress"
import BackToTop from "@/components/back-to-top"
import NewsletterPopup from "@/components/newsletter-popup"
import LiveChat from "@/components/live-chat"
import { CartProvider } from "@/contexts/cart-context"
import { ProductProvider } from "@/contexts/product-context"
import CollectionDiscovery from "@/components/collection-discovery"
import FashionTrends from "@/components/fashion-trends"
import AdvancedEffects from "@/components/advanced-effects"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <CartProvider>
      <ProductProvider>
        <div className="relative min-h-screen bg-black overflow-x-hidden">
          <AdvancedEffects />
          <ParticleBackground />
          <ScrollProgress />
          <EnhancedNavigation />
          <HeroSection />
          <ProductShowcase />
          <CollectionDiscovery />
          <FashionTrends />
          <FeaturesSection />
          <TestimonialsSection />
          <PricingSection />
          <ContactSection />
          <Footer />
          <ShoppingCart />
          <ProductModal />
          <BackToTop />
          <NewsletterPopup />
          <LiveChat />
        </div>
      </ProductProvider>
    </CartProvider>
  )
}
