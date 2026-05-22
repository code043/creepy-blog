import Articles from "@/components/articles";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen pt-20 ">
      <div className="">

        <section >
          <Hero />
        </section>

        <div className="w-full border-t border-dashed border-[#f5b461]/43 my-20"></div>

        <section className="py-10">
          <Articles />
        </section>

        <div className="w-full border-t border-dashed border-[#f5b461]/43 my-20"></div>

      </div>
    </div>
  );
}