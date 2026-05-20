import Articles from "@/components/articles";
import Hero from "@/components/hero";

export default function Home() {
  return(
    <div className="bg-[#000000] min-h-screen">
      <section className="bg-black">
        <Hero />
      </section>
      <section className="flex justify-center py-10">
        <Articles />
      </section>
      
    </div>
  )
}
