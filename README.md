# Eat that Frog 🐸 v1.2.1

Welcome to the Eat that Frog 🐸 v1.2.1! This web application helps you track and calculate your task completion progress based on different categories of tasks.

## Features

-  **Task Entry**: Easily input the total number of tasks and the number of completed tasks for each category (A, B, C) using user-friendly input fields. This feature allows for efficient tracking of task completion progress in different categories.
- **Advanced Calculation**: The application performs advanced calculations to determine the completion percentage based on weighted scores for each category of tasks. By assigning weights to different task categories, users can prioritize and gauge their progress more accurately.
 - **Responsive Design**: Built with Bootstrap, the application boasts a responsive and mobile-friendly layout. Whether accessed from a desktop, tablet, or smartphone, users can enjoy a seamless and optimized experience across various devices.
- **Graphical Representation**: Visualize daily scores with a line chart using Chart.js integration. This graphical representation enhances data comprehension by illustrating trends and patterns in task completion over time, empowering users to make informed decisions and adjustments.
- **Persistent Storage**: Daily scores are automatically saved in the browser's local storage, ensuring data persistence across sessions. This feature allows users to revisit and track their historical performance without the risk of data loss.
-  **Data Reset**: Users have the option to reset all stored data with a simple command. By executing `localStorage.clear()` in the browser console, users can wipe all saved scores and start afresh, providing a clean slate for tracking new tasks.
- **Add Missing Scores**: If users forget to input a score for a specific day, they can easily rectify the omission by clicking the "Missing Score?" button. This button redirects users to a dedicated page where they can manually add missing scores for any date, ensuring comprehensive and accurate data collection.
- **Mobile-Friendly Design**: The application's responsive design ensures an optimal viewing experience across various devices, including desktops, tablets, and smartphones. Users can seamlessly access and interact with the application on any device, enhancing convenience and accessibility.
- **Weekly Score**: Ability to view weekly average score for better understanding.
- **Add Missing Score**: Ability to add a score manually if forgoten before.

## Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/yourusername/task-completion-calculator.git
   ```

2. Navigate to the project directory:

   ```
   cd task-completion-calculator
   ```

3. Open `index.html` in your web browser to access the application.

4. or visit [Eat that Frog](https://eatthatfrog.netlify.app/) .

## Usage

1. **Task Entry**: Fill in the total number of tasks and the number of completed tasks for each category (A, B, C) in the respective input fields.

2. **Calculate Score**: Click the "Get Score" button to calculate your completion percentage based on the entered task data.

3. **View Daily Scores**: Check the list of daily scores displayed below the input fields to see your past performance. Each entry includes the date and corresponding score.

4. **Visualize with Chart**: The line chart below the daily scores visually represents your progress over time, making it easier to track trends and improvements.

5. **Reset Data**: If needed, you can reset all stored data by opening the browser console and running `localStorage.clear()`. This action will clear all saved scores and start fresh.

6. **Add Missing Scores**: If you missed entering a score for a specific day, click the "Missing Score?" button located at the top left corner of the page. This option redirects you to a page where you can manually add missing scores for any date.

7. **Explore Weekly Scores**: Gain insights into your weekly performance by filtering and viewing scores for specific weeks. Use the filter options provided to select the desired week or month and visualize your progress over time.

8. **Mobile-Friendly Design**: Enjoy a seamless experience across devices with the responsive design optimized for desktop, tablet, and mobile screens.

9. **Feedback and Support**: Have feedback or need assistance? Feel free to reach out by opening an issue on the GitHub repository. Your input helps us improve the application and provide better support to our users.

## License

This project is licensed under the [MIT License](LICENSE).

## Version History

- **v1.2.1**:
  - Updated README with version history and documentation.
  - Added new features and updated design.
  - manually score adding. 

- **v1.2.0**:
  - Added daily score view and with graph.
  - Improved data storage and reset functionality.
  - Enhanced graphical representation.

- **v1.1.0**:
  - Added animation and aesthetic improvements.
  - Updated README and documentation.

- **v1.0.0**:
  - Initial release.

## Support

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/glitch7584/eatthatfrog/issues) on GitHub.
