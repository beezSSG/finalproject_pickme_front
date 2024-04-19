import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import jsonData from "../../assets/data/ceo/list.json";

export default function CeoMainNav() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const data = jsonData;
  const res = data.res;

  return (

    <>

    <div
      className="shadow-2xl pl-5 w-[18%]"
      style={{ marginTop: `${scrollY}px` }}
    >


      <ul className="pt-1">
        {res.map((data, i) => {
          const service = data.subtitle;

          return (

            <ul key={i}>
              <li className="mt-2 p-2 gap-x-4 rounded-md text-yellow-500 items-center font-bold sm:text-sm">
                <span className="text-3xl">{data.title}</span>
                <ul>
                  {service.map((service) => {
                    return (
                      
                      <li
                        key={service.subname}
                        className="text-black text-xl  pl-5 pt-3"
                      >
                        <Link
                          to={service.subpath}
                          className="cursor-pointer hover:text-orange-500"
                        >
                          {service.subname}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          );
        })}
      </ul>
    </div>
  </>
  );
}
