# Argo FE (Components) Monorepo

This is a React application that leverages a microfrontend architecture, where the "Employer" and "Employee" modules are independently running applications that are dynamically imported and integrated into the main application.

## Getting Started

### Prerequisites

1. Install node (version 18) and npm on your machine.

## Installation

```bash
# Install all the required node_modules and run Employee
cd Employee
npm i
npm start

# Install all the required node_modules and run Employer
cd Employer
npm i
npm start

# Install all the required node_modules and run org-container
cd org-container
npm i
npm start

```