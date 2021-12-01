import Loader from "react-loader-spinner";
import s from "./Spinner.module.scss";

export default function Spinner({ width, height }) {
  return (
    <div className={s.wrapper}>
      <Loader
        type="ThreeDots"
        color="#f8f8f8"
        height={height}
        width={width}
        timeout={0}
      />
    </div>
  );
}
