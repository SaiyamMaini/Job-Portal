function deleteJob(id) {
    const result = confirm("Are you sure you want to delete?");

    if (result) {
        fetch('/delete-job/' + id, {
            method: 'POST'
        }).then(res => {
            if (res.ok) {
                // Redirect to /jobs
                window.location.href = '/jobs';
            }
        });
    }
}