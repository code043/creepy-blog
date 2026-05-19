import Articles from "@/components/articles";
import Footer from "@/components/footer";
import Hero from "@/components/hero";

export default function Home() {
  return(
    <div className="bg-[#000000] min-h-screen">
      <section >
        <Hero />
      </section>
      <section className="flex justify-center py-10">
        <Articles />
      </section>
      <section className="flex justify-center py-10">
        <Footer />
      </section>
    </div>
  )
}
