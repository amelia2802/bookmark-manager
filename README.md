# Bookmark Manager
A simple bookmark manager app built with Next.js, Supabase, and Tailwind CSS. Users can sign up and log in using Google OAuth, add bookmarks, and see their bookmarks update in real-time across multiple tabs.

Link: https://bookmark-manager-1j8l.vercel.app/
Preview:

## Tech Stacks
- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS for styling
- Gemini, Windsurfer for development assistance
- Google Cloud Console for OAuth setup

## Learning Outcomes
1. Setting up the project skeleton us With Next.js was an interesting find as I mostly woked with create-react-app before and the nextjs but with page router. I had to learn about the new file based routing and how to structure the app with the App Router. It was a bit of a learning curve but I enjoyed it.
2. As mostly worked with frontend connecting with serverside setup and implementing the handshake between the backend(docker, supabase) was completly new to me. I take help with Gemini and prompted to give me instructions as trainer and I followed the instructions to set up the local development environment with Supabase. I learned how to start and stop the Supabase services, how to check the logs, and how to troubleshoot common issues that can arise when working with Docker and Supabase. 
3. Face container conflict on supabase runtime as reported "already running" while DB container was exited. Ran `npx supabase stop --no-backup` then `npx supabase start`. Supabase state cleared and services restarted successfully.
4. Got Docker error — container name conflict. Removed the stuck containers with `docker rm -f <container>` and retried `npx supabase start`. Name conflicts resolved and Supabase recreated containers normally.

5. On Windows got analytics warning and networking issues due to Docker binding. Created a local bridge network bound to localhost: `docker network create -o 'com.docker.network.bridge.host_binding_ipv4=127.0.0.1' local-network` and started Supabase with `--network-id local-network`.Containers could bind to localhost and networking-related warnings stopped.

6. The "Realtime" toggle was missing in the Supabase Dashboard's Replication tab, making it impossible to enable live updates through the UI. Used the SQL Editor to manually run `ALTER PUBLICATION supabase_realtime ADD TABLE bookmarks;`.The database began broadcasting changes to the client without needing the dashboard's visual toggle.

7. Realtime updates were reaching the browser console but weren't appearing on the screen because the database was only sending the row ID. Executed `ALTER TABLE bookmarks REPLICA IDENTITY FULL;` in the SQL editor to force the database to send the entire row data. The Next.js state updated immediately with the full bookmark details, showing the new tile without a page refresh.

8. Cause: Google OAuth login failed on the live Vercel site with a **redirect_uri_mismatch error**. Added both the Supabase callback URL and the Vercel app URL to the "Authorized redirect URIs" in the Google Cloud Console. The "handshake" between Google, Supabase, and Vercel was secured, allowing users to log in to the production site.

9. Initializing Google OAuth was a new process, leading to **"400: Invalid Request"** errors when trying to sign in through the local environment.Configured the OAuth Consent Screen and created a Web Client ID in Google Cloud Console, specifically whitelisting the local Supabase callback URL. Successfully enabled a secure Google Login flow that automatically creates and authenticates users in the Supabase Auth table.

10. Transitioning from local development to production caused the OAuth flow to break because the Google API services didn't recognize the Vercel domain.Updated the Google Cloud "Authorized JavaScript Origins" and "Redirect URIs" to include the live Vercel URL alongside the Supabase project URL.Established a robust production-ready authentication system that allows seamless login across both development and live environment

