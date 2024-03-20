const GuideAndSc = () => {
  return (
    <>
      <div className="m-auto mb-11">
        <div
          className="grid grid-cols-2 gap-8 drop-shadow-2xl rounded-2xl">
          <div className="col-start-1 shadow-2xl rounded-2xl">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  창업안내
                </h1>
              </div>
              <div className="text-2xl">내용</div>
            </div>
          </div>
          <div className="shadow-2xl rounded-2xl">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  고객센터
                </h1>
              </div>
              <div className="text-2xl">내용</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GuideAndSc;
