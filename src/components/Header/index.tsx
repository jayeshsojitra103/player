import Link from "next/link";

type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {
    return (
        <div>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link href={"/about"}>About</Link> &nbsp;&nbsp;
            <Link href={"/dashboard"}>Dashboard</Link>&nbsp;&nbsp;
            <Link href={"/contact"}>contact</Link> &nbsp;&nbsp;
        </div>
    );
}


export default Header;