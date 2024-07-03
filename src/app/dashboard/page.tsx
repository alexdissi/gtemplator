import {auth} from "@/lib/auth";

export default async function Dashboard() {
    const session = await auth()
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>{session?.user.email}</h2>
        </div>
    )
}