import logo from "../../assets/image.png";

const Login = () => {


    return (
        <div className="relative flex min-h-full shrink-0 justify-center md:px-12 lg:px-0">
            <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
                <main className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
                    <div className="flex">
                        <a aria-label="Home" href="/">
                            <img src="https://www.emart24.co.kr/assets/assets/imgs/logo.png" alt="..." />
                        </a>
                    </div>
                    <h2 className="mt-20 text-lg font-semibold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-700">Don’t have an account?
                        <a className="font-medium text-blue-600 hover:underline" href="/register">Sign up</a>
                        for a free trial.</p>
                    <form action="#" className="mt-10 grid grid-cols-1 gap-y-8"><div>
                        <label htmlFor=":S1:" className="mb-3 block text-sm font-medium text-gray-700">Email address</label>
                        <input id=":S1:" autoComplete="email" required="" className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" type="email" name="email" />
                    </div>
                        <div>
                            <label htmlFor=":S2:" className="mb-3 block text-sm font-medium text-gray-700">Password</label>
                            <input id=":S2:" autoComplete="current-password" required="" className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm" type="password" name="password" />
                        </div>
                        <div>
                            <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full mb-10" type="submit" variant="solid" color="blue">
                                <span>Sign in <span aria-hidden="true">→</span>
                                </span>
                            </button>
                        </div>
                    </form>
                    <div className="grid grid-cols-1 gap-y-2">
                        <div>
                            <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-gray-600 text-white hover:text-slate-100 hover:bg-gray-500 active:bg-gray-800 active:text-gray-100 focus-visible:outline-gray-600 w-full" type="submit" variant="solid" color="gray"><span>Google <span aria-hidden="true">→</span></span>
                            </button>
                        </div>
                        <div>
                            <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-yellow-600 text-white hover:text-slate-100 hover:bg-yellow-500 active:bg-yellow-800 active:text-yellow-100 focus-visible:outline-yellow-600 w-full" type="submit" variant="solid" color="yellow"><span>KaKao <span aria-hidden="true">→</span></span>
                            </button>
                        </div>
                        <div>
                            <button className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-lx font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-600 text-white hover:text-slate-100 hover:bg-green-500 active:bg-green-800 active:text-green-100 focus-visible:outline-green-600 w-full" type="submit" variant="solid" color="green"><span>Naver <span aria-hidden="true">→</span></span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
            <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
                <img alt="" loading="lazy" width="1664" height="1866" decoding="async" data-nimg="1" className="absolute inset-0 h-full w-full object-cover" src={logo} style={{ color: "transparent" }} />
            </div>
        </div>
    )
}
export default Login;