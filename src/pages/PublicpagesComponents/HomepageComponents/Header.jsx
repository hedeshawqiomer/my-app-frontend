import React from "react";
import { useTranslation } from "react-i18next";

function Header(){
  const { t } = useTranslation();
      return(
            
              <header className="masthead">
  <div className="container px-4 px-lg-5 h-100">
    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
      <div className="col-lg-8 align-self-end">
        <h1
          style={{
            color: "black",
            fontWeight: "84px"
          }}
        >
          {t('home.title')}
        </h1>
        <hr className="divider" />
      </div>
      <div className="col-lg-8 align-self-baseline">
        <a className="btn-dark " href="#heroSection">
          {t('home.findMore')}
        </a>
      </div>
    </div>
  </div>
</header>
            
      )
}
export default Header