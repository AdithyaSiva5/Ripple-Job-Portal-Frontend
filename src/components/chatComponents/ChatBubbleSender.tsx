

const ChatBubbleSender = ({message}:any) => {
    return ( 
      <div className="w-full flex justify-end items-start gap-2.5 " >
  
      <div className="flex flex-col gap-1 w-full  max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-xs font-semibold text-gray-900 dark:text-white ">
            {message?.sender?.username}
          </span>
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
          </span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p className="text-xs font-normal text-gray-900 dark:text-white">
            {' '}
            {message?.text}
          </p>
        </div>
        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
      <div
        id="dropdownDots"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul className="py-2 text-xs text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Reply
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Forward
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Copy
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Report
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
    );
  };
  
  export default ChatBubbleSender;
  