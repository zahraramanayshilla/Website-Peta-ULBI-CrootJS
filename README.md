# Peta Kawasan ULBI — CrootJS

Website peta interaktif untuk data GeoJSON ULBI, menggunakan `map.js` dari CrootJS. Tidak menggunakan Leaflet, Mapbox, Google Maps API, npm, atau bundler.

## Data yang ditampilkan

- `data/jalan.geojson`: **20 LineString**. Enam jalur LineString pada file sumber dipecah menjadi 20 segmen yang tetap mengikuti urutan koordinat asli.
- `data/bangunan.geojson`: **27 Polygon**. Semua poligon pada file sumber dipertahankan.
- `data/lokasi.geojson`: **20 Point**. Semua 15 point asli dipertahankan dan ditambah 5 titik pusat poligon yang berasal dari koordinat bangunan.
- `data/geojson_asli_ulbi.geojson`: salinan GeoJSON asli yang kamu berikan.

Total yang ditampilkan: 67 fitur dalam tiga lapisan (20 jalan + 27 bangunan + 20 titik).

Catatan: lima titik tambahan adalah titik pusat poligon, bukan fasilitas/POI yang telah diverifikasi. Poligon yang tidak memiliki nama diberi nama generik di properti agar bisa dibaca saat diklik. Koordinat objek asli tidak digeser.

## Fitur website

- Basemap tile dan peta interaktif menggunakan CrootJS `map.js`
- Pan dan zoom
- Lapisan jalan, bangunan, dan titik bisa dinyalakan/dimatikan
- Popup atribut GeoJSON
- Tombol untuk menampilkan semua data
- HTML, CSS, dan JavaScript terpisah
- Bisa di-host sebagai website statis di GitHub Pages

## Menjalankan lokal

Jangan membuka `index.html` dengan `file://`, karena browser bisa memblokir `fetch()` untuk GeoJSON. Jalankan server lokal dari folder project:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Deploy GitHub Pages

1. Upload semua isi folder project ini ke root repository GitHub.
2. Buka **Settings → Pages**.
3. Pilih **Deploy from a branch**.
4. Pilih branch `main` dan folder `/(root)`, lalu **Save**.
5. Setelah deployment selesai, buka URL GitHub Pages yang ditampilkan.

## CrootJS

Modul peta diimpor dari CDN jsDelivr:

`https://cdn.jsdelivr.net/gh/crootjs/lib@0.0.16/map.js`

Dokumentasi: https://croot.js.org/docs/


## Penamaan lokasi
Nama beberapa titik diperbarui mengikuti label yang terlihat pada tangkapan layar Google Maps ULBI yang diberikan pengguna. Nama yang belum dapat dipastikan ditandai sebagai perlu verifikasi; jangan dianggap sebagai hasil survei resmi. Data bangunan mempertahankan 27 polygon asli.
