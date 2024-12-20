import Image from "next/image";
import weather from "./weatherStyle.module.scss";

export default function WeatherCard({ data, icon = "/", gradus, info, clock }) {
  // const { title, data, icon = "/", gradus, info } =
  return (
    <div className={weather.myCard}>
      <h4 className={weather.cardDate}>{data}</h4>
      <h5 className={weather.cardDate}>{clock}</h5>
      <div className={weather.cardIcon}>
        <Image src={icon} alt="icon" fill />
      </div>
      <h5 className={weather.gradus}>{gradus}</h5>
      <h6 className={weather.celcy}>{!gradus && "+15°"}</h6>
      <p className={weather.info}>{info}</p>
    </div>
  );
}
