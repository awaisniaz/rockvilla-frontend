import Link from "next/dist/client/link"

export const HeaderMenu = ()=>{
  
    return <header className="bg-black text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Movie App</h1>
        <nav>
            <ul className="flex space-x-4">
                <li><Link href="/movies" className="hover:text-yellow-500">Your Movies</Link></li>
                <li><Link href="/profile" className="hover:text-yellow-500">Profile</Link></li>
            </ul>
        </nav>
    </div>
</header>
}