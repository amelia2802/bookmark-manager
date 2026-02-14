import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddBookmark from "../components/AddBookmark";
import BookmarkList from "../components/BookmarkList";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/');
    }

    return (
        <div className="flex flex-col gap-4 items-center py-10">
            <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
            <p className="mt-4">Logged in as: {user.email}</p>
            <AddBookmark />
            <h2 className="text-2xl font-bold text-[#168695]">My Bookmarks</h2>
            <BookmarkList />
        </div>
    );
}