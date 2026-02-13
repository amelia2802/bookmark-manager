import LoginPage from "./components/LoginPage";

export default function Home() {
  return (
    <div className="bg-[#d9eddf]">
      <main className="flex flex-col">
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl font-bold mb-4">
            Abstrabit Bookmark Manager
          </h1>
          <p className="text-lg mb-8 text-center text-gray-600">
            A micro challenge by Abstrabit. Access your bookmarks with a single click.
          </p>
          <LoginPage className="bg-emerald-500 hover:bg-emerald-700 text-white text-2xl font-bold py-2 px-4 rounded">Get Started</LoginPage>
        </div>
      </main>
    </div>
  );
}
