"use client";
import {useState} from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function AddBookmark() {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
          .from('bookmarks')
          .insert({ title, url});
        if (!error) {
          setUrl("");
          setTitle("");
          alert("Bookmark added successfully!");
        } 
      };
      return (
        <form onSubmit={handleSubmit} className="w-1/2 flex flex-col gap-4 p-4 border rounded">
        <input 
            type="text" 
            placeholder="Site Title (e.g. Google)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded text-black"
            required
        />
        <input 
            type="url" 
            placeholder="https://example.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 border rounded text-black"
            required
        />
        <button type="submit" className="bg-emerald-500 hover:bg-emerald-700 text-white p-2 rounded">
            Add Bookmark
        </button>
        </form>
    )
}