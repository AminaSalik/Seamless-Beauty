import React, { useEffect } from 'react';
// import "../../assets/style/About.css"

export default function ProblemSolut() {
  
  useEffect(() => {
    // Refresh AOS to ensure it detects these elements when the component mounts
    if (window.AOS) {
      window.AOS.refresh();
    }
  }, []);

  const imgs = {
    gallery: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1000&auto=format&fit=crop",
    skin: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop",
    hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop",
    makeup: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
    stress: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=1000&auto=format&fit=crop",
    glow: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }

  return (
    <>
      <section className="py-20 bg-black overflow-hidden">
        <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
          
          {/* Section Title - Fades up from bottom */}
          <div className="relative text-center" data-aos="fade-up">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-white">
              Beauty Should Be <span className="span__">Effortless</span>
            </h2>
          </div>

          {/* First Feature - Image fades left, Text fades right */}
          <div className="flex flex-col mb-8 sm:flex-row items-center">
            <div 
              className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img className="rounded-lg shadow-xl img-floating border border-pink-500/20" src={imgs.stress} alt="Stress-free" />
            </div>
            <div 
              className="flex flex-col justify-center sm:w-1/2 md:w-7/12 sm:pr-16 text-white"
              data-aos="fade-right"
              data-aos-delay="400"
            >
              <div className="span__ font-bold mb-2 text-sm uppercase tracking-widest">The Routine</div>
              <h3 className="text-2xl md:text-4xl font-bold">No More Waiting Lists</h3>
              <p className="mt-5 text-lg text-gray-400">
                Your time is as valuable as your beauty. Book your transformation online anytime.
              </p>
              <div className="mt-6 p-4 bg-gray-900 border-l-4 border-pink-500 rounded-r">
                <p className="font-semibold span__">24/7 Digital Concierge</p>
                <p className="text-sm text-gray-300">Pick your favorite artist and time in just a few clicks.</p>
              </div>
            </div>
          </div>

          {/* Second Feature - Image fades right, Text fades left */}
          <div className="flex flex-col mb-8 sm:flex-row items-center">
            <div 
              className="flex items-center mb-8 sm:w-1/2 md:w-5/12"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <img className="rounded-lg shadow-xl img-floating border border-pink-500/20" src={imgs.glow} alt="Resulting Glow" />
            </div>
            <div 
              className="flex flex-col justify-center sm:w-1/2 md:w-7/12 sm:pl-16 text-white"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <div className="text-pink-500 font-bold mb-2 text-sm uppercase tracking-widest">The Experience</div>
              <h3 className="text-2xl md:text-4xl font-bold">Radiance Guaranteed</h3>
              <p className="mt-5 text-lg text-gray-400">
                We provide a customized beauty journey tailored specifically to your skin and hair needs.
              </p>
              <div className="mt-6 p-4 bg-gray-900 border-l-4 border-pink-500 rounded-r">
                <p className="font-semibold text-pink-500">VIP Personalized Care</p>
                <p className="text-sm text-gray-300">Get custom care tips sent to your phone after every visit.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}