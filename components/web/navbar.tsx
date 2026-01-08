import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function Navbar() {
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <h1 className="text-3xl font-bold">Next<span className="text-blue-600">Blog</span></h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost"})} href="/">Home</Link>
                    <Link className={buttonVariants({ variant: "ghost"})} href="/blog">Blog</Link>
                    <Link className={buttonVariants({ variant: "ghost"})} href="/create">Create</Link>
                </div>

            </div>

            <div className="flex items-center gap-2">
                <Link className={buttonVariants()} href="/auth/signup">Sign up</Link>
                <Link className={buttonVariants({ variant: "secondary"})} href="/auth/login">Login</Link>
            </div>  
        </nav>  
    )
}