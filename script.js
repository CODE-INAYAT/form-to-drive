const form = document.getElementById("form");
const loadingDiv = document.getElementById("loading");
const successDiv = document.getElementById("success");
const okButton = document.getElementById("okButton");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    loadingDiv.style.display = "flex"; // Show loading screen

    const file = form.file.files[0];
    const fr = new FileReader();

    fr.readAsArrayBuffer(file);

    fr.onload = (f) => {
        const url = "https://script.google.com/macros/s/AKfycbyut9Pel1vdfQ_R3MDxm6-T2K_giK2NWjbvf1INLMsb0aP4E4MCHEgOQ5IRPtV6bcjyqQ/exec";

        const qs = new URLSearchParams({
            filename: file.name,
            mimeType: file.type,
        });

        fetch(`${url}?${qs}`, {
            method: "POST",
            body: JSON.stringify([...new Int8Array(f.target.result)]),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data); // Log the response data
                successDiv.style.display = "flex"; // Show success message
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                loadingDiv.style.display = "none"; // Hide loading screen
            });
    };
});

// Add an event listener to the "OK" button
okButton.addEventListener("click", () => {
    successDiv.style.display = "none"; // Hide success message
    form.reset(); // Reset the form
});

document.addEventListener('DOMContentLoaded', function () {
    const formOverlay = document.getElementById('formOverlay');
    const mainContent = document.querySelector('.container');
    const accessForm = document.getElementById('accessForm');
    const continueButton = document.getElementById('continueButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const buttonText = document.getElementById('buttonText');
    const buttonArrow = document.getElementById('buttonArrow');

    // Hide main content initially
    mainContent.style.display = 'none';

    accessForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const accessKey = document.getElementById('accessKey').value;

        // Show loading spinner
        loadingSpinner.classList.remove('hidden');
        buttonText.textContent = 'Verifying...';
        buttonArrow.classList.add('hidden');

        // Simulate API call delay
        setTimeout(() => {
            if (accessKey === 'DRUP29V04') {
                formOverlay.style.display = 'none';
                mainContent.style.display = 'flex';
            } else {
                alert('Incorrect access key. Please try again.');
                loadingSpinner.classList.add('hidden');
                buttonText.textContent = 'Continue';
                buttonArrow.classList.remove('hidden');
            }
        }, 1500);
    });
});

function removeSpaces(input) {
    input.value = input.value.replace(/\s/g, '')
        .toUpperCase();
}

//Copy restriction
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('copy', function (e) {
    e.preventDefault();
    alert('Copying text is not allowed on this page.');
});

//DMR win&Max
document.addEventListener('keydown', function (e) {
    // Disable F12 key (developer tools)
    if (e.keyCode === 123) {
        e.preventDefault();
    }
    // Disable Ctrl+Shift+I and Ctrl+Shift+J (developer tools) for Windows
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) {
        e.preventDefault();
    }
    // Disable Command+Option+I and Command+Option+J (developer tools) for macOS
    if (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74)) {
        e.preventDefault();
    }
    // Disable Ctrl+U (view source) for Windows
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
    }
    // Disable Command+Option+U (view source) for macOS
    if (e.metaKey && e.altKey && e.keyCode === 85) {
        e.preventDefault();
    }
});

//Screenshot restriction to some extent
document.addEventListener('keyup', function (e) {
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots can not be taken.');
    }
});

//Ctr+P restriction win&Mac
document.addEventListener('keydown', function (e) {
    // Check for Ctrl+P on Windows and Command+P on macOS
    if ((e.ctrlKey && e.key === 'p') || (e.metaKey && e.key === 'p')) {
        e.preventDefault();
        alert('Printing is disabled on this page.');
    }
});

//script to disable right click on the page
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });
});
