// libraries
import { FC } from "react";
import { Outlet } from "react-router-dom";

// components
import AppHeader from "../../components/app-header/app-header";

// styles
import styles from "./root.module.css";



const RootLayout: FC = () => {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>              
    </div>
  )
};

export default RootLayout;
