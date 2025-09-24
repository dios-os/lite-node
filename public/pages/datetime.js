function updateDateTime(){
    const now = new Date();
    const date = now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById("current-date").textContent = date;
    document.getElementById("current-time").textContent = time;
}

updateDateTime();
setInterval(updateDateTime, 1000);