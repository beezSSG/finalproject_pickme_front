import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
// npm install tw-elements

const Promotion = () => {
  return (
    <>
      <Carousel>
        <Paper className="flex-wrap flex justify-center items-center drop-shadow-2xl" sx={{ boxShadow: 0 }}>
          <img src="https://www.emart24.co.kr/image/NzM2NzY=" alt="이벤트1" />
        </Paper>
        <Paper className="flex-wrap flex justify-center items-center drop-shadow-2xl" sx={{ boxShadow: 0 }}>
          <img src="https://www.emart24.co.kr/image/NzM2NDc=" alt="이벤트2" />
        </Paper>
        <Paper className="flex-wrap flex justify-center items-center drop-shadow-2xl" sx={{ boxShadow: 0 }}>
          <img src="https://www.emart24.co.kr/image/NzM1OTU=" alt="이벤트3" />
        </Paper>
      </Carousel>
    </>
  );
};
export default Promotion;
