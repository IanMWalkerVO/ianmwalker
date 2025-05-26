# Ian M. Walker - Voice Artist Portfolio

This repository contains the source code for Ian M. Walker's voice artist portfolio website. The site showcases audiobook work and provides an interactive audio player for samples.

## Adding New Albums

To add a new album to the portfolio, follow these steps:

1. **Prepare the Assets**
   - Save the album cover image (preferably square) in the `img` folder
   - Save the audio sample (MP3 format) in the `audio` folder
   - Recommended image size: 500x500 pixels
   - Recommended audio length: 30-60 seconds

2. **Edit the HTML**
   - Open `index.html`
   - Locate the album grid section (look for `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">`)
   - Copy an existing album card template
   - Paste it within the grid section
   - Update the following elements:

```html
<div class="col">
    <div class="album-card" data-audio="audio/YOUR-AUDIO-FILE.mp3">
        <div class="card h-100">
            <div class="card-img-container">
                <img src="img/YOUR-IMAGE-FILE.jpg" class="card-img-top" alt="Album Title">
                <div class="card-img-overlay">
                    <div class="play-overlay">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title text-truncate">Album Title</h5>
                <p class="card-text">Role Description</p>
                <div class="purchase-links">
                    <a href="PURCHASE-URL" target="_blank" class="btn btn-sm btn-outline-primary">
                        Store Name
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
```

3. **Test Locally**
   - Open the website in a browser
   - Check that the image loads correctly
   - Test the audio playback
   - Verify all purchase links

## Using GitHub Desktop to Update the Site

1. **Make Your Changes**
   - Edit files in your preferred editor
   - Add new files to the appropriate folders
   - Test all changes locally

2. **Commit Changes**
   - Open GitHub Desktop
   - Review changed files in the left panel
   - Add a summary (e.g., "Added new audiobook: Book Title")
   - Add a description if needed
   - Click "Commit to main"

3. **Push to GitHub**
   - Click "Push origin" to upload your changes
   - Your changes will be live on the website shortly

4. **Stay Updated**
   - Click "Fetch origin" regularly to check for changes
   - Click "Pull origin" to download any updates

### Tips

- Test all changes locally before committing
- Write clear commit messages
- Keep audio samples short (30-60 seconds)
- Optimize images before adding them
- Fetch and pull regularly to stay up to date

## Support

If you need help or have questions, please contact the site administrator. 