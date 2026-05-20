export default function Footer() {
  return (
    <>
    
    <footer className="flex justify-center w-full h-100 bg-[#060309] text-[#f5b461]">
      <div className="py-8 px-10 w-125 flex justify-end items-center flex-col">
        <h1 className="text-center text-4xl font-creepster">Creepy</h1>
        <p className="text-center w-90 mt-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eu velit
          tempus erat egestas efficitur. In hac habitasse platea dictumst. Fusce
          a nunc eget ligula.
        </p>
        <div>
          <ul className="flex justify-center gap-2 mt-10 font-creepster">
            <li className="underline m-2">Twitter</li>
            <li className="underline m-2">LinkedIn</li>
            <li className="underline m-2">RSS</li>
          </ul>
          <div className="text-center mt-10 w-100">
            © 2026 Creepy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
    
    </>
  );
}
