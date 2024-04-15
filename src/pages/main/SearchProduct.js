const SearchProduct = () => {
  return (
    <>
      <div className="bg-white drop-shadow-2xl rounded-2xl m-auto mb-11">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between mb-11">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              상품찾기
            </h1>
            <h2 className="text-2xl font-bold tracking-tight text-slate-500 hover:text-slate-900 transition duration-300">
              <button>더보기</button>
            </h2>
          </div>
          <form className="flex items-center justify-center">
            <label htmlFor="voice-search" className="sr-only">
              Search
            </label>
            <div className="relative w-screen">
              <input
                type="text"
                // id="voice-search"
                className="py-6 bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg 
                          focus:border-gray-300 focus-visible:ring-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-300 
                          hover:drop-shadow-xl duration-300 ease-in-out text-center
                          block w-full ps-10 p-7"
                placeholder="찾고 싶은 상품을 입력하세요"
                required
              />

              <div>
                {/* 음성검색 버튼 */}
                {/* <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-12
                            text-gray-400 hover:text-gray-700 transition-colors duration-400 ease-in-out "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                    />
                  </svg>
                </button> */}

                {/* 검색 버튼 */}
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-4
                      text-gray-400 focus:outline-none focus:text-gray-800
                      hover:text-gray-700 transition-colors duration-400 ease-in-out 
                       rounded-full text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* <button
              type="submit"
              // className="inline-flex items-center py-5 px-3 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            > */}
          </form>
          {/* 상품 카테고리 */}
          {/* 추후에 아이콘 작업 */}
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
