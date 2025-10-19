import { Link } from "react-router"

export const CustomLogo = () => {
    return (
        <Link
            to='/'
            className="flex items-center gap-3 whitespace-nowrap group relative"
        >
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

            {/* Text Logo */}
            <div className="flex items-center gap-0.5 relative z-10">
                <span
                    className="
                        text-2xl
                        font-black 
                        tracking-tight
                        bg-gradient-to-br from-primary via-primary to-primary/70
                        bg-clip-text text-transparent
                        transition-all duration-500
                        group-hover:from-primary 
                        group-hover:via-primary/90 
                        group-hover:to-primary
                        group-hover:tracking-wide
                        relative
                        after:absolute 
                        after:bottom-0 
                        after:left-0 
                        after:w-0 
                        after:h-0.5 
                        after:bg-primary 
                        after:transition-all 
                        after:duration-500
                        group-hover:after:w-full
                    "
                >
                    Proyecto
                </span>
            </div>
        </Link>
    )
}
