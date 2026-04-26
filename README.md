[![QA Pipeline](https://github.com/beratozyildiz/berat_ozyildiz_case/actions/workflows/ci.yml/badge.svg)](https://github.com/beratozyildiz/berat_ozyildiz_case/actions)

[View UI Test Report](https://beratozyildiz.github.io/berat_ozyildiz_case/ui-report/)

# QA Automation Assessment

Author: Berat Özyıldız

---

## 📌 Overview

This project demonstrates end-to-end QA automation covering:

- UI Testing (Playwright)
- API Testing (Playwright API)
- Load Testing (Locust)

The focus is on:

- Clean and maintainable architecture
- Stable and reliable test execution
- Handling real-world UI and system constraints

---

## 🧱 Tech Stack

| Area         | Tool               |
|--------------|--------------------|
| UI Testing   | Playwright         |
| API Testing  | Playwright         |
| Load Testing | Locust             |
| Languages    | TypeScript, Python |

---

## 📁 Project Structure

qa-assessment/  
├── ui-tests/  
├── api-tests/  
├── load-tests/  
└── README.md  

---

## 🌐 UI TESTS

### 🎯 Scope

- Navigate to careers page
- Expand teams and select Quality Assurance
- Validate open positions
- Filter jobs by location
- Validate job list content
- Apply to a job and verify redirect

---

### 🧠 Design Decisions

- Page Object Model (POM)
- Centralized locator management
- Use of `data-qa` attributes when available (stable selectors)
- Minimal and meaningful logging for debugging
- Avoid hardcoded waits — rely on UI state (expect, visibility, text changes)

---

### 🔍 Validation Strategy

Tests validate business intent instead of relying on exact UI text:

- Job relevance:
  - Accepts both "Quality Assurance" and "QA" roles
- Dynamic UI handling:
  - Waits for job counts to update to avoid transient "0 results"
- Location validation:
  - Ensures filtered results match expected location

---

### ▶️ Run

cd ui-tests  
npx playwright test  

---

## 🔗 API TESTS

Base API: https://petstore.swagger.io/

### 🎯 Scope

CRUD operations for /pet:

- Create
- Get
- Update
- Delete

---

### ❗ Notes

- API is loosely validated (known limitation)
- Some invalid payloads may still return 200
- Tests reflect actual API behavior instead of strict assumptions

---

### ▶️ Run

cd api-tests  
npx playwright test  

---

## 🚀 LOAD TESTS

Target: n11.com search functionality

---

### 🎯 Scenarios

Target (n11):
- Search with keyword
- Pagination
- Edge cases (empty / special characters)

Control (Validation):
- Health check via httpbin.org

---

### 🧠 Key Insight

- Health check → succeeds → framework works
- n11 requests → return 403 → blocked by bot protection

This is expected behavior for production systems protected by WAF/CDN.

---

### 📊 Result Interpretation

| Scenario     | Result        |
|--------------|---------------|
| Health Check | Successful    |
| n11 Search   | Blocked (403) |

Requests are blocked before reaching backend services.

---

### ▶️ Run

cd load-tests  
python -m locust  

Open UI:  
http://localhost:8089  

---

## ▶️ HOW TO RUN EVERYTHING

### 1️⃣ Install dependencies

UI & API:

npm install  
npx playwright install  

Load Tests:

cd load-tests  
pip install -r requirements.txt  

---

### 2️⃣ Run UI Tests

cd ui-tests  
npx playwright test  

---

### 3️⃣ Run API Tests

cd api-tests  
npx playwright test  

---

### 4️⃣ Run Load Tests

cd load-tests  
python -m locust  

---

## ⚙️ CI / CD Pipeline

A GitHub Actions pipeline is configured to automatically validate the project on every push and pull request.

### 🔄 Pipeline Stages

- UI Tests (Playwright)
- API Tests (Playwright)
- Load Tests (Locust)

---

### 🧪 Execution Details

- UI and API tests run in isolated environments with dependency caching
- Playwright browsers are installed during CI execution
- Load tests run in headless mode for quick validation

---

### 📊 Reporting

- UI test reports are automatically published via GitHub Pages:

https://beratozyildiz.github.io/berat_ozyildiz_case/ui-report/

- UI and API reports are also uploaded as CI artifacts for download

---

### ⚠️ Load Test Behavior

- n11 load tests intentionally return `403 Forbidden`
- This is expected due to bot protection (WAF/CDN)
- The pipeline is configured to not fail on this scenario

---

### ✅ Outcome

- Every change is automatically tested
- Failures are visible immediately
- Reports are accessible without running tests locally

---

## 🧠 Engineering Approach

- Clear separation of concerns (tests, pages, locators)
- Stable selector strategy (prefer data-qa when available)
- Realistic user flows without shortcuts
- Resilient to UI timing issues (no fixed waits)
- Focus on business validation instead of brittle assertions

---

## ⚠️ Limitations

- Load test target is protected by bot detection
- Backend performance cannot be measured directly
- Results reflect system protection behavior, not raw performance

---

## 🏁 Summary

| Area       | Status |
|------------|--------|
| UI Tests   | ✅     |
| API Tests  | ✅     |
| Load Tests | ✅     |
| Stability  | ✅     |
| Design     | ✅     |
