// libraries
import { Outlet } from "react-router-dom";

// components
import AppHeader from "../../components/app-header/app-header";

// styles
import styles from "./root.module.css";



function RootLayout() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main>
        <Outlet />
      </main>              
    </div>
  )
};

export default RootLayout;
