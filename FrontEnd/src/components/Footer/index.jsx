import React from "react";
import {
  FaFacebook,FaGoogle,FaInstagram,FaYoutubeSquare,FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import * as styles from "./footer.module.css";
import { FaLinkedin } from "react-icons/fa6";
export const Footer = () => {
  
  return (
     <div className={styles.Containerfooter}>

     
    <footer className={styles.footer}>
        <p className={styles.text}>
        Copyright NEKI 2025. Todos os direitos reservados.
        </p>
        <nav className={styles.icons} aria-label="Redes sociais">
            <a
              href="https://www.linkedin.com/company/unavailable/"
              target="_blank"
              rel="linkedin_neki"
              aria-label="Linkedin Neki"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://www.instagram.com/nekitechnologies/"
              target="_blank"
              rel="instagram_neki"
              aria-label="Instagram Neki"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="https://www.youtube.com/@nekitechnologies"
              target="_blank"
              rel="youtube_neki"
              aria-label="Youtube Neki"
            >
              <FaYoutube size={22} />
            </a>
            <a
              href="https://neki.com.br/"
              target="_blank"
              rel="site_neki"
              aria-label="Site da Neki"
            >
              <FaGoogle size={22} />
            </a>
            <a
              href="https://www.tiktok.com/@nekitechnologies"
              target="_blank"
              rel="tiktok_neki"
              aria-label="Tiktok da Neki"
            >
              <FaTiktok size={22} />
            </a>
          </nav>
    </footer>
    </div>
  );
};
