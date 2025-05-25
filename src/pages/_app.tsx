
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/components/store/store"; 
 import { ToastContainer} from 'react-toastify';
export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <ToastContainer position="top-right" autoClose={1000} />
    <Component {...pageProps} />
    </Provider>;
    
}
