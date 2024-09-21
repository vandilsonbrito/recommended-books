import { IoIosStar } from "react-icons/io";

function CardSkeleton() {
    return (
      <div className="w-[209] h-[400px] border border-gray-300 rounded-lg overflow-hidden">
        <div className="w-full h-[250px] rounded-sm bg-gray-200 opacity-50 animate-pulse flex flex-col justify-center items-center">
            <div className="w-[170px] h-[220px] animate-pulse bg-gray-400 "/>
        </div>

        <div className="w-[240px] h-[150px] bg-white opacity-50 rounded-sm animate-pulse px-4 py-3">
            <div className="w-[220px] h-[8px] bg-gray-400 opacity-50 mb-2 rounded-sm animate-pulse" />
            <div className="w-[200px] h-[8px] bg-gray-400 opacity-50 rounded-sm animate-pulse" />
            <div className="w-[170px] h-[8px] bg-gray-300 opacity-50 mt-3 rounded-sm animate-pulse" />

            <div className="w-full flex mt-4 gap-1 animate-pulse">
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStar/>
                <IoIosStar/>
            </div>
        </div>
      </div>
    );
  }
  
  export default CardSkeleton;
  