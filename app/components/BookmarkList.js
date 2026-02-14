"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export const dynamic = 'force-dynamic';

export default function BookmarkList(){
    const [bookmarks, setBookmarks] = useState([]);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    useEffect(()=>{
        const fetchBookmarks = async () => {
            const { data} = await supabase
                .from('bookmarks')
                .select('*')
                .order('created_at', { ascending: false });
            if (data) {
                setBookmarks([...data]);
            }
        }
        fetchBookmarks();

        const channel = supabase
            .channel("schema-db-changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "bookmarks",
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [payload.new, ...prev]);
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
                    } else {
                        fetchBookmarks(); 
                    }
                }
            ).subscribe();

            return()=>{
                supabase.removeChannel(channel);
            }
    },[supabase]);

    const handleDelete = async(id)=>{
        const{error} = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', id);

            if(error){
                alert(error.message);
            }
        }

    return (
    <div className="grid gap-4 grid-cols-4">
      {bookmarks.length === 0 && (
        <p className="text-gray-500 italic">No bookmarks yet. Add one above!</p>
      )}

      {bookmarks.map((bookmark) => (
        <div 
          key={bookmark.id} 
          className="flex w-[20em] items-center justify-between p-4 bg-white shadow rounded-lg border border-gray-300"
        >
          <div>
            <h3 className="font-bold text-blue-600">{bookmark.title}</h3>
            <a 
              href={bookmark.url} 
              target="_blank" 
              className="text-sm text-gray-400 hover:underline"
            >
              {bookmark.url}
            </a>
          </div>

          <button 
            onClick={() => handleDelete(bookmark.id)}
            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
            title="Delete Bookmark"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}