# Anvil

Task management and image annotation frontend built with Next.js App Router, TypeScript, Tailwind CSS, and React Context.

## A Saga of Code and Conquest

Every great journey has its trials, and the development of Anvil was no different. I faced a league of formidable villains, each testing my skills and resolve. The first was the **Unruly Layout**, a recurring foe that plagued the annotation page with dreaded horizontal scrolls, threatening to break the user experience on smaller screens. With the power of friendship and the wisdom of Flexbox documentation, I wielded mighty spells like `flex-wrap` and `min-w-0` to tame the layout and restore responsiveness.

Next, I battled the **Stubborn Button**, an "Edit" button that defied all attempts to change its color. This was a classic clash against the dark arts of CSS Specificity. After consulting with my trusted ally, an AI coding assistant, I discovered a clever strategy: conditionally swapping between `button-primary` and `button-secondary` classes, which vanquished the villain and brought visual harmony to the interface.

Finally, the most fearsome of them all was the **Ghost of Undefined**, a classic JavaScript specter that haunted the application after a new image was uploaded, causing a fatal `Cannot read properties of undefined (reading 'map')` error. This ghost appeared because newly created annotation objects were missing a `shapes` array. By summoning a simple yet powerful enchantment—ensuring every new annotation object was initialized with an empty `shapes` array (`shapes: added.shapes ?? []`)—the ghost was banished, and the application's stability was secured for all future adventurers.

## Technical Details & Setup

This project is a frontend application built with Next.js. To run it successfully, you will need a compatible Node.js environment and a running instance of the backend service it communicates with.

### Prerequisites

- **Node.js:** It is recommended to use Node.js version **20.9.0 or later**. The current Long-Term Support (LTS) version, Node 22, is also an excellent choice.
- **Python:** The backend for this project is built with Django, a Python framework. While the backend setup is separate, a modern Django project typically requires Python **3.8 or newer**. Please ensure your backend is running on a compatible Python version.
- **Package Manager:** This project uses `npm` for dependency management.

### Running the Project

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Rakibislam22/anvil-frontend.git
    cd anvil-frontend
    ```

2.  **Install dependencies:**
    Open your terminal in the project's root directory and run the following command to install all the necessary packages:

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of the project. This file will hold the URL for your backend API.

    ```bash
    echo NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 > .env.local
    ```

    Make sure to replace `http://localhost:8000` with the actual URL where your Django backend is running.

4.  **Start the development server:**
    Once the dependencies are installed and the environment is configured, you can start the Next.js development server:
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:3000`.

## Routes

- `/` redirects to `/login` or `/tasks` based on a stored access token.
- `/login` posts credentials to `/api/auth/login/`.
- `/tasks` reads and updates task records.
- `/annotate` uploads images and saves normalized polygon points.

## Backend assumptions

The Django response contract was not supplied. This UI assumes login returns `{ access, refresh }`, collection endpoints may return either an array or `{ results: [] }`, task fields match `Task` in `src/types/index.ts`, images expose `image` and `polygons`, and nested polygon endpoints follow `/api/images/:id/polygons/`. Update `src/lib/apiClient.ts` or store adapters if the API differs.

## Verification

Run `npm run lint` and `npm run build`. A live backend is not required for routes to compile; API errors are shown in-page.
