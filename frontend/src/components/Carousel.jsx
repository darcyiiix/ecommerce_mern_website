
import { useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
export default function Carousel({ slides }) {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative mb-8">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s) => {
          return <img src={s} />;
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${
                i == current ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
        
// import { Carousel } from "flowbite-react";

// function Component() {
//   return (
//     <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
//       <Carousel slide={false}>
//         <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
//         <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
//         <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
//         <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
//         <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
//       </Carousel>
//     </div>
//   );
// }


// //     <div className="carousel w-full">
// //   <div id="slide1" className="carousel-item relative w-full">
// //     <img src="/images/c1.jpeg" className="w-full" />
// //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
// //       <a href="#slide4" className="btn btn-circle">❮</a> 
// //       <a href="#slide2" className="btn btn-circle">❯</a>
// //     </div>
// //   </div> 
// //   <div id="slide2" className="carousel-item relative w-full">
// //     <img src="/images/c2.jpeg" className="w-full" />
// //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
// //       <a href="#" className="btn btn-circle">❮</a> 
// //       <a href="#" className="btn btn-circle">❯</a>
// //     </div>
// //   </div> 
// //   <div id="slide3" className="carousel-item relative w-full">
// //     <img src="/images/c3.jpeg" className="w-full" />
// //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
// //       <a href="#slide2" className="btn btn-circle">❮</a> 
// //       <a href="#slide4" className="btn btn-circle">❯</a>
// //     </div>
// //   </div> 
// // </div>

//         // <div id="controls-carousel" className="relative w-full" data-carousel="static">

//         //     <div className="relative h-80 overflow-hidden rounded-lg md:h-96 mb-10">

//         //             {/* <!-- Item 1 --> */}
//         //             <div className="hidden duration-700 ease-in-out" data-carousel-item>
//         //                 <img src="/images/c1.jpeg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//         //             </div>
//         //             {/* <!-- Item 2 --> */}
//         //             <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
//         //                 <img src="/images/c2.jpeg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//         //             </div>
//         //             {/* <!-- Item 3 --> */}
//         //             <div className="hidden duration-700 ease-in-out" data-carousel-item>
//         //                 <img src="/images/c3.jpeg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//         //             </div>

//         //     </div>

//         //     <button type="button" className="-translate-y-1/2 absolute top-1/2 start-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
//         //         <span className="inline-flex items-center justify-center w-10 h-10 bg-transparent group-focus:outline-none">
//         //             <svg className="w-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//         //                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
//         //             </svg>
//         //             <span className="sr-only">Previous</span>
//         //         </span>
//         //     </button>
//         //     <button type="button" className="-translate-y-1/2 absolute top-1/2 end-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" data-carousel-next>
//         //         <span className="inline-flex items-center justify-center w-10 h-10 bg-transparent group-focus:outline-none">
//         //             <svg className="w-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//         //                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
//         //             </svg>
//         //             <span className="sr-only">Next</span>
//         //         </span>
//         //     </button>
//         //     {/* <!-- Slider controls --> */}

//         // </div>
// export default Carousel;



