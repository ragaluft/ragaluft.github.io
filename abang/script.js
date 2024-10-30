
let loveCount = 0;

$("#love-btn").on("click", function() {
    loveCount++;
    $("#love-count").text(loveCount);
    $("#pesan").text("Semoga panjang umur dan sehat selalu.moga bisa lebih baik lagi kedepannya." + loveCount + "x)");

    // Menambahkan animasi bunga
    const flower = $("<div class='flower'>🌸</div >");
    flower.css({
        left: Math.random() * 100 + "vw", // Posisi acak di lebar viewport
        bottom: "0px" // Mulai dari bawah
    });
    $(".container").append(flower);

    // Menambahkan animasi hati
    const heart = $("<div class='heart'>❤️</div>");
    heart.css({
        left: Math.random() * 100 + "vw", // Posisi acak di lebar viewport
        bottom: "0px" // Mulai dari bawah
    });
    $(".container").append(heart);

    // Menambahkan animasi kembang api
    for (let i = 0; i < 10; i++) {
        const firework = $("<div class='firework'></div>");
        firework.css({
            left: Math.random() * 100 + "vw", // Posisi acak di lebar viewport
            top: Math.random() * 100 + "vh" // Posisi acak di tinggi viewport
        });
        $(".container").append(firework);
    }

    // Menghapus bunga, hati, dan kembang api setelah animasi selesai
    setTimeout(() => {
        flower.remove();
        heart.remove();
        $(".firework").remove();
    }, 1000);
    });
    $(document).ready(function() {
        let audio = document.getElementById("audio");
        function suara(){audio.play}
    });
    let audio = document.getElementById("audio");
    function suara(){audio.play()}
