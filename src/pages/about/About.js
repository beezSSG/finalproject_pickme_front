import RwIcon from "../../assets/imgs/about/rw.gif";
import MgIcon from "../../assets/imgs/about/mg.gif";
import JhIcon from "../../assets/imgs/about/jh.gif";
import JsIcon from "../../assets/imgs/about/js.gif";
import WbIcon from "../../assets/imgs/about/wb.gif";
import KsIcon from "../../assets/imgs/about/ks.gif";

const icons = [
    { "name": " icon", "src": RwIcon },
    { "name": " icon", "src": MgIcon },
    { "name": " icon", "src": JhIcon },
    { "name": " icon", "src": JsIcon },
    { "name": " icon", "src": WbIcon },
    { "name": " icon", "src": KsIcon },
]

export default function About() {
  return (
    <>
      <div className="flex items-center justify-center px-auto">
        <div className="lg:flex flex-wrap space-x-28">
          {
            icons.map((icon)=>(
                <img key={ icon } src={ icon.src } alt={ icon.name } />
            ))
          }
        </div>tr
      </div>
    </>
  );
}
