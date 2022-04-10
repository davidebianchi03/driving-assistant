function sendAgainEmail(id, email) {

    var formData = new FormData();
    formData.append('id', id);

    fetch(basePath + "/utils/sendconfirmemail.php", {
        method: 'POST',
        credentials: 'include',
        body: formData
    }).then(response => response.json())
        .then(data => {
            // console.log(data);
        });
}