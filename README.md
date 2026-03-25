# Multi-View Project Tracker UI

This is a frontend project management application built using React. It supports multiple views, custom drag-and-drop, virtual scrolling, and simulated real-time collaboration.

## Features

Kanban Board

Four columns: To Do, In Progress, In Review, Done
Task cards show title, assignee initials, priority, and due date
Overdue tasks are highlighted
Each column has independent scrolling

List View

Displays all tasks in a table
Supports sorting by title, priority, and due date
Inline status update using dropdown
Virtual scrolling implemented for large data

Timeline View

Tasks displayed across the current month
Horizontal scrolling supported
Today’s date is marked
Tasks without start date appear on due date

Drag and Drop

Implemented without any external library
Dragged card shows placeholder to prevent layout shift
Drop zones are highlighted
Card returns to original position if dropped outside

Live Collaboration

Simulated users (2–4 users)
Avatars shown on task cards
Active users count shown at the top

Filters

Filter by status, priority, assignee, and date range
Filters update instantly
Filter state is stored in URL
Clear filters option available
Setup Instructions

## Clone the repository
git clone <your-repo-link>

Go to project folder
cd project-tracker

Install dependencies
npm install

Run the project
npm run dev

 ## State Management

I used Zustand for state management because this project requires shared data across multiple views. It helped manage tasks, filters, and collaboration state in a simple way without complex setup. It also avoids prop drilling and keeps the code clean.

 ## Virtual Scrolling

Virtual scrolling is implemented manually without using any library. Only the visible rows and a small buffer are rendered based on scroll position. This improves performance and allows smooth scrolling even with large datasets.

 ## Drag and Drop

Drag-and-drop is implemented using native browser events. When a card is dragged, a placeholder of the same height is shown to prevent layout shift. The dragged card follows the cursor and drop zones are highlighted. If dropped in a valid column, the task status updates. Otherwise, it returns to its original position.


 ## Explanation of the hardest part of UI

The hardest part was implementing drag-and-drop without using any library. Initially, dragging caused layout shifts and unstable UI. I solved this by adding a placeholder with the same height as the dragged card, which kept the layout stable. Another challenge was handling the drag state correctly. I tracked the dragged item, source column, and target column to ensure correct behavior on drop.
For virtual scrolling, I rendered only visible rows to maintain performance with large data.
I further improved performance based on Lighthouse insights by reducing unnecessary re-renders, avoiding expensive calculations during render, and minimizing DOM nodes where possible. After these optimizations, the application became much smoother and more responsive.
If I had more time, I would refactor the drag-and-drop logic into reusable hooks to make the code cleaner and easier to maintain.

## Lighthouse Screenshot 