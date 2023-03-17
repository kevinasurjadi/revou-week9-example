function toggleMobileMenu() {
    let mobileMenuButton = document.getElementById('m-menu-button');
    let mobileMenu = document.getElementById('m-menu')
    if (mobileMenuButton.children[1].classList.contains('block')) {
        mobileMenuButton.children[1].classList.replace('block', 'hidden');
        mobileMenuButton.children[2].classList.replace('hidden', 'block');
        mobileMenu.classList.replace('hidden', 'block');
    } else {
        mobileMenuButton.children[1].classList.replace('hidden', 'block');
        mobileMenuButton.children[2].classList.replace('block', 'hidden');
        mobileMenu.classList.replace('block', 'hidden');
    }
}
