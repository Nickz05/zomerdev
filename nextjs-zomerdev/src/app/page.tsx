import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Diensten from '@/components/Diensten'
import Marquee from '@/components/Marquee'
import Over from '@/components/Over'
import Referenties from '@/components/Referenties'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import SectionDots from '@/components/SectionDots'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <SectionDots />
      <main>
        <Hero />
        <Diensten />
        <Marquee />
        <Over />
        <Referenties />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
