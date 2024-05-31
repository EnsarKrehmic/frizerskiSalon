import { useEffect } from 'react';

const useNavbar = () => {
  useEffect(() => {
    let navbar = document.querySelector('.header .navbar');
    let menuBtn = document.querySelector('#menu-btn');
    let closeBtn = document.querySelector('#close-navbar');

    const openNavbar = () => navbar.classList.add('active');
    const closeNavbar = () => navbar.classList.remove('active');
    const handleScroll = () => navbar.classList.remove('active');

    if (menuBtn) menuBtn.addEventListener('click', openNavbar);
    if (closeBtn) closeBtn.addEventListener('click', closeNavbar);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (menuBtn) menuBtn.removeEventListener('click', openNavbar);
      if (closeBtn) closeBtn.removeEventListener('click', closeNavbar);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useNavbar;