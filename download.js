import { execFile } from 'child_process';
import { createReadStream } from 'fs';
import path from 'path';

export default async function (req, res) {
  const url = req.query.url;
  if (!url) {
    res.status(400).send('Missing URL');
    return;
  }
  const ytPath = path.join(process.cwd(), 'yt-dlp'); // Binary must be uploaded here
  const outputPath = path.join('/tmp', 'video.mp4');

  try {
    await new Promise((resolve, reject) => {
      execFile(ytPath, ['-f', 'best', '-o', outputPath, url], (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    const stream = createReadStream(outputPath);
    res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
    res.setHeader('Content-Type', 'video/mp4');
    stream.pipe(res);
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).send('Download failed');
  }
}
