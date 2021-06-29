import Link from "next/link"
import packageJSON from "../package.json"

export default function Footer({ color }) {
  return (
    <section className={`bg-${color || "blue"}-100 h-screen w-screen flex justify-center items-center`}>
      <div className="h-48 relative">
        <img src={`/images/loading-${color || "blue"}.gif`} height="128" width="128" className="block" />
        <h3 className={`text-center text-2xl text-${color || "blue"}-500 font-bold px-5 py-5`}>LOADING</h3>
      </div>
    </section>
  );
}
