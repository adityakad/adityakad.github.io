#!/bin/bash

# CI/CD Pipeline Test Script
# This script validates the CI/CD pipeline configuration files

echo "🔍 Testing CI/CD Pipeline Configuration..."
echo

# Test YAML syntax
echo "📝 Validating YAML syntax..."
for file in .github/workflows/*.yml .github/dependabot.yml; do
    if python3 -c "import yaml; yaml.safe_load(open('$file'))" 2>/dev/null; then
        echo "✅ $file - Valid YAML"
    else
        echo "❌ $file - Invalid YAML"
        exit 1
    fi
done

# Test JSON syntax
echo
echo "📄 Validating JSON syntax..."
for file in .cspell.json; do
    if python3 -c "import json; json.load(open('$file'))" 2>/dev/null; then
        echo "✅ $file - Valid JSON"
    else
        echo "❌ $file - Invalid JSON"
        exit 1
    fi
done

# Test JavaScript syntax
echo
echo "🟨 Validating JavaScript syntax..."
if node -e "require('./.lighthouserc.js')" 2>/dev/null; then
    echo "✅ .lighthouserc.js - Valid JavaScript"
else
    echo "❌ .lighthouserc.js - Invalid JavaScript"
    exit 1
fi

# Check required files exist
echo
echo "📂 Checking required files..."
required_files=(
    ".github/workflows/ci.yml"
    ".github/workflows/code-quality.yml"
    ".github/workflows/pr-preview.yml"
    ".github/dependabot.yml"
    ".lighthouserc.js"
    ".cspell.json"
    "CI_CD_README.md"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - Found"
    else
        echo "❌ $file - Missing"
        exit 1
    fi
done

# Check workflow triggers
echo
echo "⚡ Checking workflow triggers..."
if grep -q "on:" .github/workflows/ci.yml; then
    echo "✅ CI workflow has triggers configured"
else
    echo "❌ CI workflow missing triggers"
    exit 1
fi

if grep -q "pull_request:" .github/workflows/code-quality.yml; then
    echo "✅ Code quality workflow has PR triggers"
else
    echo "❌ Code quality workflow missing PR triggers"
    exit 1
fi

# Check permissions
echo
echo "🔐 Checking workflow permissions..."
if grep -q "permissions:" .github/workflows/ci.yml; then
    echo "✅ CI workflow has permissions configured"
else
    echo "❌ CI workflow missing permissions"
    exit 1
fi

# Check Jekyll configuration
echo
echo "🏗️ Checking Jekyll configuration..."
if [ -f "_config.yml" ]; then
    echo "✅ Jekyll config found"
    if grep -q "plugins:" _config.yml; then
        echo "✅ Jekyll plugins configured"
    else
        echo "⚠️ No Jekyll plugins found"
    fi
else
    echo "❌ Jekyll config missing"
    exit 1
fi

echo
echo "🎉 All CI/CD pipeline tests passed!"
echo "📋 Pipeline includes:"
echo "   • Main CI/CD with build, quality, security, and deployment"
echo "   • Code quality checks with linting and accessibility testing"
echo "   • Pull request preview deployments"
echo "   • Automated dependency updates"
echo "   • Performance monitoring with Lighthouse"
echo
echo "🚀 Ready to deploy!"