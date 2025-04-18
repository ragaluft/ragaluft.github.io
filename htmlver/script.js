let parkiran = JSON.parse(localStorage.getItem("parkiran")) || [];
let pendapatanTotal = parseInt(localStorage.getItem("pendapatanTotal")) || 0;
const tarifPerJam = 5000;
const kapasitasMax = 30;
let ck = localStorage.getItem("logindata");

if(ck == "ada") {
	
} else {
	$(document).ready(function () {
		$("#modalAwal").modal("show");
	});
}
function kendaraanMasuk() {
    let platNomor = document.getElementById("platNomor").value.toUpperCase().trim();
    
    if (platNomor === "") {
        alert("Harap masukkan plat nomor!");
        return;
    }

    if (parkiran.length >= kapasitasMax) {
        alert("Parkiran penuh!");
        return;
    }

    let waktuMasuk = new Date();
    let waktuFormat = waktuMasuk.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    parkiran.push({ platNomor, waktuMasuk: waktuMasuk.getTime(), waktuFormat });

    saveData();
    updateTampilan();
    document.getElementById("platNomor").value = "";
}

function kendaraanKeluar(index) {
    let kendaraan = parkiran[index];

    let waktuKeluar = new Date();
    let waktuMasuk = kendaraan.waktuMasuk;

    let durasiJam = Math.ceil((waktuKeluar - waktuMasuk) / (1000 * 60 * 60));
    let biaya = durasiJam * tarifPerJam;

    pendapatanTotal += biaya;
    alert(`Kendaraan ${kendaraan.platNomor} keluar.\nWaktu Masuk: ${kendaraan.waktuFormat}\nWaktu Keluar: ${waktuKeluar.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}\nDurasi: ${durasiJam} jam\nBiaya: Rp${biaya}`);

    parkiran.splice(index, 1);
    saveData();
    updateTampilan();
}

function tarikDana() {
    let nomorTujuan = "08951112234";
    let jumlahTarik = prompt("Masukkan jumlah yang ingin ditarik:");

    if (!jumlahTarik || isNaN(jumlahTarik) || jumlahTarik <= 0) {
        alert("Jumlah tidak valid! Masukkan angka yang benar.");
        return;
    }

    jumlahTarik = parseInt(jumlahTarik);

    if (jumlahTarik > pendapatanTotal) {
        alert("Saldo tidak mencukupi!");
        return;
    }

    pendapatanTotal -= jumlahTarik;
    saveData();

    alert(`Dana sebesar Rp${jumlahTarik} akan dikirim ke nomor ${nomorTujuan}`);
    window.open(`https://link.dana.id/send?phone=${nomorTujuan}&amount=${jumlahTarik}`, "_blank");

    document.getElementById("pendapatan").innerText = pendapatanTotal;
}

function saveData() {
    localStorage.setItem("parkiran", JSON.stringify(parkiran));
    localStorage.setItem("pendapatanTotal", pendapatanTotal);
}
function logout() {
	localStorage.removeItem("logindata");
	location.reload();
}
function updateTampilan() {
    let area = document.getElementById("parkirArea");
    area.innerHTML = "";

    for (let i = 0; i < kapasitasMax; i++) {
        let slot = document.createElement("div");
        slot.className = "slot";

        if (parkiran[i]) {
            slot.classList.add("terisi");
            slot.innerHTML = `
                <div class="plat-nomor">${parkiran[i].platNomor}</div>
                <div class="waktu-masuk">Masuk: ${parkiran[i].waktuFormat}</div>
                <img src="pngegg.png" alt="mobil">
                <button class="remove-btn" onclick="kendaraanKeluar(${i})">Keluar</button>
            `;
        }
        
        area.appendChild(slot);
    }

    document.getElementById("pendapatan").innerText = pendapatanTotal;
    document.getElementById("statusParkir").innerText = `Slot Tersedia: ${kapasitasMax - parkiran.length}`;
}
var textpwsalah = document.getElementById("textpwsalah");
textpwsalah.style.display = "none";
function sendPassAwal() {
    let pwhandler = document.getElementById("passdata").value;
    
    if(pwhandler == "arjun") {
        $(document).ready(function () {
            $("#modalAwal").modal("hide");
        });
		localStorage.setItem("logindata", "ada");
    } else {
        textpwsalah.style.display = "block";
    }
}
// Perbarui tampilan saat halaman dimuat ulang
updateTampilan();

