// Fungsi Navigasi Menu
function bukaMenu(idMenu) {
    const semuaMenu = document.querySelectorAll('.konten-menu');
    semuaMenu.forEach(menu => menu.classList.add('hidden'));
    
    const menuTujuan = document.getElementById(idMenu);
    if (menuTujuan) {
        menuTujuan.classList.remove('hidden');
        menuTujuan.scrollIntoView({ behavior: 'smooth' });
    }
}

// Daftar angka tantangan yang seru untuk dibuat pohon faktor (bisa ditambah sesuka hati)
const daftarAngkaTantangan = [12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 50];

let angkaAwal = 0;
let angkaSekarang = 0;
let riwayatFaktor = [];

// Fungsi untuk mengecek bilangan prima paling kecil yang bisa membagi sebuah angka
function cariPrimaTerkecil(n) {
    if (n % 2 === 0) return 2;
    for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) return i;
    }
    return n;
}

// Memulai Game Dengan Angka Acak Baru
function mulaiGameBaru() {
    // 1. Pilih angka secara acak dari daftar tantangan
    const indeksAcak = Math.floor(Math.random() * daftarAngkaTantangan.length);
    angkaAwal = daftarAngkaTantangan[indeksAcak];
    angkaSekarang = angkaAwal;
    riwayatFaktor = [];

    // 2. Reset Tampilan UI/Elemen HTML
    document.getElementById('game-target-angka').innerText = angkaAwal;
    document.getElementById('text-angka-skrg').innerText = angkaSekarang;
    document.getElementById('input-prima').value = '';
    document.getElementById('input-hasil').value = '';
    document.getElementById('game-feedback').innerText = '';
    document.getElementById('log-cabang-pohon').innerHTML = '';
    
    document.getElementById('game-input-box').classList.remove('hidden');
    document.getElementById('visual-pohon-container').classList.add('hidden');
    document.getElementById('game-selesai-box').classList.add('hidden');
}

// Fungsi utama memproses jawaban anak-anak tiap tahap
function prosesJawaban() {
    const inputPrima = parseInt(document.getElementById('input-prima').value);
    const inputHasil = parseInt(document.getElementById('input-hasil').value);
    const feedback = document.getElementById('game-feedback');

    if (isNaN(inputPrima) || isNaN(inputHasil)) {
        feedback.className = "text-amber-500 font-bold mt-2";
        feedback.innerText = "❌ Isinya jangan kosong ya, yuk dicoba!";
        return;
    }

    // Hitung kunci jawaban yang benar secara matematis
    const primaBenar = cariPrimaTerkecil(angkaSekarang);
    const hasilBenar = angkaSekarang / primaBenar;

    // Validasi Jawaban Pengguna
    if (inputPrima === primaBenar && inputHasil === hasilBenar) {
        // Jawaban Benar!
        riwayatFaktor.push(inputPrima);
        
        // Tampilkan kontainer pohonnya jika baru pertama tumbuh
        document.getElementById('visual-pohon-container').classList.remove('hidden');
        
        // Suntikkan struktur log cabang pohon visual sederhana
        const logBox = document.getElementById('log-cabang-pohon');
        logBox.innerHTML += `
            <div class="flex justify-center items-center gap-4 my-1">
                <span class="bg-amber-400 text-white px-3 py-1 rounded-full text-sm">🟢 Prima: ${inputPrima}</span>
                <span class="text-slate-400">➔</span>
                <span class="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm">Sisa: ${inputHasil}</span>
            </div>
        `;

        feedback.className = "text-emerald-500 font-bold mt-2";
        feedback.innerText = "🎉 Keren! Cabang pohonmu berhasil tumbuh!";

        // Cek apakah angka sisanya sudah merupakan bilangan prima juga (Game Selesai)
        if (cariPrimaTerkecil(inputHasil) === inputHasil) {
            riwayatFaktor.push(inputHasil);
            selesaikanGame();
        } else {
            // Jika belum prima, lanjut ke tahap pembagian berikutnya
            angkaSekarang = inputHasil;
            document.getElementById('text-angka-skrg').innerText = angkaSekarang;
            document.getElementById('input-prima').value = '';
            document.getElementById('input-hasil').value = '';
        }

    } else {
        // Jawaban Salah
        feedback.className = "text-rose-500 font-bold mt-2";
        feedback.innerText = "❌ Ups! Coba hitung lagi bilangan prima terkecil yang tepat ya.";
    }
}

// Fungsi ketika pohon sudah mentok ke bilangan prima terakhir
function selesaikanGame() {
    document.getElementById('game-input-box').classList.add('hidden');
    document.getElementById('game-selesai-box').classList.remove('hidden');

    // Menggabungkan susunan perkalian faktorisasi prima secara urut (contoh: 2 x 2 x 3)
    const teksPerkalian = riwayatFaktor.join(' × ');
    
    // Menghitung ringkasan format pangkat (contoh: 2² × 3)
    const hitungPangkat = {};
    riwayatFaktor.forEach(num => { hitungPangkat[num] = (hitungPangkat[num] || 0) + 1; });
    
    const teksPangkatObj = Object.keys(hitungPangkat).map(num => {
        const pangkat = hitungPangkat[num];
        return pangkat > 1 ? `${num}<sup>${pangkat}</sup>` : `${num}`;
    });
    const teksPangkat = teksPangkatObj.join(' × ');

    document.getElementById('text-faktorisasi-akhir').innerHTML = `${teksPerkalian} = ${teksPangkat}`;
}

// Jalankan fungsi ini otomatis saat halaman pertama kali dimuat agar langsung mendapat angka acak
window.addEventListener('DOMContentLoaded', (event) => {
    // Jika fungsi membuka menu Anda langsung mentrigger, pastikan panggil mulaiGameBaru() di dalamnya atau di sini
    mulaiGameBaru();
});