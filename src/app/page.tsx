import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeatureCards from '@/components/FeatureCards'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeatureCards />
      <Footer />
    </main>
  )
}