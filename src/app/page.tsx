import Articles from "@/components/articles";
import Hero from "@/components/hero";

export default function Home() {
  return(
    <div className="bg-black">
      <section >
        <Hero />
      </section>
      <section className="flex justify-center py-10">
        <Articles />
      </section>
    </div>
  )
}
