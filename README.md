# Stellar Burgers

## Project Description

Stellar Burgers is a frontend application developed for a burger restaurant. The core feature is the **Burger Builder**, which enables users to assemble custom burgers by dragging, dropping, and reordering ingredients. 

The app fetches ingredients from an API, categorizes them, and allows users to place orders, track order status in real-time via **WebSockets**, and view their order history in the Profile section. This seamless integration between frontend functionality and backend data ensures a smooth user experience.

## See It In Action

The project is optimized for the **desktop version** of your preferred browser and can be viewed at [galaxy.ivanjsx.com](https://galaxy.ivanjsx.com).

## My Role In It

I was tasked with the complete frontend development of this project, starting from a [Figma design](https://www.figma.com/file/ocw9a6hNGeAejl4F3G9fp8/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8-(3-%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0)_external_link) and backend API. I implemented key features such as the **Burger Builder**, **order history**, **real-time WebSocket connections**, and modal windows for ingredient and order details. I also developed the routing system and internal state management using **Redux**.

In addition to frontend development, I refactored the entire codebase to incorporate **TypeScript**, significantly improving code reliability, type safety, and the overall developer experience.

While the project was developed as part of my studies, it was a professional-grade build. I'd love to extend it to mobile platforms, as it is currently optimized for desktop. If you're interested, give the repository a star and help make it happen! :)

## Technologies Used

- **React** for building a dynamic, component-based UI
- **Redux** (including **Redux Toolkit**) for robust internal app state management
- **React Router** for navigation and routing
- **ReactDnD** for intuitive drag-and-drop functionality
- Integration with both **API** and **WebSocket** for real-time data exchange with the backend
- **TypeScript** for ensuring type safety across the codebase, including the UI components and state management
- **CSS Modules** for styling components in a modular and maintainable way
- **Docker** for containerization
- **Nginx** for serving the app in a production environment
