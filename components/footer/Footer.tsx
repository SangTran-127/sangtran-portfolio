import Image from "next/image"
import Link from "next/link"
import facebook from "../../assests/icons/social/facebook-color.svg"
import github from "../../assests/icons/social/github-color.svg"
import linkedin from "../../assests/icons/social/linkedin-color.svg"


export const socialLinks = [
    {
        icon: facebook,
        name: 'facebook',
        link: 'https://www.facebook.com/sangtqs'
    },
    {
        icon: github,
        name: 'github',
        link: 'https://github.com/SangTran-127'
    },
    {
        icon: linkedin,
        name: 'linkedIn',
        link: 'https://www.linkedin.com/in/quang-s%C3%A1ng-tr%E1%BA%A7n/'
    },

]

const Footer = () => {
    return (
        <footer className="bg-dracula-darker-900 py-4 mt-10">
            <div className="flex flex-col gap-2">
                <div className="flex gap-10 justify-center">
                    {
                        socialLinks.map((social) => (
                            <Link target="_blank" key={social.name} href={social.link}>
                                <Image src={social.icon} alt="asd" width={40} height={40} style={{ background: '#ffffff', borderRadius: '40px' }} />
                            </Link>
                        ))
                    }
                </div>
                <div className="text-dracula-light text-center">Copyright &copy; {new Date().getFullYear()} All rights reserved</div>
            </div>

        </footer>
    )
}

export default Footer