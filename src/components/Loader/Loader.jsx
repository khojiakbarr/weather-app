import loading from "./loader.module.scss";
export default function Loader() {
  return (
    <div className={loading.wrapper}>
      <span className={loading.loader}></span>
    </div>
  );
}
