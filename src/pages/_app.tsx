import "../styles/globals.css";
import { AuthProvider } from "../data/context/AuthContext";
import { AppProvider } from "../data/context/AppContext";

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </AuthProvider>
    );
}

export default MyApp;
