# Quick Setup Guide 🚀

Follow these steps to deploy your AI portfolio to GitHub Pages:

## 1. Create GitHub Repository

1. **Create a new repository** on GitHub with the name: `yourusername.github.io`
   - Replace `yourusername` with your actual GitHub username
   - Make it public
   - Don't initialize with README (we already have one)

## 2. Initialize Git and Push

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Modern AI Portfolio"

# Add remote origin (replace with your GitHub username)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git push -u origin main
```

## 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select "Deploy from a branch"
5. Select **main** branch and **/ (root)** folder
6. Click **Save**

## 4. Update Personal Information

Edit the following files with your information:

### `index.html`
- Update contact information
- Modify professional summary
- Add your projects and achievements
- Update social media links

### `assets/css/style.css`
- Customize colors if desired
- Adjust animations to your preference

### `_config.yml`
- Update GitHub username and repository name
- Modify SEO settings

## 5. Optional Customizations

### Add Your Profile Picture
- Add your photo to `assets/images/profile.jpg`
- Update the hero section to include your image

### Custom Domain (Optional)
- Create a `CNAME` file in the root directory
- Add your custom domain name
- Configure DNS settings with your domain provider

### Analytics (Optional)
- Add Google Analytics tracking ID in `_config.yml`
- Uncomment the analytics line and add your ID

## 6. Testing Locally

```bash
# Install Jekyll (if not installed)
gem install bundler jekyll

# Create Gemfile
echo 'source "https://rubygems.org"' > Gemfile
echo 'gem "github-pages", group: :jekyll_plugins' >> Gemfile

# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Open in browser
# Navigate to http://localhost:4000
```

## 7. Maintenance

### Regular Updates
- Keep your projects section updated
- Add new achievements and certifications
- Update skills and technologies
- Refresh content regularly

### Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Optimize images if needed

## 8. SEO Optimization

- Submit sitemap to Google Search Console
- Add structured data markup
- Optimize meta descriptions
- Build quality backlinks

## Troubleshooting

### Common Issues

**Pages not loading:**
- Check if GitHub Pages is enabled
- Verify repository name format
- Ensure main branch is selected

**CSS/JS not loading:**
- Check file paths are relative
- Verify assets are committed to repository
- Clear browser cache

**Mobile responsiveness:**
- Test on various devices
- Use browser developer tools
- Check viewport meta tag

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Review GitHub Pages build logs
3. Verify all file paths are correct
4. Test locally before pushing changes

---

**Your portfolio will be live at:** `https://yourusername.github.io`

🎉 **Congratulations! Your AI portfolio is ready to showcase your expertise!** 