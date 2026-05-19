// ==========================================
// FUNGSI NAVIGASI MENU UTAMA
// ==========================================
function bukaMenu(idMenu) {
    // 1. Sembunyikan semua menu yang memiliki class 'konten-menu'
    const semuaMenu = document.querySelectorAll('.konten-menu');
    semuaMenu.forEach(menu => menu.classList.add('hidden'));
    
    // 2. Tampilkan menu tujuan berdasarkan ID yang dipilih
    const menuTujuan = document.getElementById(idMenu);
    if (menuTujuan) {
        menuTujuan.classList.remove('hidden');
        
        // Efek scroll halus menuju menu yang dibuka
        menuTujuan.scrollIntoView({ behavior: 'smooth' });
    }
}

// Catatan: Fungsi logika game lama (cariPrimaTerkecil, mulaiGameBaru, prosesJawaban, dll) 
// sudah dihapus karena sistem game sekarang sepenuhnya berjalan di dalam iFrame (Spin the Wheel).