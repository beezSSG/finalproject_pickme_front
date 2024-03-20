function Header() {

    const Logincom = () => {
        if (localStorage.getItem("name") === null) {
            return (
                <a className="inline-block rounded-lg px-2 py-1 text-2xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/login">Login</a>
            )
        } else {
            return (
                <div>
                    <span className="inline-block rounded-lg px-2 py-1 text-2xl text-slate-700 hover:bg-slate-100 hover:text-slate-900">안녕하세요 { localStorage.getItem("name") } 님</span>
                    <button className="inline-block rounded-lg px-2 py-1 text-2xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" onClick={()=>(logout())}>Logout</button>
                </div>
            )
        }
    }

    const logout = () => {
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
    }
    
    return (
        <div className="mx-auto min-h-2 pt-8 px-10 pb-6 sm:px-6 lg:px-8 backdrop-blur-md transition-colors duration-400 ease-in-out hover:bg-slate-100">
            <nav className="relative z-50 flex justify-between">
                <div className="flex items-center md:gap-x-12 ">
                    <a href="/">
                        <img src="https://www.emart24.co.kr/assets/assets/imgs/logo.png" alt="..." />
                    </a>
                    <div className="hidden md:flex md:gap-x-6">
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#features">서비스소개</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/productlist">상품</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/store">매장찾기</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#pricing">서비스</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/event">이벤트</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-3xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/ceo">발주하자</a>
                    </div>
                    
                </div>
                <div className="flex items-center gap-x-5 md:gap-x-8">
                    <div className="hidden md:block">
                        <Logincom />
                        <a className="inline-block rounded-lg px-2 py-1 text-2xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/login">Sign in</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-2xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/customercenter">고객센터</a>
                        <a className="inline-block rounded-lg px-2 py-1 text-2xl text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/manager">관리자</a>
                    </div>
                    {/* <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600" color="blue" variant="solid" href="/register">
                        <span>Get started 
                            <span class="hidden lg:inline">today</span>
                        </span></a> */}
                    <div className="-mr-1 md:hidden">
                        <div data-headlessui-state="">
                            <button className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none" aria-label="Toggle Navigation" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:Rbpnla:">
                                <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" strokeWidth="2" strokeLinecap="round">
                                    <path d="M0 1H14M0 7H14M0 13H14" className="origin-center transition"></path>
                                    <path d="M2 2L12 12M12 2L2 12" className="origin-center transition scale-90 opacity-0"></path>
                                </svg>
                            </button>
                        </div>
                        <div style={{ position: 'fixed', top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0, display: 'none' }}></div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;