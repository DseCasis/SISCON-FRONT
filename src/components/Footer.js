import { BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";

export default function Footer() {
    return (
        <div className="bg-slate-400 py-4">
            <div className="container mx-auto px-4">
                <ul className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
                    <li>
                        <a
                            href="https://twitter.com/INIAPECUADOR"
                            className="text-white text-lg md:text-xl lg:text-2xl tracking-wide cursor-pointer hover:border-b-2 border-b-2 border-transparent transform ease-in-out transition hover:animate-bounce"
                        >
                            <BsTwitter />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.instagram.com/iniapecuador/"
                            className="text-white text-lg md:text-xl lg:text-2xl tracking-wide cursor-pointer hover:border-b-2 border-b-2 border-transparent transform ease-in-out transition hover:animate-bounce"
                        >
                            <BsInstagram />
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.facebook.com/iniapec"
                            className="text-white text-lg md:text-xl lg:text-2xl tracking-wide cursor-pointer hover:border-b-2 border-b-2 border-transparent transform ease-in-out transition hover:animate-bounce"
                        >
                            <BsFacebook />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}