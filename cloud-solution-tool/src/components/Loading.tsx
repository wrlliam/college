import Image from "next/image";
import LoadingIcon from "../assets/loader.svg"

export default function Loader() {
    return <Image alt="loading icon" className="animate-spin opacity-30" src={LoadingIcon}/>
}