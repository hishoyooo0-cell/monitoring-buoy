MONITORINGBUOY WEBSITE

FILES
- index.html: Home
- mission.html: Our Mission
- project.html: Our Project, map satelit, mechanical/electrical, how it works, maintenance
- data.html: dashboard Ancol dan Cilincing
- style.css: desain, responsivitas, animasi
- script.js: navigasi, carousel, peta satelit, tab buoy
- data-dashboard.js: grafik dan tabel contoh untuk masing-masing buoy

CARA MENJALANKAN
1. Ekstrak ZIP ke folder.
2. Buka folder di VS Code.
3. Jalankan index.html dengan ekstensi Live Server agar file dan resource eksternal lebih konsisten.
4. Pastikan koneksi internet tersedia untuk Google Fonts, video, gambar, Leaflet, peta satelit Esri, dan Chart.js.

PENTING
- Semua data pada dashboard masih DATA ILUSTRATIF, bukan data sensor aktual. Ganti arrays di data-dashboard.js dengan data tervalidasi atau endpoint API sebelum publikasi.
- Threshold status Buruk/Sedang/Baik di data-dashboard.js hanya contoh UI dan wajib diganti dengan acuan yang disepakati/berlaku.
- Titik peta Ancol/Cilincing hanya area referensi, bukan titik deployment final. Ubah data-lat dan data-lng setelah koordinat benar tersedia.
- Angka dimensi mekanik bertanda * adalah angka contoh untuk layout, bukan spesifikasi konstruksi final.
- Slot gambar mekanik masih placeholder.
- Link media sosial masih placeholder; ganti dengan akun resmi MIT+R IPB.
- Data aktual memerlukan integrasi backend/API atau koneksi ke server; halaman statis ini tidak otomatis membaca MySQL.
