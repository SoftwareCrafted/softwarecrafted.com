---
title: "How to Set Up a CI/CD Pipeline with GitHub Actions"
date: "2026-02-11"
category: "software-development"
author: "Kithmi"
format: "how-to"
lead_answer: "Set up a CI/CD pipeline by creating a .github/workflows YAML file that defines triggers (push/PR), jobs (test, build, deploy), and steps using GitHub Actions marketplace actions. A basic pipeline runs tests on every push and deploys on merge to main."
tldr: "Set up a CI/CD pipeline by creating a .github/workflows YAML file that defines triggers (push/PR), jobs (test, build, deploy), and steps using GitHub Actions marketplace actions. A basic pipeline runs tests on every push and deploys on merge to main."
excerpt: "A step-by-step guide to building a production-ready CI/CD pipeline with GitHub Actions — from your first workflow file to automated deployments."
readTime: "8 min read"
estimatedTime: "30 minutes"
tags: ["ci-cd", "github-actions", "devops", "automation", "deployment"]
steps:
  - title: "Create the workflow file"
    description: "Create .github/workflows/ci.yml in your repository"
  - title: "Define triggers"
    description: "Configure when the pipeline runs (push, pull_request, schedule)"
  - title: "Add test job"
    description: "Set up a job that installs dependencies and runs your test suite"
  - title: "Add build job"
    description: "Add a build step that compiles or bundles your application"
  - title: "Add deploy job"
    description: "Configure deployment to your hosting platform on merge to main"
  - title: "Add status badges and notifications"
    description: "Show build status in your README and set up failure alerts"
faqs:
  - question: "Is GitHub Actions free?"
    answer: "GitHub Actions is free for public repositories. Private repos get 2,000 minutes/month on the free tier, with additional minutes available on paid plans."
  - question: "Can I run GitHub Actions locally?"
    answer: "Yes, you can use the 'act' tool (https://github.com/nektos/act) to run GitHub Actions workflows locally using Docker containers for testing before pushing."
source_title: "GitHub Docs: Understanding GitHub Actions"
source_url: "https://docs.github.com/en/actions/about-github-actions/understanding-github-actions"
source_license: "CC BY 4.0"
---

A well-configured CI/CD pipeline catches bugs early, enforces code quality, and automates deployments. GitHub Actions makes this accessible to every project with a simple YAML configuration.

## Prerequisites

- A GitHub repository with your project
- A test suite (any framework)
- Basic familiarity with YAML syntax

## Step 1: Create the Workflow File

Create the directory structure and workflow file:

```bash
mkdir -p .github/workflows
touch .github/workflows/ci.yml
```

## Step 2: Define Triggers

Specify when your pipeline runs:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

This runs the pipeline on every push to `main` and on every PR targeting `main`.

## Step 3: Add the Test Job

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linter
        run: npm run lint
```

## Step 4: Add the Build Job

```yaml
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install and build
        run: |
          npm ci
          npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist/
```

## Step 5: Add the Deploy Job

```yaml
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: build
          path: dist/

      - name: Deploy to production
        run: echo "Deploy your app here"
        # Replace with your actual deployment step
```

## Step 6: Add Status Badge

Add the build status badge to your README:

```markdown
![CI/CD](https://github.com/YOUR_USER/YOUR_REPO/actions/workflows/ci.yml/badge.svg)
```

## Quick Checklist

- [ ] Workflow file created at `.github/workflows/ci.yml`
- [ ] Triggers configured for push and PR events
- [ ] Test job runs your full test suite
- [ ] Build job produces deployment artifacts
- [ ] Deploy job runs only on merge to main
- [ ] Status badge added to README

## Conclusion

This pipeline gives you automated testing on every PR and automated deployment on merge to main. From here, you can add environment-specific deployments, caching optimizations, matrix testing across Node versions, and Slack/email notifications on failure.
