function sendAgainEmail(id, email) {
    fetch(basePath + "/utils/sendconfirmemail.php", {
        method: 'POST',
        credentials: 'include',
        id:id
    }).then(response => {
        console.log(response);
    });
}