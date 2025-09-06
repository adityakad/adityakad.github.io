# CI/CD Pipeline Documentation

This repository uses a comprehensive CI/CD pipeline built with GitHub Actions to automate building, testing, and deploying the Jekyll-based portfolio website.

## Pipeline Overview

The CI/CD pipeline consists of multiple workflows that ensure code quality, security, and reliable deployments:

### 🔄 Main CI/CD Pipeline (`ci.yml`)

**Triggers:** Push to main/master, Pull Requests, Manual dispatch

**Jobs:**
1. **Build** - Builds the Jekyll site with caching
2. **Quality** - Runs HTML validation and testing
3. **Security** - Performs vulnerability scanning with Trivy
4. **Deploy** - Deploys to GitHub Pages (production only)
5. **Lighthouse** - Runs performance audits post-deployment

### 🔍 Code Quality Pipeline (`code-quality.yml`)

**Triggers:** Push to main/master, Pull Requests

**Features:**
- Markdown linting with markdownlint
- CSS linting with stylelint
- JavaScript linting with ESLint
- Spell checking with CSpell
- Accessibility testing with axe-core

### 👁️ Pull Request Preview (`pr-preview.yml`)

**Triggers:** Pull Request events

**Features:**
- Builds preview deployments for pull requests
- Deploys to Netlify for staging review
- Automatically comments on PR with preview URL

## Setup Requirements

### Repository Secrets

For full functionality, configure these repository secrets:

```
NETLIFY_AUTH_TOKEN  # For PR preview deployments
NETLIFY_SITE_ID     # For PR preview deployments
```

### GitHub Pages Configuration

1. Go to repository Settings → Pages
2. Select "GitHub Actions" as the source
3. The pipeline will automatically deploy to GitHub Pages

## Workflow Features

### 🚀 Performance Optimizations

- **Dependency Caching**: Ruby gems and Jekyll cache for faster builds
- **Parallel Jobs**: Quality checks run in parallel with main build
- **Incremental Builds**: Smart caching strategies

### 🔒 Security Features

- **Vulnerability Scanning**: Trivy scans for security issues
- **Dependency Updates**: Dependabot keeps dependencies current
- **SARIF Upload**: Security results integrated with GitHub Security tab

### 📊 Quality Assurance

- **HTML Validation**: HTML Proofer checks markup quality
- **Link Checking**: Validates internal links and images
- **Accessibility**: Automated a11y testing
- **Performance**: Lighthouse CI audits

### 🔧 Development Experience

- **PR Previews**: Automatic staging deployments for review
- **Code Quality**: Automated linting and formatting checks
- **Spell Check**: Content validation for typos
- **Fast Feedback**: Quick CI/CD pipeline execution

## Local Development

To run the site locally:

```bash
# Install dependencies
bundle install

# Serve the site locally
bundle exec jekyll serve

# Build the site
bundle exec jekyll build
```

## Pipeline Status

All workflows include proper status reporting and can be monitored from the Actions tab.

### Branch Protection

For production stability, consider setting up branch protection rules:

1. Require status checks to pass before merging
2. Require branches to be up to date before merging
3. Require review from code owners

## Customization

### Adding New Checks

To add new quality checks:

1. Edit `.github/workflows/code-quality.yml`
2. Add new job or step for your check
3. Configure any required tools or dependencies

### Modifying Deployment

To change deployment targets:

1. Edit the `deploy` job in `.github/workflows/ci.yml`
2. Update environment configuration
3. Add necessary secrets and permissions

### Performance Budgets

Lighthouse CI thresholds can be adjusted in `.lighthouserc.js`:

- Performance: Currently set to 80%
- Accessibility: Currently set to 90%
- Best Practices: Currently set to 80%
- SEO: Currently set to 80%

## Troubleshooting

### Common Issues

1. **Build Failures**: Check Ruby version compatibility and Gemfile.lock
2. **Deployment Issues**: Verify GitHub Pages configuration and permissions
3. **Quality Check Failures**: Review specific linter output and fix issues
4. **Security Alerts**: Address Trivy findings or add exceptions if needed

### Getting Help

- Check the Actions tab for detailed logs
- Review the specific workflow file for configuration
- Consult Jekyll and GitHub Pages documentation
- Check dependency documentation for specific tools

## Contributing

When contributing to this repository:

1. All CI/CD checks must pass
2. PR previews are automatically generated
3. Code quality standards are enforced
4. Security scanning is mandatory

The pipeline ensures consistent quality and security across all contributions.