import sun_ic from "../../../assets/imgs/sun_ic.png";

const IntroductionFrame: React.FC = () => {
  return (
    <div className="w-full min-h-[55vh] sm:min-h-[75vh] p-4 flex items-center border-b-[20px] border-[#FAC3CD] ">
      <div className="w-full xl:w-[50%] p-10 flex flex-col gap-4 justify-center">
        {/* Introduce Type Frame */}
        <div className="flex items-center gap-2 w-fit rounded-full border-2 border-black px-4 py-2">
          <img src={sun_ic} alt="sun_icon" className="w-[40px]" />
          <span className="font-semibold whitespace-nowrap">
            MODERN RESOURCES
          </span>
        </div>
        <h1 className="font-bold text-[30px] sm:text-[70px] 2xl:text-[100px] whitespace-normal">
          Explore your modern stylee.
        </h1>
        <hr className="w-full h-1 bg-gray-300" />
        {/* Rate frame */}
        <div className="flex items-center gap-4 sm:gap-10">
          <div className="bg-[#FD7A7E] flex p-4">
            <img
              className="rounded-full w-[30px] aspect-square sm:w-[50px]"
              src="https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg"
              alt=""
            />
            <img
              className="rounded-full w-[30px] aspect-square sm:w-[50px]"
              src="https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg"
              alt=""
            />
            <img
              className="rounded-full w-[30px] aspect-square sm:w-[50px]"
              src="https://i.pinimg.com/736x/0d/11/e2/0d11e2178446a6ad28a533c7f0937cf9.jpg"
              alt=""
            />
          </div>
          {/* Rate figure */}
          <div className="flex items-center">
            <div className="flex flex-col sm:flex-row  gap-4 items-center text-[#012824] font-bold">
              <h3 className="text-[20px] sm:text-[35px]">4.9/5</h3>
              <div className="flex items-center">
                <img
                  className="w-[30px] h-[30px]"
                  src="https://cdn2.iconfinder.com/data/icons/modifiers-add-on-1-flat/48/Mod_Add-On_1-35-512.png"
                  alt=""
                />
                <span className="whitespace-nowrap">18,921 (reviews)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:hidden gap-4 my-4 items-center cursor-pointer">
          <span className="underline font-semibold">VIEW MORES</span>
          <div className="bg-[#FD7A7E] w-fit rounded-full p-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="w-[15px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[50%] hidden xl:flex h-full  items-center justify-center gap-4">
        <div className="flex items-center w-fit h-full">
          <img
            className="h-[80%] w-auto rounded-full"
            src="https://i.pinimg.com/736x/4a/07/0d/4a070d05ec420cde73ee86c1f755588d.jpg"
            alt=""
          />
        </div>
        <div className="w-[40%]">
          <h2 className="font-semibold text-[20px]">
            Provided by the most innovative companies worldwide
          </h2>
          <div className="flex gap-4 my-4 items-center cursor-pointer">
            <span className="underline font-semibold">VIEW MORES</span>
            <div className="bg-[#FD7A7E] w-fit rounded-full p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-[15px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroductionFrame;
