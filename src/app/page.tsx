import Articles from "@/components/articles";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div className="bg-[#000000] min-h-screen">
      <section className="bg-black">
        <Hero />
      </section>
       <div className="mx-auto md:w-125 w-50 border-t border-dashed border-[#f5b461]/43 my-20"></div>
      <section className="flex justify-center py-10 ">
        
        <Articles />
      </section>
      <div className="mx-auto md:w-125 w-50 border-t border-dashed border-[#f5b461]/43 my-20"></div>
    </div>
  );
}
