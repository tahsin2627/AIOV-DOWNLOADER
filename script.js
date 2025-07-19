function download() {
  const url = document.getElementById('videoUrl').value;
  document.getElementById('status').innerText = 'Processing...';

  fetch('https://your-vercel-url/api/download?url=' + encodeURIComponent(url))
    .then(res => res.blob())
    .then(blob => {
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'video.mp4';
      a.click();
      document.getElementById('status').innerText = 'Downloaded!';
    })
    .catch(() => {
      document.getElementById('status').innerText = 'Error!';
    });
}
